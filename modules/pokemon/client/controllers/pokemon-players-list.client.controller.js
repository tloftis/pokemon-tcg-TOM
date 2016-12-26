'use strict';

angular.module('pokemon').controller('pokemonPlayerListController', ['$scope', '$stateParams', '$state', 'pokemonPlayerService', '$filter',
    function ($scope, $stateParams, $state, pokemonPlayerService, $filter) {
        $scope.init = function () {
            pokemonPlayerService.getPlayers().then(function(players){
                $scope.players = players;
                $scope.refreshTable($scope.tableSort, $scope.players);
            });
        };

        $scope.removePlayer = function(player){
            pokemonPlayerService.removePlayer(player._id || player).then(function(){
                return pokemonPlayerService.getPlayers();
            }).then(function(players){
                $scope.players = players;
                $scope.refreshTable($scope.tableSort, $scope.players);
            });
        };

        $scope.downloadXml = function(){
            downloadXML ('players.xml', genXml($scope.players));
        };

        $scope.updatePlayer = function(player){
            $state.go('pokemon.players.update', {playerId: player._id});
        };

        $scope.createPlayer = function(){
            $state.go('pokemon.players.create');
        };

        $scope.tableRowCount = [
            5,
            10,
            25,
            50,
            100
        ];

        $scope.tableSort = {
            maxPageNumbers: 5, //The maximum pages it allows you to select from before giving the '...' in the options
            currentPage: 1,
            pagedItems: $scope.players,
            itemsPerPage: $scope.tableRowCount[0],
            reversOrd: false,
            sortBy: 'timestamp',
            search: '',
            end: 0,
            begin: 0,
            total: 0
        };

        $scope.refreshTable = function (config, tableContent) {
            var filteredItems = $filter('filter')(tableContent, {
                $: config.search
            });

            config.total = filteredItems.length;
            config.begin = (config.currentPage - 1) * config.itemsPerPage;
            config.end = config.begin + +config.itemsPerPage;
            config.pagedItems = filteredItems;
        };

        function genXml(players){
            var xmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n\
                <!-- Players database. -->\n\
                <players>\n';

            players.forEach(function(player){
                xmlStr += '\
                <player userid="'+ player.pokeId +'">\n\
                    <firstname>'+ player.firstName +'</firstname>\n\
                    <lastname>'+ player.lastName +'</lastname>\n\
                    <birthdate>'+ moment(new Date(player.dob)).format('MM/DD/YYYY') +'</birthdate>\n\
                    <creationdate>'+ moment(new Date()).format('MM/DD/YYYY hh:mm:ss') +'</creationdate>\n\
                    <lastmodifieddate>'+ moment(new Date()).format('MM/DD/YYYY hh:mm:ss') +'</lastmodifieddate>\n\
                </player>\n';
            });

            xmlStr += '</players>';

            return xmlStr;
        }

        function downloadXML (filename, text) {
            var uint8Array = new Uint8Array(text.split('').map(function (c) {
                    return c.charCodeAt(0);
                })),
                blob = new Blob([uint8Array.buffer]),
                element = document.createElement('div');

            if (navigator.msSaveBlob) { //If IE >10
                navigator.msSaveBlob(blob, filename);
            } else { //Chrome/Firefox/almost anyone else
                element = document.createElement('a');
                element.setAttribute('href', URL.createObjectURL(blob));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        }
    }
]);
