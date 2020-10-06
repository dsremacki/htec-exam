# HTEC QA Automation Demo Project

Protractor automation

## :rocket: Project Setup

#### :bell: Preconditions

1. [nodejs](https://nodejs.org/en/) (and npm) is installed
2. [JDK](https://www.java.com/en/download/manual.jsp) is installed and added to path.

#### :cd: Installation

Install protractor globally (also installs webdriver-manager)
`npm i -g protractor`

Update webdriver-manager:
`webdriver-manager update`

Clone this repo, and in its root directory run:
`npm i`

#### :fire: Running tests

Fire up two CLI's. Run the webdriver-manager in one like so:
`webdriver-manager start`

Use the other to run the actual tests.

- `npm run test` will run all tests.

And:

- `npm run test-ui` will run only ui test suite.
- `npm run test-api` will run only api test suite.

**Note:** Tests will cleanup after themselves, which means you can run them in any order and as many times as you wish.

## Author

:man: Boris Grabovac
:email: grabovacb86@gmail.com
