'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
    function ($scope, $http, $location, Users, Authentication) {
        $scope.user = Authentication.user;

        // Update a user profile
        $scope.updateUserProfile = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            var user = new Users($scope.user);

            user.$update(function (response) {
                //$scope.$broadcast('show-errors-reset', 'userForm');
                //Utility.log.success('Profile Saved Successfully');
                $scope.success = true;
                Authentication.user = response;
            }, function (response) {
                //$scope.error = response.data.message;
                //Utility.log.warning(response.data.message);
            });
        };
    }
]);
