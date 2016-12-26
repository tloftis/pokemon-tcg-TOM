'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', 'usersService', '$location', '$window', 'Authentication', 'userPasswordService',
    function ($scope, $state, usersService, $location, $window, Authentication, userPasswordService) {
        $scope.authentication = Authentication;
        $scope.popoverMsg = userPasswordService.getPopoverMsg();

        // Get an eventual error defined in the URL query string:
        $scope.error = $location.search().err;

        // If user is signed in then redirect back home
        if ($scope.authentication.user){
            $location.path('/');
        }

        $scope.signin = function (isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                return false;
            }

            usersService.signIn($scope.credentials).then(function (response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the previous or home page
                $state.go($state.previous.state.name || 'home', $state.previous.params);
            });
        };

        // OAuth provider request
        $scope.callOauthProvider = function (url) {
            if ($state.previous && $state.previous.href) {
                url += '?redirect_to=' + encodeURIComponent($state.previous.href);
            }

            // Effectively call OAuth authentication route:
            $window.location.href = url;
        };
    }
]);
