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

function find_in_file(filename, to_find) {
    var data = fs.readFileSync(filename, 'utf8');
    return data.indexOf(to_find) > -1;
}

if (rootdir) {
    var source = path.join(rootdir, 'hooks/after_prepare_conditional/build-extras-publish.gradle');
    var data = fs.readFileSync(source, 'utf8');
    var dest = path.join(rootdir, 'platforms/android/build-extras.gradle');
    fs.writeFileSync(dest, data , 'utf8');

    // Also add the _buildscript_ dependency for com.github.triplet.gradle to build.gradle
    var gradleFile = path.join(rootdir, 'platforms/android/build.gradle');
    var depString =
        "    dependencies {\n" +
        "        classpath 'com.github.triplet.gradle:play-publisher:1.1.2'\n" +
        "    }\n";
    if( find_in_file(gradleFile, depString) == false ) {
        replace_string_in_file(gradleFile, 'buildscript {', "buildscript {\n" + depString );
    }
}
