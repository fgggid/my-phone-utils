#!/bin/sh
#set -x
set -e

UTILS=utils
OUTPUTS=outputs

rm -rf $OUTPUTS
mkdir -p $OUTPUTS

for ITEM in $(ls utils); do
  echo generating $ITEM ...
  cp -r AutoScriptBase $OUTPUTS/$ITEM
  cp -f $UTILS/$ITEM/* $OUTPUTS/$ITEM/core/
  sed -i "s/let CONFIG_STORAGE_NAME = .*/let CONFIG_STORAGE_NAME = '$ITEM'/g" $OUTPUTS/$ITEM/config.js
  sed -i "s/let PROJECT_NAME = .*/let PROJECT_NAME = '$ITEM'/g" $OUTPUTS/$ITEM/config.js
done
