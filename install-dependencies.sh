#!/bin/bash
mkdir www
chmod 755 www

echo "npm install"
npm install
echo "bower install"
bower install

echo "Add android platform"
cordova platform add android
echo "Add Cordova plugins"
cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
