import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const WARNING =
  "このファイルはai-instructions/custom-prompts以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、ai-instructions/custom-prompts以下のファイルを編集し、scriptを実行してください。";

// モードの設定に関する型定義
interface ModeMetadata {
  name: string;
  groups: string[];
  source: "project" | "global";
}

interface ModeDefinition extends ModeMetadata {
  slug: string;
  roleDefinition: string;
  customInstructions: string;
}

/**
 * マークダウンからメタデータを抽出する関数
 * @throws メタデータが見つからないか、必須フィールドが欠けている場合
 */
function extractMetadata(content: string): ModeMetadata {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    throw new Error("メタデータが見つかりません");
  }

  const metadata = parseMetadataContent(frontMatterMatch[1]);
  validateMetadata(metadata);

  return metadata;
}

/**
 * メタデータの文字列をパースする関数
 */
function parseMetadataContent(content: string): Partial<ModeMetadata> {
  const metadata: Partial<ModeMetadata> = {};

  content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());

      switch (key) {
        case "name":
          metadata.name = value;
          break;
        case "source":
          metadata.source = value as ModeMetadata["source"];
          break;
        case "groups":
          metadata.groups = parseGroups(value);
          break;
      }
    });

  return metadata;
}

/**
 * [item1, item2] 形式の文字列をパースする関数
 */
function parseGroups(groupsStr: string): string[] {
  return groupsStr
    .replace(/[\[\]]/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * メタデータのバリデーション
 * @throws 必須フィールドが欠けている場合
 */
function validateMetadata(
  metadata: Partial<ModeMetadata>
): asserts metadata is ModeMetadata {
  if (!metadata.name) {
    throw new Error("モード名が定義されていません");
  }
  if (!metadata.groups || metadata.groups.length === 0) {
    throw new Error("グループが定義されていません");
  }
}

/**
 * マークダウンから指定されたセクションを抽出する関数
 */
function extractSection(
  content: string,
  sectionName: string,
  extractToEnd = false
): string {
  const sectionHeaderPattern = `## ${sectionName}\\n\\n`;
  const nextSectionPattern = extractToEnd ? "$" : "\\n##";
  const pattern = new RegExp(
    `${sectionHeaderPattern}([\\s\\S]*?)(?=${nextSectionPattern})`
  );
  const match = content.match(pattern);
  return match ? match[1].trim() : "";
}

/**
 * モード定義ファイルからモード定義を生成する関数
 */
function createModeDefinition(
  filePath: string,
  content: string
): ModeDefinition {
  const metadata = extractMetadata(content);
  const slug = filePath.replace(".md", "");

  // 指示セクション以降の全ての内容を抽出
  const instructionsIndex = content.indexOf("## 指示\n\n");
  const customInstructions =
    instructionsIndex !== -1
      ? content.slice(instructionsIndex + "## 指示\n\n".length).trim()
      : "";

  return {
    slug,
    ...metadata,
    roleDefinition: extractSection(content, "役割"),
    customInstructions,
  };
}

/**
 * マークダウンファイルを検索する関数
 */
async function findMarkdownFiles(directory: string): Promise<string[]> {
  const files = await readdir(directory);
  return files.filter((file) => file.endsWith(".md"));
}

/**
 * モード定義を生成する関数
 */
async function generateModeDefinitions(
  directory: string,
  files: string[]
): Promise<ModeDefinition[]> {
  const definitions: ModeDefinition[] = [];

  for (const file of files) {
    const content = await readFile(join(directory, file), "utf-8");
    definitions.push(createModeDefinition(file, content));
  }

  return definitions;
}

import { mkdir } from "fs/promises";
import { existsSync } from "fs";

/**
 * GitHub Copilotのプロンプト変換に関する型と関数
 */
interface CopilotTransformer {
  /** プロンプト内容からメタデータ（Front Matter）を削除 */
  transformContent: (content: string) => string;
  /** ファイル名をCopilot形式に変換（.mdの前に.promptを追加） */
  transformFilename: (filename: string) => string;
}

/** 自動生成ファイルであることを示す警告コメント */
const AUTO_GENERATED_WARNING = `<!-- ${WARNING} -->\n\n`;

const copilotTransformer: CopilotTransformer = {
  transformContent: (content: string): string => {
    const cleanContent = content.replace(/^---[\s\S]*?---\n\n/, "");
    return AUTO_GENERATED_WARNING + cleanContent;
  },
  transformFilename: (filename: string): string => {
    return filename.replace(/\.md$/, ".prompt.md");
  },
};

/**
 * マークダウンファイルからGitHub Copilot用プロンプトファイルを生成
 */
async function generateGitHubCopilotPrompts(
  directory: string,
  files: string[]
): Promise<void> {
  const copilotPromptsDir = join(process.cwd(), ".github", "prompts");

  if (!existsSync(copilotPromptsDir)) {
    await mkdir(copilotPromptsDir, { recursive: true });
  }

  for (const file of files) {
    const content = await readFile(join(directory, file), "utf-8");
    const copilotContent = copilotTransformer.transformContent(content);
    const copilotFilename = copilotTransformer.transformFilename(file);
    await writeFile(
      join(copilotPromptsDir, copilotFilename),
      copilotContent,
      "utf-8"
    );
  }
}

async function saveModeConfiguration(
  modeDefinitions: ModeDefinition[]
): Promise<void> {
  const config = {
    WARNING,
    customModes: modeDefinitions,
  };
  const configContent = JSON.stringify(config, null, 2);
  await writeFile(join(process.cwd(), ".roomodes"), configContent, "utf-8");
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const customPromptsDir = join(
      process.cwd(),
      "ai-instructions",
      "custom-prompts"
    );
    const markdownFiles = await findMarkdownFiles(customPromptsDir);
    const modeDefinitions = await generateModeDefinitions(
      customPromptsDir,
      markdownFiles
    );
    await saveModeConfiguration(modeDefinitions);
    console.log(".roomodesの生成が完了しました");

    await generateGitHubCopilotPrompts(customPromptsDir, markdownFiles);
    console.log("GitHub Copilotプロンプトの生成が完了しました");
  } catch (error) {
    console.error("処理に失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
