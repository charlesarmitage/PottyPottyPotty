#!/usr/bin/env node

// Based on 020_replace_text.js from http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}

if (rootdir) {
    var fullfilename = path.join(rootdir, 'platforms/android/cordova/lib/build.js');
    replace_string_in_file(
        fullfilename,
        "'-Dorg.gradle.daemon=false'",
        "'-Dorg.gradle.daemon=true'" );
}
