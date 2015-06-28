'use strict';

var appName = 'PottyPottyPotty';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var beep = require('beepbeep');
var express = require('express');
var path = require('path');
var open = require('open');
var stylish = require('jshint-stylish');
var connectLr = require('connect-livereload');
var streamqueue = require('streamqueue');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var ripple = require('ripple-emulator');
var karma = require('gulp-karma');
var angularProtractor = require('gulp-angular-protractor');

/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('e', 'emulate')
    .alias('b', 'build')
    .alias('r', 'run')
    // remove all debug messages (console.logs, alerts etc) from release build
    .alias('release', 'strip-debug')
    .default('build', false)
    .default('port', 9000)
    .default('strip-debug', false)
    .argv;

var build = !!(args.build || args.emulate || args.run);
var emulate = args.emulate;
var run = args.run;
var port = args.port;
var stripDebug = !!args.stripDebug;
var targetDir = path.resolve(build ? 'www' : '.tmp');

// if we just use emualate or run without specifying platform, we assume iOS
// in this case the value returned from yargs would just be true
if (emulate === true) {
    emulate = 'ios';
}
if (run === true) {
    run = 'ios';
}

// global error handler
var errorHandler = function(error) {
  if (build) {
    throw error;
  } else {
    beep(2, 170);
    plugins.util.log(error);
  }
};


// clean target dir
gulp.task('clean', function(done) {
  del([targetDir], done);
});

// precompile .scss and concat with ionic.css
gulp.task('styles', function() {

  var options = build ? { style: 'compressed' } : { style: 'expanded' };

  var sassStream = plugins.rubySass('app/styles/main.scss', options)
      .pipe(plugins.autoprefixer('last 1 Chrome version', 'last 3 iOS versions', 'last 3 Android versions'))

  var cssStream = gulp
    .src('bower_components/ionic/css/ionic.min.css');

  return streamqueue({ objectMode: true }, cssStream, sassStream)
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.if(build, plugins.stripCssComments()))
    .pipe(plugins.if(build && !emulate, plugins.rev()))
    .pipe(gulp.dest(path.join(targetDir, 'styles')))
    .on('error', errorHandler);
});


// build templatecache, copy scripts.
// if build: concat, minsafe, uglify and versionize
gulp.task('scripts', function() {
  var dest = path.join(targetDir, 'scripts');

  var minifyConfig = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true
  };

  // prepare angular template cache from html templates
  // (remember to change appName var to desired module name)
  var templateStream = gulp
    .src('**/*.html', { cwd: 'app/templates'})
    .pipe(plugins.angularTemplatecache('templates.js', {
      root: 'templates/',
      module: appName,
      htmlmin: build && minifyConfig
    }));

  var scriptStream = gulp
    .src(['templates.js', 'app.js', '**/*.js'], { cwd: 'app/scripts' })

    .pipe(plugins.if(!build, plugins.changed(dest)));

  return streamqueue({ objectMode: true }, scriptStream, templateStream)
    .pipe(plugins.if(build, plugins.ngAnnotate()))
    .pipe(plugins.if(stripDebug, plugins.stripDebug()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build && !emulate, plugins.rev()))

    .pipe(gulp.dest(dest))

    .on('error', errorHandler);
});

// copy fonts
gulp.task('fonts', function() {
  return gulp
    .src(['app/fonts/*.*', 'bower_components/ionic/fonts/*.*'])

    .pipe(gulp.dest(path.join(targetDir, 'fonts')))

    .on('error', errorHandler);
});


// copy templates
gulp.task('templates', function() {
  return gulp.src('app/templates/**/*.*')
    .pipe(gulp.dest(path.join(targetDir, 'templates')))

    .on('error', errorHandler);
});

// generate iconfont
gulp.task('iconfont', function(){
  return gulp.src('app/icons/*.svg', {
        buffer: false
    })
    .pipe(plugins.iconfontCss({
      fontName: 'ownIconFont',
      path: 'app/icons/own-icons-template.css',
      targetPath: '../styles/own-icons.css',
      fontPath: '../fonts/'
    }))
    .pipe(plugins.iconfont({
        fontName: 'ownIconFont'
    }))
    .pipe(gulp.dest(path.join(targetDir, 'fonts')))
    .on('error', errorHandler);
});

// copy images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.*')
    .pipe(gulp.dest(path.join(targetDir, 'images')))

    .on('error', errorHandler);
});


// lint js sources based on .jshintrc ruleset
gulp.task('jsHint', function(done) {
  return gulp
    .src('app/scripts/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))

    .on('error', errorHandler);
    done();
});

// concatenate and minify vendor sources
gulp.task('vendor', function() {
  var vendorFiles = require('./vendor.json');

  return gulp.src(vendorFiles)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))

    .pipe(gulp.dest(targetDir))

    .on('error', errorHandler);
});


