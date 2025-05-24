import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const AUTO_GENERATED_WARNING = `<!-- このファイルはGitHub Copilotに関するルールを自動生成したものです。直接編集しないでください。 -->\n\n`;

/**
 * Frontmatterのメタデータを表すインターフェース
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

  const updatedFrontmatter = match[1].replace(regex, (match, p1, p2) => {
    const index = frontmatterKeys.indexOf(p1);
    return `${frontmatterValues[index]}: ${p2}`;
  });

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
      const modifiedContent =
        AUTO_GENERATED_WARNING + parseFrontmatterForCopilot(content);
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
