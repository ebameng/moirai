#!/bin/bash

if [ "$1" == "" ]; then
	forever -p ./   --spinSleepTime  3000 --uid nuoya_moirai  -l ./access.log -e ./error.log -a  -s start master.js
	echo "run  pro"
elif [ "$1" == "test" ]; then
	forever -p ./   --spinSleepTime  3000 --uid nuoya_moirai_test  -l ./access.log -e ./error.log -a  -s start  master.js  --port 9527 --mode pro --api test.api.591ku.com
	echo "run  test"
elif [ "$1" == "spider" ]; then
	forever -p ./   --spinSleepTime  3000 --uid nuoya_moirai  -l ./access.log -e ./error.log -a  -s start master.js --api tplus.api.591ku.com
	echo "run  spider"
elif [ "$1" == "fms_spider" ]; then
	forever -p ./   --spinSleepTime  3000 --uid nuoya_moirai  -l ./access.log -e ./error.log -a  -s start master.js --api tplus.api.591ku.com
	echo "run  fms_spider"

fi
