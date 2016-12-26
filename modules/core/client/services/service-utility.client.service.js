'use strict';

angular.module('core').factory('Utility', ['$http', 'toastr', '$q',
    function ($http, toastr, $q) {
        var servUtil = {};
        var errorParser = function (error) {
            if (typeof error === 'undefined') {
                return 'blank error message received';
            }else if (typeof error === 'string') {
                return error;
            }else if (error.message && typeof error.message === 'string') {
                return error.message;
            }else if (error.error && typeof error.error === 'string') {
                return error.error;
            }else if(typeof (error.data || {}).message === 'string') {
                return error.data.message;
            }else{
                return 'Missing or strangely formatted error message received';
            }
        };

        servUtil.log = {
            _post: function (type, msg, consoleType) {
                //when in development mode, log these messages to the console as well
                if (window.env === 'development'){
                    if(type === 'error'){
                        console.error(msg, (new Error(msg)));
                    }else{
                        console[consoleType || type](msg);
                    }
                }

                if (['error', 'success', 'warning'].indexOf(type) > -1) {
                    msg = msg.message ? msg.message : msg;
                    toastr[type](msg);
                }
            },
            debug: function (msg) {
                servUtil.log._post('debug', msg);
            },
            success: function (msg) {
                servUtil.log._post('success', msg, 'info');
            },
            warning: function (msg) {
                servUtil.log._post('warning', msg, 'warn');
            },
            error: function (msg) {
                servUtil.log._post('error', msg);
            }
        };

        servUtil.http = {
            get: function (rt, params) {
                var query = {};
                query.params = params || {};

                return $q(function(resolve, reject){
                    $http.get('/api/' + rt, query)
                        .success(function (data) {
                            servUtil.log.debug('GET ' + rt + ': success');
                            resolve(data);
                        })
                        .error(function (data, status) {
                            var errMsg = 'GET ' + rt + ': Failed. Status=' + status + '  - Msg=\'' + errorParser(data) + '\'';
                            servUtil.log.error(errMsg);
                            reject(new Error(errMsg));
                        });
                });

            },

            post: function (rt, payload) {
                return $q(function(resolve, reject){
                    $http.post('/api/' + rt, payload)
                        .success(function (data) {
                            servUtil.log.debug('POST ' + rt + ': success');
                            resolve(data);
                        })
                        .error(function (data, status) {
                            var errMsg = 'POST ' + rt + ': Failed. Status=' + status + '  - Msg=\'' + errorParser(data) + '\'';
                            servUtil.log.error(errMsg);
                            reject(new Error(errMsg));
                        });
                });
            },

            put: function (rt, payload) {
                return $q(function(resolve, reject){
                    $http.put('/api/' + rt, payload)
                        .success(function (data) {
                            servUtil.log.debug('PUT ' + rt + ': success');
                            resolve(data);
                        })
                        .error(function (data, status) {
                            var errMsg = 'PUT ' + rt + ': Failed. Status=' + status + '  - Msg=\'' + errorParser(data) + '\'';
                            servUtil.log.error(errMsg);
                            reject(new Error(errMsg));
                        });
                });
            },

            delete: function (rt, payload) {
                return $q(function(resolve, reject){
                    $http.delete('/api/' + rt, payload)
                        .success(function (data) {
                            servUtil.log.debug('DELETE ' + rt + ': success');
                            resolve(data);
                        })
                        .error(function (data, status) {
                            var errMsg = 'DELETE ' + rt + ': Failed. Status=' + status + '  - Msg=\'' + errorParser(data) + '\'';
                            servUtil.log.error(errMsg);
                            reject(new Error(errMsg));
                        });
                });
            }
        };

        return servUtil;
    }]
);
