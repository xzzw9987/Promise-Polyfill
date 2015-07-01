
(function () {
    window.P = P;

    function P(foo) {
        var me = this;
        this.success = [];
        this.fail = [];
        this.state = 'pending';
        this.resolve = resolve;
        this.reject = reject;
        function resolve(val) {
            setTimeout(function () {
                me.state = 'resolve';
                me.promiseValue = val;
                while (me.success.length) {
                    var f = me.success.shift();
                    f(val);
                }
            }, 0);
        }

        function reject(val) {
            setTimeout(function () {
                me.state = 'reject';
                me.rejectValue = val;
                while (me.fail.length) {
                    var f = me.fail.shift();
                    f(val);
                }

            }, 0);
        }

        foo(resolve, reject);
    }

    P.prototype = {
        constructor: P,
        then: function (success, reject) {
            var s, j;
            var ret = new P(function (res, rej) {
                s = res;
                j = rej;
            });
            _pushSuccess.call(this, function (val) {
                var v = success(val);
                if (v instanceof P) {
                    v.then(function (val) {
                        ret.resolve(val);
                    }, function () {
                    });
                }
                else {
                    s && s(v);
                }
            });
            /*
             @todo
             replace like _pushFail
             */
            this.fail.push(function (val) {
                j && j(val);
                reject(val);
            });
            return ret;
        }
    };

    function _pushSuccess(foo) {
        var success = this.success;
        success.push(foo);
        if (this.state === 'resolve') {
            while (success.length) {
                var f = success.shift();
                f(this.promiseValue);
            }
        }
    }
})();