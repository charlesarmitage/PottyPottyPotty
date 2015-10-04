#!/bin/bash

if [ -z "$1" ] || [ -z "$2" ]
	then 
	echo "Usage: version_and_tag <tag> <tag comments>"
	exit
fi

sed -i 's/version="[0-9]*\.[0-9]*\.[0-9]*"/version="'$1'"/g' config.xml 
git add config.xml
git commit -m"$2"
git tag -a v$1 -m'$2'

echo "Added tag:" $1 $2
echo "Use: 'git push origin --tags' to push tag to github"