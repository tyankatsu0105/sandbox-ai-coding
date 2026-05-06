import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const rulesyncRoot = path.join(repoRoot, ".rulesync");
const generatedTargets = [
  ".claude/",
  ".cursor/",
  ".github/hooks/",
  ".github/copilot-instructions.md",
  ".copilot/",
  "CLAUDE.md",
  "AGENTS.md",
  "GEMINI.md",
];

function readInput() {
  try {
    return JSON.parse(process.stdin.read() ?? "null");
  } catch {
    return null;
  }
}

function normalizePath(value) {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  return path.resolve(repoRoot, value);
}

function getChangedPathsFromGit() {
  const result = spawnSync("git", ["status", "--porcelain"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return null;
  }

  return result.stdout
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .map((line) => {
      const rawPath = line.slice(3);
      const currentPath = rawPath.includes(" -> ")
        ? rawPath.split(" -> ").at(-1)
        : rawPath;
      return normalizePath(currentPath.trim());
    })
    .filter(Boolean);
}

function isUnderRulesync(filePath) {
  return (
    filePath === rulesyncRoot ||
    filePath.startsWith(`${rulesyncRoot}${path.sep}`)
  );
}

function isGeneratedTarget(filePath) {
  const relativePath = path.relative(repoRoot, filePath);

  return generatedTargets.some((target) => {
    const normalizedTarget = target.replace(/\/$/, "");
    return (
      relativePath === normalizedTarget ||
      relativePath.startsWith(`${normalizedTarget}${path.sep}`)
    );
  });
}

function shouldGenerate(changedPaths) {
  const rulesyncChanged = changedPaths.some(isUnderRulesync);
  const generatedChanged = changedPaths.some(isGeneratedTarget);

  return rulesyncChanged && !generatedChanged;
}

readInput();

const changedPaths = getChangedPathsFromGit();

if (!changedPaths || !shouldGenerate(changedPaths)) {
  process.exit(0);
}

const result = spawnSync("npm", ["run", "generate-docs"], {
  cwd: repoRoot,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
