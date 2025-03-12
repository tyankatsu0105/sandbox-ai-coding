# sandbpx ai coding

AI エージェントを使った実装環境を、想定しうる環境で構築できることを目指す。

## 想定ユーザー

限定的なサポート対象のみ想定しています。  
現在のサポート一覧は[サポート対象](./ai-instructions/README.md#サポート対象)を参照してください。

- GitHub Copilot
- GitHub Copilot(code completion 機能のみ) + Cline
- GitHub Copilot(code completion 機能のみ) + Roo Code(VSCode LM API, copilot - claude-3.5-sonnet)
- Cursor

## できること

- ai-instructions ディレクトリにあるドキュメントをもとに、各エージェントの指示書ファイルを生成することができます。
- .vscode/settings.json にある設定をもとに、copilot の設定を変更することができます。
- mcp の設定を行うことで、外部ツールとの連携が可能になります。
- memory bank の概念を導入することで、セッション間でのコンテキストの維持を可能にします。
  - https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank

## 準備

1. [サポートされている AI エージェント、エディタ](./ai-instructions/README.md)を利用可能な状態にする
2. memory bank の概念を AI に持たせる
   - https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank
   - AI エージェントに、`Update Memory Bank`、または `UMB` と伝え、memory-bank の更新を行わせる
     - 以下のファイルが memory-bank ディレクトリに追加されていることを確認する
       - activeContext.md
       - productContext.md
       - progress.md
       - projectbrief.md
       - systemPatterns.md
       - techContext.md
3. MCP の設定を行う
   - MCP の設定ファイルで以下の MCP が利用可能な状態にする
     - GitHub
       - https://github.com/modelcontextprotocol/servers/tree/main/src/github
     - Notion
       - https://github.com/orbit-logistics/notion-mcp-server
     - Slack
       - https://github.com/modelcontextprotocol/servers/tree/main/src/slack
     - Figma
       - https://github.com/GLips/Figma-Context-MCP
     - Sentry
       - https://github.com/modelcontextprotocol/servers/tree/main/src/sentry

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1",
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your_github_token>"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1",
        "SLACK_BOT_TOKEN": "<xoxb始まりのslack-bot-token>",
        "SLACK_TEAM_ID": "<T始まりのslack-team-id>"
      }
    },
    "notion": {
      "command": "npx",
      "args": [
        "-y",
        "@orbit-logistics/notion-mcp-server",
        "-t",
        "<your_notion_token>"
      ],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "ASDF_NODEJS_VERSION": "20.11.1",
        "FIGMA_API_KEY": "<your_figma_token>"
      }
    },
    "sentry": {
      "command": "uvx",
      "args": ["mcp-server-sentry", "--auth-token", "<your_sentry_token>"],
      "env": {
        "ASDF_UV_VERSION": "0.6.0"
      }
    }
  }
}
```

### VSCode ユーザー

GitHub Copilot の設定を行う必要があるので、[settings.json](./.vscode/settings.json)が適用されるようにしてください。

## 考えていること

- 指示書ファイルの生成に ts を使っているが、バックエンドのレポジトリでは ts を使いたくないので、makefile が良いかもしれない。

## 参考

- https://github.com/GreatScottyMac/roo-code-memory-bank/tree/main
- https://docs.cline.bot/improving-your-prompting-skills/custom-instructions-library/cline-memory-bank
- https://github.com/langgptai/awesome-claude-prompts
- https://www.promptingguide.ai/jp
