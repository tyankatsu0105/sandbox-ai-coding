# AI エージェント向けのドキュメント

AI エージェントが参照する指示ファイルを生成するために、ドキュメントを集約する場所。

## ディレクトリの理由

AI エージェントによって指示ファイルの参照先が統一されておらず、ドキュメントを書く場所を集約し、各エージェントが参照する指示ファイルを生成することを目的とする。

## サポート対象

- [Cline](https://github.com/cline/cline)
- [Roo Code](https://github.com/RooVetGit/Roo-Code)
- [GitHub Copilot](https://github.com/features/copilot)

## ディレクトリの構成

- custom-prompts
  - 各エージェントのカスタムプロンプトを格納するディレクトリ。
    - Roo Code
      - .roomodes に custom-prompts のドキュメントの内容を転機する。
      - https://docs.roocode.com/advanced-usage/custom-modes
    - GitHub Copilot
      - .github/prompts に custom-prompts のドキュメントの内容を転機する。
      - https://code.visualstudio.com/docs/copilot/copilot-customization#_reusable-prompt-files-experimental
- rules
  - 各エージェントのルールを格納するディレクトリ。
    - Roo Code
      - .roorules に rules のドキュメントの内容を転機する。
      - https://docs.roocode.com/advanced-usage/custom-instructions
    - GitHub Copilot
      - .github/copilot-instructions.md に rules のドキュメントの内容を転機する。 -https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file
- scripts
  - 各エージェントの設定ファイルを生成するスクリプトを格納するディレクトリ。
    - gen-prompts.ts
      - custom-prompts の内容をもとにファイルを生成する。
    - gen-rules.ts
      - rules の内容をもとにファイルを生成する。
