#!/bin/bash

cp .devcontainer/devcontainer.local-sample .devcontainer/devcontainer.local.json
echo "devcontainer.local.jsonの記述は、devcontainer.jsonにマージされます。個人で設定したい内容をdevcontainer.local.jsonに記述してください。"
echo "チームで設定すべき内容はdevcontainer.jsonに記述してください。"