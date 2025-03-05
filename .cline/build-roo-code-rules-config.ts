import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

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
 * ルール設定を保存する関数
 */
async function saveRulesConfiguration(contents: string[]): Promise<void> {
  const header =
    "<!-- このファイルは.cline/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。 -->\n";
  const combinedContent = header + contents.join("\n");
  await writeFile(join(process.cwd(), ".clinerules"), combinedContent, "utf-8");
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const rulesDir = join(process.cwd(), ".cline", "rules");
    const markdownFiles = await findMarkdownFiles(rulesDir);
    const contents = await readMarkdownContents(rulesDir, markdownFiles);
    await saveRulesConfiguration(contents);

    console.log(".clinerules のビルドが完了しました");
  } catch (error) {
    console.error(".clinerules のビルドに失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
