## Status

What can this app currently do? The build instructions are fine for a quick start, perhaps this section could
contain more details about the available tasks and the options for running the app.

- Find out all available gulp tasks
-- `gulp ???`
- Run unit tests
-- `gulp unittests`
-- Uses Karma to run Jasmine specs in 'test' directory and then exits
-- Runs the specs against Chrome and PhantomJS as a headless browser
- Run e2e tests
-- 'gulp ???'
- Start a phonegap app
-- 'gulp ???'

## Build instructions

### Install dependencies ###
`npm install & bower install`

During the above command you maybe asked which Angular version you want installed - I chose:
"angular#~1.3.11 which resolved to 1.3.15 and is required by PottyPottyPotty"

### Install Sass ###
Install Sass gem for compiling Sass files:
`gem install sass`

### Run app in browser ###
Run:
`gulp`

(Also runs karma/jasmine unit tests)

## Todo

Tasks yet to do or in progress

## Done

Completed tasks
