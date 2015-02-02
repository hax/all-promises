'use strict'

var assert = require('assert')
var list = require('./index').list

list.forEach(function (impl, index) {
	console.log(index + '.', 'package name:', impl.name, 'aliases:', impl.aliases)
	var Promise = impl.Promise // Promise constructor
	if (Promise) Promise.resolve(1).then(function (x) { assert(x === 1) })
	else console.warn(impl.error)
})
