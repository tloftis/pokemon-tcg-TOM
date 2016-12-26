'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$state', '$location', 'Authentication', 'userPasswordService', 'usersService',
    function ($scope, $stateParams, $state, $location, Authentication, userPasswordService, usersService) {
        $scope.authentication = Authentication;
        $scope.popoverMsg = userPasswordService.getPopoverMsg();

        //If user isn't signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        // Submit forgotten password account id
        $scope.askForPasswordReset = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid){
                $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');
                return false;
            }

            usersService.forgotPassword($scope.credentials).then(function (response){
                // Show user success message and clear form
                $scope.credentials = null;
                $scope.success = response.message;
            },function (err){
                // Show user error message and clear form
                $scope.credentials = null;
                $scope.error = err.message;
            });
        };

        // Change user password
        $scope.resetUserPassword = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');
                return false;
            }

            usersService.resetPassword($stateParams.token, $scope.passwordDetails).then(function (response) {
                // If successful show success message and clear form
                $scope.passwordDetails = null;

                // Attach user profile
                Authentication.user = response;

                // And redirect to the index page
                $state.go('password.reset.success');
            }, function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
