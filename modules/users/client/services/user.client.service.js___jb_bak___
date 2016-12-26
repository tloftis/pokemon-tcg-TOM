'use strict';

angular.module('users').service('usersService', ['Utility',
    function (Utility) {
        var service = {};

        service.getLogs = function (populate){
            return Utility.http.get('users/logs', { populate: populate });
        };

        service.signIn = function(creds){
            return Utility.http.post('auth/signin', creds);
        };

        service.resetPassword = function(token, passDetails){
            return Utility.http.post('auth/reset/' + token, passDetails);
        };

        service.createUser = function(creds){
            return Utility.http.post('users', creds);
        };

        return service;
    }
]);