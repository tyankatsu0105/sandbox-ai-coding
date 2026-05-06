# sandbox-ai-coding

AI コーディングツールの設定を試験・管理するためのサンドボックスリポジトリです。Next.js アプリを土台として、複数の AI コーディングツール向けのルール・スキル・フックを一元管理する構成になっています。

## 概要

このリポジトリには 2 つの役割があります。

1. **Next.js アプリ** — `app/` 以下にある標準的な Next.js 16 アプリケーション。AI 設定の動作確認環境として使用します。
2. **AI コーディング設定の管理** — [rulesync](https://github.com/dyoshikawa/rulesync) を使い、`.rulesync/` に置いた単一ソースから Cursor・Claude Code・GitHub Copilot 向けの設定ファイルを自動生成・同期します。

## 技術スタック

| 区分 | 内容 |
|------|------|
| フレームワーク | Next.js 16 (App Router) |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 5 |
| AI 設定同期 | rulesync |
| 対象 AI ツール | Cursor / Claude Code / GitHub Copilot |

## ディレクトリ構成

```
.rulesync/          # AI 設定のソースファイル（ここだけ編集する）
  rules/            # エージェントの応答スタイルなどを定義したルール
  skills/           # Next.js・rulesync・ルール作成など各ドメインのスキル
  hooks/            # .rulesync 編集時に generate-docs を自動実行するフック
.claude/            # Claude Code 向け生成ファイル（自動生成）
.cursor/            # Cursor 向け生成ファイル（自動生成）
.github/            # Copilot 向け生成ファイル（自動生成）
app/                # Next.js アプリケーション本体
tools/              # generate-docs.sh などユーティリティスクリプト
rulesync.jsonc      # rulesync の設定ファイル
```

> `.claude/`・`.cursor/`・`.github/` 以下の AI 設定ファイルは自動生成です。直接編集せず、`.rulesync/` を編集してください。

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリが起動します。

## AI 設定ファイルの生成

`.rulesync/` を変更したら以下を実行して各ツール向けファイルを再生成します。

```bash
npm run generate-docs
```

フックが有効な場合は `.rulesync/` への変更を検知して自動実行されます。

## ビルド・本番起動

```bash
npm run build
npm start
```
