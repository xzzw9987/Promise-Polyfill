/**
 * @Author XinZhongZhu
 */
(function (global) {
    if (typeof define === 'function' && define.amd) {
        define(function (require, exports, module) {
            module.exports = P;
        });
    }
    else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = P;
    }
    else {
        global.P = P;
    }

    function P(foo) {
        var me = this;
        var funcs = ['resolve', 'reject'].map(function (funcName) {
            return function (val) {
                setTimeout(function () {
                    if (funcName === 'reject')
                        console.error('Promise is rejected, reject value is ' + val);
                    me.state = funcName;
                    me.promiseValue = val;
                    _pushDefferList.call(me, null, me[funcName + 'List']);
                }, 0);
            }
        });
        this.resolveList = [];
        this.rejectList = [];
        this.state = 'pending';
        this.resolve = funcs[0];
        this.reject = funcs[1];
        foo(this.resolve, this.reject);
    }

    P.prototype = {
        constructor: P,
        catch: function (callback) {
            return this.then(null, callback);
        },
        then: function (whenResolve, whenReject) {
            var s, j, me = this;
            var ret = new P(function (res, rej) {
                s = res;
                j = rej;
            });
            // Push to corresponding callback list
            ['resolve', 'reject'].forEach(function (func) {
                var f = (func === 'resolve') ? whenResolve : whenReject;
                var w = (func === 'resolve') ? s : j;
                _pushDefferList.call(me, function (val) {
                    var v = f && f(val);
                    if (v instanceof P) {
                        v.then(function (val) {
                            ret.resolve(val);
                        }, function (val) {
                            ret.reject(val);
                        });
                    }
                    else {
                        func === 'reject' && w && w(val);
                        func === 'resolve' && w && w(v);
                    }
                }, me[func + 'List']);
            });
            return ret;
        }
    };
    function _pushDefferList(foo, list) {
        foo && list.push(foo);
        if (this.state !== 'pending') {
            while (list.length) {
                list.shift()(this.promiseValue);
            }
        }
    }
})(this);

