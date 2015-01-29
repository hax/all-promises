# all-promises -- Collect all Promise Implementations

This project is try to collect all Promise implementations which follow ECMAScript 6 standard and Promise/A+ 1.1.1 spec.

## Usage

The goal of this project is to provide a centric location to ease the comparison and testings of different implementations. Normally you only need one Promise implementation in your application, so you would mostly never use this package in the productions.

### Install

```sh
npm install all-promises
```

NOTE: All promise implementations are listed as devDependencies, so that `npm install --production` will not install them.

## Current list of implementations (order by alphabet)

// TODO


## How to add a new implementation

### Criteria

	- MUST register on npm
	- MUST support `new Promise(function executor(resolve, reject) { ... })`, `Promise.resolve()` and `Promise.reject()` API
	- SHOULD pass all Promise/A+ Tests

	NOTE: Currently most implementations don't pass ES6 Promise Tests, so it's not on the MUST list up to now.

### Edit implementations.js

