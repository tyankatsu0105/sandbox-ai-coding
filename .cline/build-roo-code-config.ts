import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

// モードの設定に関する型定義
interface ModeMetadata {
  name: string;
  groups: string[];
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

/**
 * .roomodesファイルを保存する関数
 */
async function saveModeConfiguration(
  modeDefinitions: ModeDefinition[]
): Promise<void> {
  const config = { customModes: modeDefinitions };
  const configContent = JSON.stringify(config, null, 2);
  await writeFile(join(process.cwd(), ".roomodes"), configContent, "utf-8");
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const roomodesDir = join(process.cwd(), ".cline", "roomodes");
    const markdownFiles = await findMarkdownFiles(roomodesDir);
    const modeDefinitions = await generateModeDefinitions(
      roomodesDir,
      markdownFiles
    );
    await saveModeConfiguration(modeDefinitions);

    console.log(".roomodesのビルドが完了しました");
  } catch (error) {
    console.error(".roomodesのビルドに失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
