'use strict';

angular.module('pokemon').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Pokemon',
            state: 'pokemon',
            type: 'dropdown',
            roles: ['user', 'admin']
        });

        Menus.addSubMenuItem('topbar', 'pokemon', {
            title: 'Player List',
            state: 'pokemon.players.list',
            roles: ['user', 'admin']
        });

        Menus.addSubMenuItem('topbar', 'pokemon', {
            title: 'Add Player',
            state: 'pokemon.players.create',
            roles: ['user', 'admin']
        });

        Menus.addSubMenuItem('topbar', 'pokemon', {
            title: 'Upload XML File',
            state: 'pokemon.players.upload',
            roles: ['user', 'admin']
        });
    }
]);

