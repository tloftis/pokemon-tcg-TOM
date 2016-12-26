'use strict';

angular.module('core').directive('faCheckbox', ['$compile', '$state', function ($compile, $state) {
    return {
        restrict: 'EA', // allow as an element; the default is only an attribute
        scope: {
            'ngModel': '=',
            'ngSize': '@'
        },
        template: '<i class="fa {{ ngSize }} pull-left" ng-class="{ \'fa-check-square-o\': ngModel, \'fa-square-o\': !ngModel }" ng-click="ngModel = !ngModel;"></i>',
        link: function (scope, element, attrs) {
        }
    };
}]);
