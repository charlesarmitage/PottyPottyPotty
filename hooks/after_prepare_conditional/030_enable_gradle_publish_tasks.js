#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

if (rootdir) {
    var source = path.join(rootdir, 'hooks/after_prepare_conditional/build-extras-publish.gradle');
    var dest = path.join(rootdir, 'platforms/android/build-extras.gradle');
    var data = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(dest, result, 'utf8');
}
