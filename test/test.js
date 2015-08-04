var assert = require('assert');
var P = require('../promise-polyfill');
var firstResolveVal = 'a';
var secondResolveVal = 'b';
var thirdRejectVal = 'c';
var promise = new P(function (resolve, reject) {
    resolve(firstResolveVal);
});
promise
    .then(function (val) {
        assert.equal(firstResolveVal, val, 'error 0');
        return new P(function (resolve, reject) {
            setTimeout(function () {
                resolve(secondResolveVal);
            }, 100);
        });
    })
    .then(function (val) {
        assert.equal(secondResolveVal, val, 'error 1');
        return new P(function (resolve, reject) {
            reject(thirdRejectVal);
        });
    })
    .catch(function (val) {
        assert.equal(thirdRejectVal, val, 'error 2');
    });