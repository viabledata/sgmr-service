# sGMR Service

### Getting started

1 - Clone this repo
2 - Install package dependencies
```sh
npm install
```

### Build the application (dev mode)
```sh
npm run build-dev
```

### Running application
```sh
npm start
```

### Running tests
```sh
npm test
```

### Running linter
```sh
npm run lint -- <directory>
```

### Running End to End tests (cypress tests)
There are two ways to run cypress tests, using the cypress test runner or running cypress tests using the command line.
(You will need both sGMR FE and API services running before triggering Cypress)
By default tests run against local environment.

#### Running Cypress Test Runner
```sh
npm run cypress:runner
```

#### Running Cypress Test Runner with Dev Environment settings
```sh
npm run cypress:runner -- --env configFile=dev
```

Once TestRunner launched, click on the interested spec inside folder cypress/integration/sGMR

#### Running Cypress tests using the command line

## Running all tests on local Environment, (It executes tests headless mode on Electron Browser)
```sh
npm run cypress:test:local
```

## Running all tests on Development Environment, (It executes tests headless mode on Electron Browser)
```sh
npm run cypress:test:dev
```

## Running a specific test
```sh
npm run cypress:test:local -- --spec cypress/integration/sGMR/register-user.spec.js
```

## Running specific test with chrome browser
```sh
npm run cypress:test:local -- --browser chrome --spec cypress/integration/sGMR/register-user.spec.js
```