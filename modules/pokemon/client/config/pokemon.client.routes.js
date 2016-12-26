'use strict';

// Setting up route
angular.module('pokemon').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.
        state('pokemon', {
            abstract: true,
            url: '/pokemon',
            bcName: 'Pokemon',
            bcInclude: false,
            templateUrl: 'modules/pokemon/client/views/pokemon.client.view.html',
            controller: 'pokemonController'
        }).
        state('pokemon.players', {
            abstract: true,
            url: '/players',
            bcName: 'Players',
            bcInclude: true,
            bcReDirect: 'pokemon.players.list'
        }).
        state('pokemon.players.list', {
            url: '/list',
            bcName: 'Player List',
            bcInclude: true,
            views: {
                '@pokemon': {
                    templateUrl: 'modules/pokemon/client/views/pokemon-player-list.client.view.html',
                    controller: 'pokemonPlayerListController'
                },
                'headerView@pokemon': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Pokemon Player List',
                            desc: 'All players currently in the system',
                            faIcon: 'fa-users fa-fw'
                        };
                    }
                }
            }
        }).
        state('pokemon.players.create', {
            url: '/add',
            bcName: 'Add Player',
            bcInclude: true,
            views: {
                '@pokemon': {
                    templateUrl: 'modules/pokemon/client/views/pokemon-player-create.client.view.html',
                    controller: 'pokemonPlayerCreateController'
                },
                'headerView@pokemon': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Add Player',
                            desc: 'Add a new player to the system',
                            faIcon: 'fa-cog fa-fw'
                        };
                    }
                }
            }
        }).
        state('pokemon.players.update', {
            url: '/:playerId',
            bcName: 'Update Player',
            bcInclude: true,
            views: {
                '@pokemon': {
                    templateUrl: 'modules/pokemon/client/views/pokemon-player-update.client.view.html',
                    controller: 'pokemonPlayerUpdateController'
                },
                'headerView@pokemon': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Update Player',
                            desc: 'Update a new player to the system',
                            faIcon: 'fa-cog fa-fw'
                        };
                    }
                }
            }
        }).
        state('pokemon.players.upload', {
            url: '/upload',
            bcName: 'Upload',
            bcInclude: true,
            views: {
                '@pokemon': {
                    templateUrl: 'modules/pokemon/client/views/pokemon-player-upload.client.view.html',
                    controller: 'pokemonPlayerUploadController'
                },
                'headerView@pokemon': {
                    controller: function($scope) {
                        $scope.header = {
                            label: 'Upload Players.xml File',
                            desc: 'Upload an existing Players.xml file',
                            faIcon: 'fa-cog fa-fw'
                        };
                    }
                }
            }
        })
    }
]);
