Copyright 2015 Charles Armitage & Julian Churchill

[![Build Status](https://travis-ci.org/charlesarmitage/PottyPottyPotty.svg?branch=master)](https://travis-ci.org/charlesarmitage/PottyPottyPotty)

## Quick Start

## Build instructions

### Installing nodejs on Ubuntu ###
Note to fix a clash with the 'amateur packet radio node' program this package also updates
 the soft link /usr/bin/node to point to /etc/alternatives/node which points to /usr/bin/nodejs.

`curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -`
`sudo apt-get install nodejs`

### To update nodejs/npm ###
`sudo npm cache clean -f && sudo npm install -g n && sudo ~/npm/bin/n stable`

### Install dependencies ###
`sudo npm install -g cordova ionic gulp`

`./install-dependencies.sh`

  This runs `npm install`, `bower install` and adds the cordova dependencies (see below).
  If 'npm install' fails with 'lock' errors do this `sudo chown -R $USER ~/.npm` and rerun it.

### Install Sass ###
Install Sass gem for compiling Sass files:
`gem install sass`

### Run app in browser for development ###
- Build and unit test, run app in browser, watch for changes. (Also runs karma/jasmine unit tests)
 - `gulp`

## Gulp tasks

- Run default actions. Clean, build, use karma to run jasmine tests, display results in a browser
 and watch for changes. Also start app in a browser with 'express', watch for changes, rebuild and
  restart automatically. This task is recommended as it will ensure all source is rebuilt correctly
   and tests are rerun.
 - `gulp`
- Find out all available gulp tasks
 - `gulp -T`
- Build javascript app then stop
 - `gulp build`
- Run unit tests then stop, no rebuilding
 - `gulp unittest`
 - Uses Karma to run Jasmine specs in 'tests/specs' directory and then exits
 - Runs the specs against PhantomJS as a headless browser
- Run end to end (e2e) tests then stop, no rebuilding
 - `gulp e2e-tests`
 - Runs end to end Protractor tests and exits. (Protractor tests are in: 'tests/e2e/specs')
- Build a phonegap app
 - `gulp build-android`
  - To build with ant instead of gradle (i.e. on Travis where the gradle daemon keeps dying) run `ANDROID_BUILD=ant gulp build-android`
  - If you get the error "Current working directory is not a Cordova-based project" then run `gulp -b` to 
  create the www directory then re-run `gulp build-android`.
- Build and start a phonegap app in the emulator
 - 'gulp --run android'
  - Before running this for the first time you may have to run 'cordova platform add android' and possibly
   run the android SDK manager to install a suitable SDK version.
  - If the app does not start/install on the emulator then you will need to manually install it with 
  'adb install <apk_path>'. Subsequent calls to 'gulp --run android' should start the app from then on.
  - If you have further problems please review the 'notes' section below

## Building for Android

Run:
`cordova build android`

Dependencies:
'./install-dependencies.sh' installs the following:
  - Android platform (cordova platform add android)
  - Cordova AppVersion Plugin (https://github.com/whiteoctober/cordova-plugin-app-version)

## Travis

Travis build at: https://travis-ci.org/charlesarmitage/PottyPottyPotty

Deploys artifacts to GitHub 'tags': http://docs.travis-ci.com/user/deployment/releases/
and into the Google Play Store alpha track.

## Status

What can this app currently do? The build instructions are fine for a quick start, perhaps this section could
contain more details about the available tasks and the options for running the app.

- See [Trello board](https://trello.com/b/CssnKlKA/potty-training-app)

## Notes

- Adding angular modules/bower components
  - In summary:
    - add script paths to vendor.json and karma.conf.js
    - add to app.js as a dependency if you're adding an angular module
  - Example - adding angular-moment to add date difference time stamps for since last wee/poo in home.html

- Build and start a phonegap app in the emulator
  - JJC notes:
    - First time I ran it I was instructed to run 'cordova platform add android'
    - Then running 'gulp --run android' gave me another instruction to "Please install Android target: \"android-22\".". It told me how to run the android SDK manager as installed on my machine, which I did and I ran the update to update the SDK tools and install android-22.
    - Next I get libgl errors, no emulator window, and an emulator process that takes 100% CPU and has to be killed with 'kill -9 <process id>':
      "Waiting for emulator..."
      "libGL error: pci id for fd 14: 80ee:beef, driver(null)"
      - Possibly a VirtualBox error, updating to latest everything (virtualbox, latest guest additions and Ubuntu updates)
    - I ran 'gulp --run android' again and got a gradle error:
      "> No usable Android build tools found. Highest installed version is 19.0.3; minimum version required is 19.1.0."
      - I ran 'android' and installed Android SDK tools 19.1.0, alongside the other versions already installed (19.0.3, 22 and 24.2).
    - Next the app built and installed but i couldn't find it on the emulator. I noticed the following error in the app compilation:
      "It is recommended that the compiler be upgraded. major version 51 is newer than 50"
      - I discovered this referred to javac - 51 => Java 7, 50 => Java 6. I had previously set java 7 to be the default with 'sudo update-alternatives --config java' but this only set 'java'. To set 'javac' you have to 'sudo update-alternatives --config javac' and select a Java 7 compiler (I chose the OpenJDK to match the Java runtime environment). I also did 'rm -rf platforms/android ; cordova add platform android' to force it to recompile everything afresh.

    - App appears to build and install correctly but I still cannot find it on the emulator.

### Travis CLI

_Deploying Releases_

Releases will be deployed when a tag is added to the github repo
`git tag -a v0.57` -m"My awesome release"`
`git push origin --tags`

`gem install travis`
Possibly need to add more gem stuff to get it to install:
`sudo apt-get install ruby1.9.1-dev`
`sudo apt-get install build-essentials`

Can now run Travis CLI for configuring build deployment...
Run: `travis setup releases` with a GitHub OAuth ready (I have not done this yet)

## Status

What can this app currently do? The build instructions are fine for a quick start, perhaps this section could
contain more details about the available tasks and the options for running the app.

- Find out all available gulp tasks
 - `gulp -T

## Done

Completed tasks
=======
    - App appears to build but I still cannot find it on the emulator.
        - After manually installing it with 'adb install <apk>' the app now starts when running 'gulp --run android'
