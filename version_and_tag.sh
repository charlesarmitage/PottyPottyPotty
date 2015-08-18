#!/bin/bash

sed -i 's/version="[0-9]*\.[0-9]*\.[0-9]*"/version="'$1'"/g' config.xml 
git add config.xml
git commit -m"$2"
git tag -a v$1 -m'$2'
#git push origin $1
