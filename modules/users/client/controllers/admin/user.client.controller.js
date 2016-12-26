'use strict';

/* globals swal: true */

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve', 'Utility',
    function ($scope, $state, Authentication, userResolve, Utility){
        $scope.authentication = Authentication;
        $scope.user = userResolve;
        $scope.requirementsColor = '';
        $scope.requirementsProgress = 0;
        $scope.possibleRoles = ['admin', 'user'];

        var roleIndex;

        var once = $scope.$watch('user.roles', function(){
            if($scope.user.roles){
                for(var i = 0; i < $scope.user.roles.length; i++){
                    roleIndex = $scope.possibleRoles.indexOf(userResolve.roles[i]);

                    if(roleIndex !== -1){
                        $scope.possibleRoles.splice(roleIndex, 1);
                    }
                }

                once();
            }
        });

        $scope.remove = function (user){
            swal({
                title:'',
                text: 'Are you sure you want to delete this user?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes',
                closeOnConfirm: true
            }, function(){
                if (user){
                    user.$remove(function(){
                        Utility.log.success('User Removed!');
                        $scope.users.splice($scope.users.indexOf(user), 1);
                    });
                }else{
                    $scope.user.$remove(function (){
                        Utility.log.success('User Removed!');
                        $state.go('admin.users.list');
                    });
                }
            });
        };

        $scope.update = function (isValid){
            if (!isValid){
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            var user = $scope.user;

            user.$update(function (){
                //Utility.log.success('User Updated!');

                $state.go('admin.users.user.view', {
                    userId: user._id
                });
            }, function (errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
