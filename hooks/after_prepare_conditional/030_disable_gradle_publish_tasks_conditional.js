#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

if (rootdir) {
    var dest = path.join(rootdir, 'platforms/android/build-extras.gradle');
    if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
    }
}
