'use strict';

angular.module('core').service('logger', ['Utility',
    function (Utility) {
        var service = {};

        service.getLogs = function (limit){
            return Utility.http.get('log', { limit: limit });
        };

        service.getLog = function (log){
            var logId = log;

            if(log._id){
                logId = log._id;
            }

            return Utility.http.get('log/' + logId);
        };

        service.error = function (message, data){
            return Utility.http.post('log', {
                type: 'error',
                message: message,
                data: data
            });
        };

        service.info = function (message, data){
            return Utility.http.post('log', {
                type: 'info',
                message: message,
                data: data
            });
        };

        service.success = function (message, data){
            return Utility.http.post('log', {
                type: 'success',
                message: message,
                data: data
            });
        };

        service.warning = function (message, data){
            return Utility.http.post('log', {
                type: 'warning',
                message: message,
                data: data
            });
        };

        return service;
    }
]);
