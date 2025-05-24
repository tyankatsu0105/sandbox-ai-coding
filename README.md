# sandbpx ai coding

AI エージェントを使った実装環境を、想定しうる環境で構築できることを目指す。

## 想定ユーザー

限定的なサポート対象のみ想定しています。  
現在のサポート一覧は[サポート対象](./docs/README.md#サポート対象)を参照してください。

- GitHub Copilot
- GitHub Copilot(code completion 機能のみ) + Cline
- GitHub Copilot(code completion 機能のみ) + Roo Code(VSCode LM API, copilot - claude-3.5-sonnet)

## できること

- docs ディレクトリにあるドキュメントをもとに、各エージェントの指示書ファイルを生成することができます。
- .vscode/settings.json にある設定をもとに、copilot の設定を変更することができます。
- mcp の設定を行うことで、外部ツールとの連携が可能になります。
- memory bank の概念を導入することで、セッション間でのコンテキストの維持を可能にします。
  - https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank

## 準備

1. [サポートされている AI エージェント、エディタ](./docs/README.md)を利用可能な状態にする
2. MCP の設定を行う

   - Roo Code
     - [.roo/mcp.json](./.roo/mcp.json)を作成
       - [./.roo/mcp.json.example](./.roo/mcp.json.example)を参考に設定する

3. Auto Approve の設定を行う
   - いろいろな権限を管理できる場合は、好きな権限を選択する
   - Allowed Auto-Execute Commands が設定できる場合は、以下のコマンドを推奨
     - npm install
     - npm ci
     - npm run
     - git status
     - git diff
     - git log --oneline
     - gh issue list
     - gh pr list
     - git branch -a
     - git status --short

### VSCode ユーザー

GitHub Copilot の設定を行う必要があるので、[settings.json](./.vscode/settings.json)が適用されるようにしてください。

## 考えていること

- 指示書ファイルの生成に ts を使っているが、バックエンドのレポジトリでは ts を使いたくないので、makefile が良いかもしれない。

## 参考

- https://github.com/GreatScottyMac/roo-code-memory-bank/tree/main
- https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank
- https://github.com/langgptai/awesome-claude-prompts
- https://www.promptingguide.ai/jp
