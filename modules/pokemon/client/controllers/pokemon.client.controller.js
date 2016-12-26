'use strict';

angular.module('pokemon').controller('pokemonController', ['$scope', '$stateParams', '$state', '$location', 'Authentication',
    function ($scope, $stateParams, $state, $location, Authentication) {
        $scope.authentication = Authentication;
        if ($scope.authentication.user) $location.path('/');
    }
]);
