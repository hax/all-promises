# all-promises

This project is try to collect all Promise implementations which follow [ECMAScript 6 draft](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) (which based on [Promises/A+ 1.1.1](https://promisesaplus.com/)).


## Usage

The goal of this project is to provide a centric location to ease the comparison and testings of different implementations. Normally you only need one Promise implementation in your application, so you would mostly never use this package in the productions.

<!--To find which Promise implementation you should adopt, or just want a solid Promise implementation, I suggest my-promise.-->


### Install

```sh
npm install all-promises
```

NOTE: All implementations are listed as devDependencies, so that `npm install --production` will not install them.


### API


#### `function getPromiseConstructor(name: string): PromiseConstructor`

```js
var Promise = require('all-promises').getPromiseConstructor('q') // q implementation
var p = new Promise(function (resolve) { resolve(1) })
p.then(function (x) { assert(x === 1) })
```


#### `default: PromiseConstructor`

`test.js` file:
```js
var Promise = require('all-promises').default // default implementation
```

You can specify default implementation by passing env variable:
```sh
P=rsvp node test
```

If no env `P` is provided, default to V8 native implementation


#### `list: Array<PromiseImplementation>`

```
interface PromiseImplementation {
	name: string,
	aliases: Array<string>,
	Promise: PromiseConstructor?,
	error: Error?
}
```

```js
var list = require('all-promises').list

list.forEach(function (impl, index) {
	console.log(index + '.', 'package name:', impl.name, 'aliases:', impl.aliases)
	var Promise = impl.Promise // Promise constructor
	if (Promise) Promise.resolve(1).then(function (x) { assert(x === 1) })
	else console.warn(impl.error)
})
```


#### `function register(packageName: string, alias?: string|Array<string>, exportPromise?: string|function)`
#### `function unregister(name: string): boolean`
#### `function has(name: string): boolean`
#### `function get(name: string): PromiseImplementation`

```js
var promises = require('all-promises')

promises.has('es6-promise-polyfill') // false
promises.register('es6-promise-polyfill')
promises.has('es6-promise-polyfill') // true
var impl = promises.get('es6-promise-polyfill')
assert.deepEqual(impl, {
	name: 'es6-promise-polyfill',
	aliases: [],
	Promise: promises.getPromiseConstructor('es6-promise-polyfill'),
})
promises.unregister('es6-promise-polyfill') // true
promises.has('es6-promise-polyfill') // false
promises.unregister('es6-promise-polyfill') // false
```


## Current list of implementations (order by alphabet)

	| package | repo |
	|--|--|
	| [bluebird](https://npmjs.com/package/bluebird) |
	| [es6-promise](https://npmjs.com/package/es6-promise) |
	| [es6-promise-polyfill](https://npmjs.com/package/es6-promise-polyfill) |
	| [es6-promises](https://npmjs.com/package/es6-promises) |
	| [lie](https://npmjs.com/package/lie) |
	| [my-promise](https://npmjs.com/package/my-promise) |
	| [native-promise-only](https://npmjs.com/package/native-promise-only) |
	| [promiscuous](https://npmjs.com/package/promiscuous) |
	| [promise](https://npmjs.com/package/promise) |
	| [promiz](https://npmjs.com/package/promiz) |
	| [q](https://npmjs.com/package/q) |
	| [rsvp](https://npmjs.com/package/rsvp) |
	| [vow](https://npmjs.com/package/vow) |
	| [when](https://npmjs.com/package/when) |


## How to add a new implementation


### Criteria

 - MUST register on npm

 - MUST support `new Promise(function executor(resolve, reject) { ... })`, `Promise.resolve()` and `Promise.reject()` API

 - SHOULD pass all [Promise/A+ Tests](https://github.com/promises-aplus/promises-tests)

	NOTE: Currently most implementations don't pass [ES6 Promise Tests](https://github.com/promises-es6/promises-es6), so it's not on the MUST list up to now.


### Contribute

 0. Edit [implementations.js](https://github.com/hax/all-promises/blob/master/implementations.js)
 0. Edit [package.json](https://github.com/hax/all-promises/blob/master/package.json) (`npm install package-name-of-new-implementation --save-dev`)
 0. Run `npm test`, if everything is ok then
 0. Send [pull request](https://github.com/hax/all-promises/pulls)
