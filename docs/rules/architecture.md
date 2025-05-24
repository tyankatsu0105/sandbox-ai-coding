# アプリケーションのアーキテクチャ

## 利用言語

扱う言語は以下のもの。

- TypeScript
- JavaScript
- GraphQL
- Markdown
- CSS
- HTML

## 利用フレームワーク

利用するフロントエンドフレームワークは以下のもの。

- React

その他利用しているライブラリは、[package.json](/package.json)を参照しろ。

## ストラクチャ

```bash
$ tree -a -d -I 'node_modules|.git'

.
├── .cursor
│   └── rules
├── .github
│   └── prompts
├── .roo
│   └── rules
├── .storybook
├── .vscode
├── docs
│   ├── custom-prompts
│   ├── rules
│   └── scripts
├── memory-bank
│   └── todo
├── public
└── src
    ├── assets
    ├── components
    │   ├── avatar
    │   ├── button
    │   ├── modal
    │   └── text
    └── utilities
```

### .cursor

- Cursor の設定ファイルを格納するディレクトリ

### .github

- GitHub の設定ファイルを格納するディレクトリ

### .hooks

- Git のフックスクリプトを格納するディレクトリ
