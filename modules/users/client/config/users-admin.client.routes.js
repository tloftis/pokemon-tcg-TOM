'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.
        state('admin.users', {
            url: '/users',
            templateUrl: 'modules/users/client/views/users.client.view.html',
            abstract: true,
            bcName: 'Users',
            bcInclude: true,
            bcReDirect: 'admin.users.list'
        }).
        state('admin.users.log', {
            url: '/log',
            bcName: 'Logs',
            bcInclude: true,
            views: {
                '@system.users': {
                    templateUrl: 'modules/users/client/views/users-log.client.view.html',
                    controller: 'UsersLogController'
                },
                'headerView@system.users': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'User Logs',
                            desc: '',
                            faIcon: 'fa-user fa-fw'
                        };
                    }
                }
            }
        }).
        state('admin.users.create', {
            url: '/create',
            bcName: 'Create User',
            bcInclude: true,
            views: {
                '@admin.users': {
                    templateUrl: 'modules/users/client/views/admin/user-create.client.view.html',
                    controller: 'UserCreateController'
                },
                'headerView@admin.users': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Create User',
                            desc: '',
                            faIcon: 'fa-user-plus fa-fw'
                        };
                    }
                }
            }
        }).
        state('admin.users.list', {
            url: '/list',
            views: {
                '@admin.users': {
                    templateUrl: 'modules/users/client/views/admin/users-list.client.view.html',
                    controller: 'UserListController'
                },
                'headerView@admin.users': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Users',
                            desc: '',
                            faIcon: 'fa-users fa-fw'
                        };
                    }
                }
            }
        }).
        state('admin.users.user', {
            url: '/:userId',
            abstract: true,
            bcReDirect: 'admin.users.user.view',
            bcName: 'User',
            bcInclude: true
        }).
        state('admin.users.user.view', {
            url: '/view',
            views: {
                '@admin.users': {
                    templateUrl: 'modules/users/client/views/admin/user-view.client.view.html',
                    controller: 'UserController'
                },
                'headerView@admin.users': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'View User',
                            desc: '',
                            faIcon: 'fa-user fa-fw'
                        };
                    }
                }
            },
            resolve: {
                userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
                    return Admin.updateUser.get({
                        userId: $stateParams.userId
                    });
                }]
            }
        }).
        state('admin.users.user.edit', {
            url: '/edit',
            bcName: 'Edit User',
            bcInclude: true,
            views: {
                '@admin.users': {
                    templateUrl: 'modules/users/client/views/admin/user-edit.client.view.html',
                    controller: 'UserController'
                },
                'headerView@admin.users': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Edit User',
                            desc: '',
                            faIcon: 'fa-user-md fa-fw'
                        };
                    }
                }
            },
            resolve: {
                userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
                    return Admin.updateUser.get({
                        userId: $stateParams.userId
                    });
                }]
            }
        });
    }
]);
