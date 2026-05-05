#!/bin/bash

VERSION="7.21.0"

echo "ドキュメントを生成するツール rulesync のバージョンを確認しています..."

if ! ~/.rulesync/bin/rulesync --version 2>/dev/null | grep -q "$VERSION"; then
  echo "ドキュメントを生成するツール rulesync 7.21.0 がインストールされていません。インストールします..."
  curl -fsSL https://github.com/dyoshikawa/rulesync/releases/latest/download/install.sh | bash -s -- v$VERSION
fi

echo "$VERSION がインストールされていることを確認しました。ドキュメントを生成します..."
~/.rulesync/bin/rulesync generate