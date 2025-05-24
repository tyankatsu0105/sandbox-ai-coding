import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const AUTO_GENERATED_WARNING = `<!-- このファイルはdocs/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、docs/rules以下のファイルを編集し、scriptを実行してください。 -->\n\n`;

/**
 * Frontmatterのメタデータの変換表
 */
const frontmatterMap = {
  /**
   * @see: https://code.visualstudio.com/docs/copilot/copilot-customization#_use-instructionsmd-files
   */
  "githubCopilot-applyTo": "applyTo",
};

/**
 * Frontmatter を解析し、GitHub Copilot に関連する部分を処理する関数
 */
function parseFrontmatterForCopilot(content: string): string {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  if (!match) {
    throw new Error("Frontmatterが見つかりません");
  }

  const frontmatterKeys = Object.keys(frontmatterMap);
  const frontmatterValues = Object.values(frontmatterMap);
  const regex = new RegExp(
    `(${frontmatterKeys.join("|")})\\s*:\\s*([^\\n]+)`,
    "g"
  );

  // Frontmatter をフィルタリングして、frontmatterMap に定義されたキーのみを残す
  const filteredFrontmatter = match[1]
    .split("\n")
    .filter((line) => {
      const key = line.split(":")[0]?.trim();
      return frontmatterKeys.includes(key);
    })
    .join("\n");

  const updatedFrontmatter = filteredFrontmatter.replace(
    regex,
    (match, p1, p2) => {
      const index = frontmatterKeys.indexOf(p1);
      return `${frontmatterValues[index]}: ${p2}`;
    }
  );

  return content.replace(frontmatterRegex, `---\n${updatedFrontmatter}\n---`);
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const rulesDir = join(process.cwd(), "docs", "rules");
    const files = await (await import("fs/promises")).readdir(rulesDir);

    for (const file of files) {
      const sourcePath = join(rulesDir, file);
      const targetPath = join(
        process.cwd(),
        ".github",
        "instructions",
        `${file.replace(".md", ".instructions.md")}`
      );

      const content = await readFile(sourcePath, "utf-8");
      const updatedContent = updateLinks(content, files);

      function updateLinks(content: string, files: string[]): string {
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

      const modifiedContent =
        AUTO_GENERATED_WARNING + parseFrontmatterForCopilot(updatedContent);
      await writeFile(targetPath, modifiedContent, "utf-8");
      console.info(`${targetPath} の生成が完了しました`);
    }
  } catch (error) {
    console.error("ファイルの生成に失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
