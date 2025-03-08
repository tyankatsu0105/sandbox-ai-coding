# AI エージェント向けのドキュメント

AI エージェントが参照する指示ファイルを生成するために、ドキュメントを集約する場所です。

## ディレクトリの理由

AI エージェントによって指示ファイルの参照先が統一されておらず、ドキュメントをここに書けばよいという場所が存在しません。ドキュメントを書く場所を集約し、各エージェントが参照する指示ファイルを生成することが目的です。

## サポート対象

- [Cline](https://github.com/cline/cline)
- [Roo Code](https://github.com/RooVetGit/Roo-Code)
- [GitHub Copilot](https://github.com/features/copilot)

## ディレクトリの構成

- custom-prompts
  - 各エージェントのカスタムプロンプトを格納するディレクトリです。
    - Roo Code
      - .roomodes に custom-prompts のドキュメントの内容を転機します。
      - https://docs.roocode.com/advanced-usage/custom-modes
    - GitHub Copilot
      - .github/prompts に custom-prompts のドキュメントの内容を転機します。
      - https://code.visualstudio.com/docs/copilot/copilot-customization#_reusable-prompt-files-experimental
- rules
  - 各エージェントのルールを格納するディレクトリです。
    - Roo Code
      - .clinerules に rules のドキュメントの内容を転機します。
      - https://docs.roocode.com/advanced-usage/custom-instructions
    - GitHub Copilot
      - .github/copilot-instructions.md に rules のドキュメントの内容を転機します。 -https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file
- scripts
  - 各エージェントの設定ファイルを生成するスクリプトを格納するディレクトリです。
    - gen-prompts.ts
      - custom-prompts の内容をもとにファイルを生成します。
    - gen-rules.ts
      - rules の内容をもとにファイルを生成します。
