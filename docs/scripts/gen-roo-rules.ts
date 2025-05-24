import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const AUTO_GENERATED_WARNING = `<!-- このファイルはdocs/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、docs/rules以下のファイルを編集し、scriptを実行してください。 -->\n\n`;

/**
 * Frontmatter を解析する関数
 */
export function parseFrontmatter(content: string): string {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?/;
  const updatedContent = content.replace(frontmatterRegex, ""); // Frontmatter を削除
  return updatedContent;
}

/**
 * リンク文字列を置換する関数
 */
export function updateLinks({
  content,
  files,
}: {
  content: string;
  files: string[];
}): string {
  const relativeMarkdownLinkRegex = /\((\.\/(.*?)\.md)\)/g;
  const rootPathLinkRegex = /\((\/.*?)\)/g;

  const updatedRelativeLinks = content.replace(
    relativeMarkdownLinkRegex,
    (_, fullPath, fileName) => {
      const matchingFile = files.find((f) => f === `${fileName}.md`);
      if (matchingFile) {
        const targetFileName = `${fileName}.instructions`;
        return `(${fullPath.replace(fileName, targetFileName)})`;
      }
      return _;
    }
  );

  return updatedRelativeLinks.replace(
    rootPathLinkRegex,
    (_, rootPath) => `(../../${rootPath.slice(1)})`
  );
}

/**
 * ファイルをリネームしつつコピーする関数
 */
export async function renameAndCopyFile({
  targetPath,
  content,
}: {
  targetPath: string;
  content: string;
}): Promise<void> {
  const modifiedContent = AUTO_GENERATED_WARNING + parseFrontmatter(content);
  await writeFile(targetPath, modifiedContent, "utf-8");
  console.info(`${targetPath} の生成が完了しました`);
}

/**
 * Frontmatterのメタデータの変換表
 */

/**
 * メイン処理
 */
export async function main(): Promise<void> {
  try {
    const rulesDir = join(process.cwd(), "docs", "rules");
    const files = await (await import("fs/promises")).readdir(rulesDir);

    for (const file of files) {
      const sourcePath = join(rulesDir, file);
      const targetPath = join(process.cwd(), ".roo", "rules", file);

      const content = await readFile(sourcePath, "utf-8");
      const updatedContent = updateLinks({ content, files });
      await renameAndCopyFile({
        targetPath,
        content: updatedContent,
      });
    }
  } catch (error) {
    console.error("ファイルの生成に失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
