# コミットメッセージガイドライン

このガイドラインは[Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)に基づいています。
常に日本語で書いてください。

## 構造

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## 主要なルール

1. コミットメッセージは`type`から始める
2. `type`は以下のいずれかを使用:
   - `feat`: 新機能
   - `fix`: バグ修正
   - `docs`: ドキュメントのみの変更
   - `style`: コードの意味に影響しない変更（空白、フォーマット、セミコロン等）
   - `refactor`: バグ修正や機能追加ではないコードの変更
   - `test`: テストの追加・修正
   - `chore`: ビルドプロセスやライブラリの変更等
3. `scope`は任意で、変更の範囲を示す
4. `description`は命令形で記述する

## 破壊的変更

- コミットに破壊的変更が含まれる場合:
  - タイプ/スコープの後に`!`を追加
  - フッターに`BREAKING CHANGE:`を記載

## 例

```
feat: ユーザー認証機能を追加

fix(api): 認証トークンの有効期限チェックを修正

docs: READMEを更新

feat!: APIレスポンス形式を変更
BREAKING CHANGE: レスポンスがJSONからXMLに変更
```
