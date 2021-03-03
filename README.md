# sGMR Service
sGMR frontend service for sgmr-data-api

## Requirements
* npm 6.9.0
* node v8.10.0

## Index
* [Getting started](#getting-started)
* [Native development](#native-development)
* [Development with docker](#development-with-docker)
* [Tests in native development](#tests-in-native-development)
* [Linter in native development](#linter-in-native-development)
* [E2E tests in native development](#e2e-tests-in-native-development)

## Getting started

**1. Clone this repo**

## Native development
**2. Install package dependencies**
```sh
npm install
```
**3. Build development bundle** *(optional)*
```sh
npm run build:dev
```
**4. Start the application** *(optional)*
```sh
npm start
```

## Development with docker
**2. Build the application Docker container**
```bash
docker build -t sgmr-service .
```
**3. Run the resulting Docker container**
```bash
docker run -p 8080:8080 \
    --env API_BASE_URL=https://your.api.com \
    sgmr-service
```

## Tests in native development

Setup your environment as described in [Native development](#native-development)

**3. Running jest tests**
```sh
npm test
```

## Linter in native development

Setup your environment as described in [Native development](#native-development)

**3. Running linter**
```sh
npm run lint -- <directory>
```

## E2E tests in native development

Setup your environment as described in [Native development](#native-development)

There are two ways to run cypress tests, using the cypress test runner or running cypress tests using the command line.

By default tests run against local environment.

**NOTE:** You will need, the [sgmr-service](https://github.com/UKHomeOffice/sgmr-service) along with [sgmr-data-api](https://gitlab.digital.homeoffice.gov.uk/cop/sgmr-data-api), and [ref-data-api](https://github.com/UKHomeOffice/ref-data-api) applications, to be running before triggering Cypress.

#### Running cypress test runner

Running all tests
```sh
npm run cypress:runner
```

Running all tests using environment settings from a configuration file
```sh
npm run cypress:runner -- --env configFile=dev
```
Once TestRunner launched, click on the interested spec inside folder cypress/integration/sGMR

#### Running cypress tests using the command line

Running all tests on local Environment, (It executes tests headless mode on Electron Browser)
```sh
npm run cypress:test:local
```

Running all tests on Development Environment, (It executes tests headless mode on Electron Browser)
```sh
npm run cypress:test:dev
```

Running a specific test
```sh
npm run cypress:test:local -- --spec cypress/integration/sGMR/register-user.spec.js
```

Running specific test with chrome browser
```sh
npm run cypress:test:local -- --browser chrome --spec cypress/integration/sGMR/user-register.spec.js
```

Running All E2E tests and generating mochawesome html report with screenshots
```sh
npm run cypress:test:report -- -b chrome
```

Running specific test and generating mochawesome html report with screenshots
```sh
npm run cypress:test:report -- -b chrome -s cypress/integration/sGMR/user-register.spec.js
```
