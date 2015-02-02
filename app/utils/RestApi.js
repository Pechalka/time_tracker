define(function (require) {
    'use strict';
    var request = require('superagent');

    var promise = require('promise');

    var WebApi = (function () {
        function Class(url) {
            this.url = url;
        }

        Class.prototype.get = function (id) {
            var deferred = promise.defer();
            request.get(this.url + '/' + (id != null ? id : ''))
                .accept('json')
                .end(function (res) {
                    if (res.error) {
                        return deferred.reject(res.error);
                    }
                    deferred.resolve(res.body);
                });
            return deferred.promise;
        };

        Class.prototype.post = function (item) {
            var deferred = promise.defer();
            request.post(this.url)
                .accept('json')
                .send(item)
                .end(function (res) {
                    if (res.error) {
                        return deferred.reject(res);
                    }
                    deferred.resolve(res.body);
                });
            return deferred.promise;
        };

        Class.prototype.put = function (id, item) {
            var deferred = promise.defer();
            request.put(this.url + '/' + (id != null ? id : ''))
                .accept('json')
                .send(item)
                .end(function (res) {
                    if (res.error) {
                        return deferred.reject(res.error);
                    }
                    deferred.resolve(res.body);
                });
            return deferred.promise;
        };

        Class.prototype.del = function (id) {
            var deferred = promise.defer();
            request.del(this.url + '/' + (id != null ? id : ''))
                .accept('json')
                .end(function (res) {
                    if (res.error) {
                        return deferred.reject(res.error);
                    }
                    deferred.resolve(res.body);
                });
            return deferred.promise;
        };

        return Class;
    }());

    return WebApi;
});
