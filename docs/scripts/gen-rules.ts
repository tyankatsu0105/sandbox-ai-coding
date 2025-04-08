import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const WARNING =
  "このファイルはdocs/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、docs/rules以下のファイルを編集し、scriptを実行してください。";

/** 自動生成ファイルであることを示す警告コメント */
const AUTO_GENERATED_WARNING = `<!-- ${WARNING} -->\n\n`;

/**
 * ルールファイルの処理に関する型と関数
 */
interface RuleProcessor {
  /** 複数のファイル内容を結合 */
  combineContents: (contents: string[]) => string;
  /** 出力先のパスを取得 */
  getOutputPath: (baseDir: string) => string;
}

const roorulesProcessor: RuleProcessor = {
  combineContents: (contents: string[]): string => {
    return AUTO_GENERATED_WARNING + contents.join("\n");
  },
  getOutputPath: (baseDir: string): string => {
    return join(baseDir, ".roorules");
  },
};

const copilotProcessor: RuleProcessor = {
  combineContents: (contents: string[]): string => {
    return AUTO_GENERATED_WARNING + contents.join("\n");
  },
  getOutputPath: (baseDir: string): string => {
    const githubDir = join(baseDir, ".github");
    return join(githubDir, "copilot-instructions.md");
  },
};

/**
 * .cursor/rulesディレクトリにルールファイルを生成する関数
 * @param srcDir ルールファイルのソースディレクトリ
 * @param destDir 生成先のディレクトリ
 */
async function generateCursorRules(
  srcDir: string,
  destDir: string
): Promise<void> {
  // 出力ディレクトリが存在しない場合は作成
  if (!existsSync(destDir)) {
    await mkdir(destDir, { recursive: true });
  }

  // ソースディレクトリのファイルを読み込んで生成
  // ソースディレクトリのファイルを読み込んで生成
  const files = await readdir(srcDir);
  for (const file of files) {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);
    const content = await readFile(srcPath, "utf-8");
    // 警告コメントを追加して生成
    const contentWithWarning = AUTO_GENERATED_WARNING + content;
    await writeFile(destPath, contentWithWarning, "utf-8");
  }
}

/**
 * マークダウンファイルを検索する関数
 */
async function findMarkdownFiles(directory: string): Promise<string[]> {
  const files = await readdir(directory);
  return files.filter((file) => file.endsWith(".md"));
}

/**
 * マークダウンファイルの内容を読み込む関数
 */
async function readMarkdownContents(
  directory: string,
  files: string[]
): Promise<string[]> {
  const contents: string[] = [];

  for (const file of files) {
    const content = await readFile(join(directory, file), "utf-8");
    contents.push(content);
  }

  return contents;
}

/**
 * ルールファイルを生成する関数
 */
async function generateRuleFile(
  contents: string[],
  processor: RuleProcessor
): Promise<void> {
  const outputPath = processor.getOutputPath(process.cwd());
  const outputDir = join(outputPath, "..");

  // 出力ディレクトリが存在しない場合は作成
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const combinedContent = processor.combineContents(contents);
  await writeFile(outputPath, combinedContent, "utf-8");
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const rulesDir = join(process.cwd(), "docs", "rules");
    const markdownFiles = await findMarkdownFiles(rulesDir);
    const contents = await readMarkdownContents(rulesDir, markdownFiles);

    // .roorules の生成
    await generateRuleFile(contents, roorulesProcessor);
    console.log(".roorules の生成が完了しました");

    // GitHub Copilot instructions の生成
    await generateRuleFile(contents, copilotProcessor);
    console.log("GitHub Copilot instructions の生成が完了しました");

    // .cursor/rules の生成
    const cursorRulesDir = join(process.cwd(), ".cursor", "rules");
    await generateCursorRules(rulesDir, cursorRulesDir);
    console.log(".cursor/rules の生成が完了しました");
  } catch (error) {
    console.error("ファイルの生成に失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
