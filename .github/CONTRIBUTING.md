# Contributing

## Get started

Before begin anything, please make sure that you created test for all your modification.

### Prerequisites

To contribute to this project, you will need theses requirements:
- NodeJS >= 10

### Installing

In the first step you fork the repo. After have cloned the project, you will need to install all dependencies and prepare the development environment:
```sh
 # To force git to fetch the master branch
git checkout master
# Comme back the develop
git checkout develop
# Init Git flow with defaults configurations
git flow init -d
# Install npm dependencies
npm install
```

Now you are ready to start development.

### Start a feature

To start a feature, you need to create a new branch:
```sh
# Init a new branch with Git flow
git flow feature start *your-branch*
```

Once you have finish you modification and commit your code, just do:
```
git push -u origin *your-branch*
```

### Make a pull request

After pushed your commit on Github, you can make a pull request to the main repository and wait for a code reviewing and that your modification are accepted.

## Running tests

To run tests, you just have do do theses commands:

```sh
# Run all tests
npm run test
# To make sure that your code is covered by test
npm run coverage
```
