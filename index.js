'use strict'

var list = []
exports.list = list

var map = Object.create(null)
function nameIsAvailable(name) {
	return map[name] === undefined
}

var native
if (typeof Promise === 'function') {
	native = Promise
	map.native = list[0] = {
		name: 'native',
		aliases: [],
		Promise: Promise,
		version: process.versions.v8,
	}
}


exports.has = function has(name) {
	return !nameIsAvailable(name)
}

exports.get = function get(name) {
	return map[name]
}

exports.getPromiseConstructor = function getPromiseConstructor(name) {
	return map[name] && map[name].Promise
}

exports.register = function register(name, alias, exportPromise) {
	if (!name) throw new TypeError('name')
	if (!nameIsAvailable(name)) throw new Error('Duplicated name: ' + name)

	var aliases = alias ? [].concat(alias).filter(nameIsAvailable) : []
	var promise, version
	var impl = {
		name: name,
		aliases: aliases,
		get Promise() {
			if (promise !== undefined) return promise
			try {
				promise = getPromise(name, exportPromise)
			} catch (e) {
				console.error(e)
				impl.error = e
				promise = null
			}
			return promise
		},
		get version() {
			if (version !== undefined) return version
			try {
				version = require(name + '/package.json').version
			} catch (e) {
				console.error(e)
			}
			return version
		}
	}
	list.push(impl)
	map[name] = impl
	impl.aliases.forEach(function (alias) { map[alias] = impl })
}

exports.unregister = function unregister(name) {
	if (nameIsAvailable(name)) return false
	var impl = map[name]
	list.splice(list.indexOf(impl), 1)
	delete map[name]
	return true
}

Object.defineProperty(exports, 'default', {
	get: function () {
		var P = process.env.P
		if (P) {
			var impl = exports.get(P)
				|| exports.get(P.toLowerCase())
				|| exports.get(P.toUpperCase())
			if (!impl) console.warn('Unknown Promise implementaion:', P)
			if (impl.Promise) return impl.Promise
		}
		if (native) console.info('Use V8 native implementaion instead')
		return native
	}
})


function getPromise(packageName, exportPromise) {

	var P
	if (typeof exportPromise === 'function') {
		P = exportPromise(function () { return require(packageName) })
	} else {
		var M = require(packageName)
		P = M[exportPromise || 'Promise'] || M
	}

	if (typeof P !== 'function') throw new Error(
			'Failed to export Promise constructor from ' + packageName
			+ ', please recheck its API docs')

	if (P === native) throw new Error(
			packageName + ' may be a polyfill which exports native Promise'
			+ ', please recheck its API docs')

	if (typeof P.resolve !== 'function') throw new Error(
		'Missing Promise.resolve() method from ' + packageName)

	if (typeof P.reject !== 'function') throw new Error(
		'Missing Promise.reject() method from ' + packageName)

	return P

}


var implementations = require('./implementations')

implementations.forEach(function (args) {
	exports.register.apply(undefined, args)
})