// inject the files in index.html
gulp.task('index', ['jsHint', 'scripts'], function() {

  // build has a '-versionnumber' suffix
  var cssNaming = 'styles/main*';

  // injects 'src' into index.html at position 'tag'
  var _inject = function(src, tag) {
    return plugins.inject(src, {
      starttag: '<!-- inject:' + tag + ':{{ext}} -->',
      read: false,
      addRootSlash: false
    });
  };

  // get all our javascript sources
  // in development mode, it's better to add each file seperately.
  // it makes debugging easier.
  var _getAllScriptSources = function() {
    var scriptStream = gulp.src(['scripts/app.js', 'scripts/**/*.js'], { cwd: targetDir });
    return streamqueue({ objectMode: true }, scriptStream);
  };

  return gulp.src('app/index.html')
    // inject css
    .pipe(_inject(gulp.src(cssNaming, { cwd: targetDir }), 'app-styles'))
    // inject vendor.js
    .pipe(_inject(gulp.src('vendor*.js', { cwd: targetDir }), 'vendor'))
    // inject app.js (build) or all js files indivually (dev)
    .pipe(plugins.if(build,
      _inject(gulp.src('scripts/app*.js', { cwd: targetDir }), 'app'),
      _inject(_getAllScriptSources(), 'app')
    ))

    .pipe(gulp.dest(targetDir))
    .on('error', errorHandler);
});

// start local express server
var expressServer = null;

gulp.task('serve', function() {
    expressServer =
    express()
    .use(!build ? connectLr() : function(){})
    .use(express.static(targetDir))
    .listen(port);
  open('http://localhost:' + port + '/');
});

gulp.task('stop-serve', function(){
  if(expressServer){
    expressServer.close();
    process.exit();
  }
});

// ionic emulate wrapper
gulp.task('ionic:emulate', plugins.shell.task([
  'ionic emulate ' + emulate + ' --livereload --consolelogs'
]));

// ionic run wrapper
gulp.task('ionic:run', plugins.shell.task([
  'ionic run ' + run
]));

gulp.task('ionic:build-android', plugins.shell.task([
  'ionic build android'
]));

// ionic resources wrapper
gulp.task('icon', plugins.shell.task([
  'ionic resources --icon'
]));
gulp.task('splash', plugins.shell.task([
  'ionic resources --splash'
]));
gulp.task('resources', plugins.shell.task([
  'ionic resources'
]));

// select emulator device
gulp.task('select', plugins.shell.task([
  './helpers/emulateios'
]));

// ripple emulator
gulp.task('ripple', ['scripts', 'styles', 'watchers'], function() {

  var options = {
    keepAlive: false,
    open: true,
    port: 4400
  };

  // Start the ripple server
  ripple.emulate.start(options);

  open('http://localhost:' + options.port + '?enableripple=true');
});

// Unit Testing
// Pass non-existent file to force gulp karma to read karma.conf.js properly
// See: http://stackoverflow.com/questions/22413767/angular-testing-with-karma-module-is-not-defined
// & https://github.com/lazd/gulp-karma/issues/9

gulp.task('unittest', function() {
  // Be sure to return the stream
  return gulp.src('./nonexistentfile')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('karma-watch', function() {
  gulp.src('./nonexistentfile')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

// e2e testing
gulp.task('protractor-tests', function(){
  return gulp.src(['./src/tests/*.js'])
      .pipe(angularProtractor({
          'configFile': 'tests/e2e/conf.js',
          'args': ['--baseUrl', 'http://127.0.0.1:8000'],
          'autoStartStopServer': true,
          'debug': true
      }))
      .on('error', function(e) { throw e });
})

gulp.task('e2e-tests', ['build'], function(){
  runSequence(
    'serve',
    'protractor-tests',
    'stop-serve'
    );
});

// start watchers
gulp.task('watchers', function() {
  plugins.livereload.listen();
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**', ['fonts']);
  gulp.watch('app/icons/**', ['iconfont']);
  gulp.watch('app/images/**', ['images']);
  gulp.watch('app/scripts/**/*.js', ['index']);
  gulp.watch('./vendor.json', ['vendor']);
  gulp.watch('app/templates/**/*.html', ['index']);
  gulp.watch('app/index.html', ['index']);
  gulp.watch(targetDir + '/**')
    .on('change', plugins.livereload.changed)
    .on('error', errorHandler);
});

// no-op = empty function
gulp.task('noop', function() {});

gulp.task('build', function(){
  runSequence(
    'clean',
    'iconfont',
    [
      'fonts',
      'templates',
      'styles',
      'images',
      'vendor'
    ],
    'index');
});

gulp.task('build-android', function(done) {
  runSequence(
    'build',
    'ionic:build-android');
});

// our main sequence, with some conditional jobs depending on params
gulp.task('default', function(done) {
  runSequence(
    'clean',
    'iconfont',
    [
      'fonts',
      'templates',
      'styles',
      'images',
      'vendor'
    ],
    'index',
    build ? 'noop' : 'watchers',
    build ? 'noop' : 'serve',
    'karma-watch',
    emulate ? ['ionic:emulate', 'watchers'] : 'noop',
    run ? 'ionic:run' : 'noop',
    done);
});
