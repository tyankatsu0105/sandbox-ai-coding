# sandbpx ai coding

AI エージェントを使った実装環境を、想定しうる環境で構築できることを目指す。

## できること

- ai-instructions ディレクトリにあるドキュメントをもとに、各エージェントの指示書ファイルを生成することができます。
- .vscode/settings.json にある設定をもとに、copilot の設定を変更することができます。
- mcp の設定を行うことで、外部ツールとの連携が可能になります。

```json
{
  "mcpServers": {
    "[github]": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1",
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_GITHUB_TOKEN>"
      }
    },
    "[notion]": {
      "command": "npx",
      "args": [
        "-y",
        "@orbit-logistics/notion-mcp-server",
        "-t",
        "<YOUR_NOTION_TOKEN>"
      ],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1"
      }
    },
    "[slack]your-slack-workspace-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1",
        "SLACK_BOT_TOKEN": "<xoxb-から始まるトークン>",
        "SLACK_TEAM_ID": "<T1234ABCDのようなチームID>"
      }
    }
  }
}
```

- memory bank の概念を導入することで、セッション間でのコンテキストの維持を可能にします。
  - https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank

## 考えていること

- 指示書ファイルの生成に ts を使っているが、バックエンドのレポジトリでは ts を使いたくないので、makefile が良いかもしれない。

## 参考

- https://github.com/GreatScottyMac/roo-code-memory-bank/tree/main
- https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank
- https://github.com/langgptai/awesome-claude-prompts
