'use strict';

angular.module('users.admin').controller('UserCreateController', ['$scope', '$state', 'Authentication', 'userPasswordService', 'usersService', 'Utility',
    function ($scope, $state, Authentication, userPasswordService, usersService, Utility){
        $scope.authentication = Authentication;
        $scope.popoverMsg = userPasswordService.getPopoverMsg();
        $scope.requirementsColor = '';
        $scope.requirementsProgress = 0;
        $scope.credentials = { enabled: true, roles: [] };
        $scope.possibleRoles = ['admin', 'user'];

        $scope.createUser = function (user) {
            if (!user.$valid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            usersService.createUser($scope.credentials).then(function (user) {
                Utility.log.success('User Created!');

                $state.go('admin.users.user.view', {
                    userId: user._id
                });
            });
        };

        $scope.addRole = function(role){
            $scope.credentials.roles.push(role);
        };
    }
]);
