'use strict'

module.exports = [
	['bluebird', ['bb']],
	['es6-promise'],
	// ['es6-promise-polyfill'], // based on es6-promise, excluded from the registery by default
	['es6-promises'],
	['lie'],
	['my-promise', ['my']],
	['native-promise-only', ['npo'], exportPromiseShim],
	['promiscuous'],
	['promise', 'then'],
	['promiz'],
	['q'],
	['rsvp'],
	['vow'],
	['when', ['w']],
]


function exportPromiseShim(load) {

	var P0 = global.Promise
	global.Promise = undefined

	load()

	var P1 = global.Promise
	global.Promise = P0

	return P1

}
