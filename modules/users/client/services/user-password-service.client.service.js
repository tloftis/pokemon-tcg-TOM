'use strict';

// userPasswordService service used for testing the password strength
angular.module('users').factory('userPasswordService', ['$window',
    function ($window) {
        var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;
        var service = {};
        
        service.getResult = function (password) {
            return owaspPasswordStrengthTest.test(password);
        };
        
        service.getPopoverMsg = function () {
            return 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.';
        };
        
        return service;
    }
]);
