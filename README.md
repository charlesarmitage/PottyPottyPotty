Copyright 2015 Charles Armitage & Julian Churchill

## Status

What can this app currently do? The build instructions are fine for a quick start, perhaps this section could
contain more details about the available tasks and the options for running the app.

- Find out all available gulp tasks
 - `gulp ???`
- Run unit tests
 - `gulp unittests`
 - Uses Karma to run Jasmine specs in 'tests/specs' directory and then exits
 - Runs the specs against Chrome and PhantomJS as a headless browser
- Run e2e tests
 - 'gulp e2e-tests'
 - Runs end to end Protractor tests and exits. (Protractor tests are in: 'tests/e2e/specs')
- Start a phonegap app
 - 'gulp ???'

## Build instructions

### Install dependencies ###
`npm install -g cordova ionic && npm install && bower install`

During the above command you maybe asked which Angular version you want installed - I chose:
"angular#~1.3.11 which resolved to 1.3.15 and is required by PottyPottyPotty"

### Install Sass ###
Install Sass gem for compiling Sass files:
`gem install sass`

### Run app in browser for development ###
Run:
`gulp`

(Also runs karma/jasmine unit tests)

## Todo

Tasks yet to do or in progress

## Done

Completed tasks
