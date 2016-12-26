'use strict';

// Configuring the Articles module
angular.module('users').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Users',
            state: 'users',
            type: 'dropdown',
            roles: ['admin']
        });

        Menus.addSubMenuItem('topbar', 'users', {
            title: 'View Users',
            state: 'admin.users.list'
        });

        Menus.addSubMenuItem('topbar', 'users', {
            title: 'Create User',
            state: 'admin.users.create'
        });

        Menus.addSubMenuItem('topbar', 'users', {
            title: 'User Logs',
            state: 'admin.users.log'
        });
    }
]);
