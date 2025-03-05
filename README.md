# GitHub Copilot を検証する

GitHub Copilot を検証するはずが、GitHub Copilot の LLM を利用することができる Roo Code も検証することにした。

## [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

- Chat と Edits が使える
- Agent モードは Visual Studio Code Insiders でプレビュー提供
- Model が色々選べる（大半がプレビューで、基本は GPT-4o）
  - Claude3.5 以上を選んだほうが性能がいい
- Chat と Edits で常に参照するファイルを.github/copilot-instructions.md に指定できる
  - code completion には反映されない
  - 他のファイルを参照させることができない
    - 例）[docs](hogehoge)ディレクトリ以下のドキュメントを常に参照して
- 他にも各機能で指示を指定できる
  - コード生成時
  - コミットメッセージ生成時
  - VSCode 上での Copilot によるコードレビュー時
  - テスト時 - `/tests`
- reusable custom prompt という機能が experiments で提供中
  - 他のファイル参照することが可能
  - いろいろな役割をドキュメントで分けられるので、便利
    - 例）テクニカルライターになりきってドキュメントを作らせる指示を.github/prompts/document-write.prompt.md に書いておいて、Chat や Edit 時にプロンプトを参照させる
- MCP（Model Context Protocol）がない

### 総括

- コミットメッセージ生成時に指示出せるのは便利。
- それ以外は Roo Code でできるしなぁという気持ち

## [Roo Code](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)

- Copilot と同じ AI エージェントの VSCode 向けの拡張の「Cline」を拡張したもの
- API Provider と接続する必要があり、要求するたびに金額がかかる....はずだが！！！！
  - Copilot の有料になっていると、「VS Code LM API」を指定でき、Copilot がつなぐ LM に乗っかることができる
    - 2025/03 現在、Claude3.7 以上を選択するとエラーになるので、Claude は 3.5 のみ選択できる
- MCP（Model Context Protocol）がある
- GitHub Copilot ができないことはほぼない
  - 唯一は、Copilot でできる code completion が、Roo Code ではできない
