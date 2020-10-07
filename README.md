# HTEC QA Automation Demo Project

Protractor automation test suite.

## :rocket: Project Setup

#### :bell: Preconditions

1. [nodejs](https://nodejs.org/en/) (and npm) is installed.
2. [JDK](https://www.java.com/en/download/manual.jsp) is installed and added to path.
3. Chrome (and/or Firefox) should be updated to the latest version.

#### :cd: Installation

Install protractor globally (also installs webdriver-manager)
`npm i -g protractor`

Update webdriver-manager:
`webdriver-manager update`

Clone this repo, and in its root directory run:
`npm i` to install the dependencies.

#### :fire: Running tests

Fire up two CLI's. Run the webdriver-manager in one like so:
`webdriver-manager start`

Use the other to run the actual tests.

- `npm run test` will run all tests.

And:

- `npm run test-ui` will run only ui test suite.
- `npm run test-api` will run only api test suite.

**Note:** Tests will cleanup after themselves, which means you can run them in any order and as many times as you wish.

#### :chart_with_upwards_trend: Reports

After each test run, reports will be generated in the `reports` directory.
Generated HTML file is more suitable for manual review.

#### :bomb: Misc

[Because of this](https://bugs.chromium.org/p/chromedriver/issues/detail?id=2702&q=&sort=-id&colspec=ID%20Status%20Pri%20Owner%20Summary) :bug: I almost lost my mind. Up in here, up in here.

## Author

:man: Boris Grabovac
:email: grabovacb86@gmail.com
