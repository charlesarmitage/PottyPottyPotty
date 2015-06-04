Copyright 2015 Charles Armitage & Julian Churchill

[![Build Status](https://travis-ci.org/charlesarmitage/PottyPottyPotty.svg?branch=master)](https://travis-ci.org/charlesarmitage/PottyPottyPotty)

## Quick Start

## Build instructions

### Install dependencies ###
`npm install -g cordova ionic && npm install && bower install`

### Install Sass ###
Install Sass gem for compiling Sass files:
`gem install sass`

### Run app in browser for development ###
Run:
`gulp`

(Also runs karma/jasmine unit tests)

### Other build options ###

- Run unit tests
 - `gulp unittests`
 - Uses Karma to run Jasmine specs in 'tests/specs' directory and then exits
 - Runs the specs against Chrome and PhantomJS as a headless browser
- Run e2e tests
 - `gulp e2e-tests`
 - Runs end to end Protractor tests and exits. (Protractor tests are in: 'tests/e2e/specs')
- Start a phonegap app
 - 'gulp --run android'
  - Before running this for the first time you may have to run 'cordova platform add android' and possibly run the android SDK manager to install a suitable SDK version.
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

## Status

What can this app currently do? The build instructions are fine for a quick start, perhaps this section could
contain more details about the available tasks and the options for running the app.

- Find out all available gulp tasks
 - `gulp -T

## Done

Completed tasks
