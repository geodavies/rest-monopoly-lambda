# Rest Monopoly Lambda
[![Build Status](https://travis-ci.org/geodavies/rest-monopoly-lambda.svg?branch=master)](https://travis-ci.org/geodavies/rest-monopoly-lambda)
[![Coverage Status](https://coveralls.io/repos/github/geodavies/rest-monopoly-lambda/badge.svg?branch=master)](https://coveralls.io/github/geodavies/rest-monopoly-lambda?branch=master)

A collection of lambda functions to control a game of monopoly

## Pre-Install
Before installing and running this project you will need to make sure you have a few things set up first.

**Serverless Framework**
```
npm install -g serverless
```
**AWS CLI**

Note AWS CLI must also be configured with an Access Key and Secret Access key.
```
brew install awscli
aws configure
```
**Java**

DynamoDB Local depends on java being installed on the machine. Install this however you want. I recommend using SDKMAN!
## Install
```
npm install
sls dynamodb install
```
## Running
```
npm start
```
