import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const WARNING =
  "このファイルはdocs/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、docs/rules以下のファイルを編集し、scriptを実行してください。";

/** 自動生成ファイルであることを示す警告コメント */
const AUTO_GENERATED_WARNING = `<!-- ${WARNING} -->\n\n`;

interface TargetConfig {
  path: string;
  relativePath: string;
}

/**
 * README.mdの内容を指定されたパスにコピーする関数
 */
async function copyReadmeToPath(
  content: string,
  target: TargetConfig
): Promise<void> {
  const outputDir = join(target.path, "..");

  // 出力ディレクトリが存在しない場合は作成
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Markdownリンクのパスを相対パスに置換
  const modifiedContent = content.replace(
    /\[path\]\(\.\/([a-zA-Z-]+\.md)\)/g,
    `[path](${target.relativePath}/$1)`
  );

  // 警告コメントを追加してファイルを生成
  const contentWithWarning = AUTO_GENERATED_WARNING + modifiedContent;
  await writeFile(target.path, contentWithWarning, "utf-8");
}

/**
 * メイン処理
 */
async function main(): Promise<void> {
  try {
    const readmePath = join(process.cwd(), "docs", "rules", "README.md");
    const content = await readFile(readmePath, "utf-8");

    // 各ターゲットの設定
    const targets: TargetConfig[] = [
      {
        path: join(process.cwd(), ".roo", "rules", "README.md"),
        relativePath: "../../docs/rules",
      },
      {
        path: join(process.cwd(), ".cursor", "rules", "README.md"),
        relativePath: "../../docs/rules",
      },
      {
        path: join(process.cwd(), ".github", "copilot-instructions.md"),
        relativePath: "../docs/rules",
      },
    ];

    for (const target of targets) {
      await copyReadmeToPath(content, target);
      console.log(`${target.path} の生成が完了しました`);
    }
  } catch (error) {
    console.error("ファイルの生成に失敗しました:", error);
    process.exit(1);
  }
}

// メイン処理の実行
main();
