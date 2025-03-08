<!-- このファイルはai-instructions/rules以下のファイルによって自動生成されます。直接書き込むことを禁止します。編集したい場合は、ai-instructions/rules以下のファイルを編集し、scriptを実行してください。 -->

## コミット

- 同じ文脈の変更であれば、複数ファイルまとめてコミットしても良い
- コミットは小さく、意味のある単位で行う
- コミットメッセージは、ガイドラインを守って記述する

## コミットメッセージガイドライン

このガイドラインは[Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)に基づいています。

### 構造

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 主要なルール

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

### 破壊的変更

- コミットに破壊的変更が含まれる場合:
  - タイプ/スコープの後に`!`を追加
  - フッターに`BREAKING CHANGE:`を記載

### 例

```
feat: ユーザー認証機能を追加

fix(api): 認証トークンの有効期限チェックを修正

docs: READMEを更新

feat!: APIレスポンス形式を変更
BREAKING CHANGE: レスポンスがJSONからXMLに変更
```

### 最後に補足

- description に当たる箇所は日本語で書いてください。
