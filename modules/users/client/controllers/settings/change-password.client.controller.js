'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication', 'userPasswordService',
    function ($scope, $http, Authentication, userPasswordService) {
        $scope.user = Authentication.user;
        $scope.popoverMsg = userPasswordService.getPopoverMsg();
        $scope.requirementsColor = '';
        $scope.requirementsProgress = 0;

        // Change user password
        $scope.changeUserPassword = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'passwordForm');

                return false;
            }

            $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
                // If successful show success message and clear form
                $scope.$broadcast('show-errors-reset', 'passwordForm');
                //$scope.success = true;
                //Utility.log.success('Password Changed Successfully');
                $scope.passwordDetails = null;
            }).error(function (response) {
                //Utility.log.warning(response.message);
            });
        };
    }
]);
