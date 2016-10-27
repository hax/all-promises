'use strict'

var promises = require('./index')
var assert = require('assert')


console.log('test getPromiseConstructor')
void function () {
	var Promise = promises.getPromiseConstructor('q') // q implementation
	var p = new Promise(function (resolve) { resolve(1) })
	p.then(function (x) { assert(x === 1) })
}()

console.log('test default')
void function () {
	var P = promises.default
	if (P) {
		var p = new P(function (resolve) { resolve(1) })
		p.then(function (x) { assert(x === 1) })
	}
}()

console.log('test list')
var list = promises.list
list.forEach(function (impl, index) {
	console.log(index + '.',
		'package name:', impl.name,
		'aliases:', impl.aliases,
		'version:', impl.version)
	var Promise = impl.Promise // Promise constructor
	if (Promise) Promise.resolve(1).then(function (x) { assert(x === 1) })
	else console.warn(impl.error)
})


console.log('test has/get/register/unregister')
promises.has('es6-promise-polyfill') // false
promises.register('es6-promise-polyfill', [], 'Polyfill')
promises.has('es6-promise-polyfill') // true
var impl = promises.get('es6-promise-polyfill')
assert.deepEqual(impl, {
	name: 'es6-promise-polyfill',
	version: require('es6-promise-polyfill/package.json').version,
	aliases: [],
	Promise: promises.getPromiseConstructor('es6-promise-polyfill'),
})
promises.unregister('es6-promise-polyfill') // true
promises.has('es6-promise-polyfill') // false
promises.unregister('es6-promise-polyfill') // false
