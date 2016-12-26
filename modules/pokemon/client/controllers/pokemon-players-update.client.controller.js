'use strict';

angular.module('pokemon').controller('pokemonPlayerUpdateController', ['$scope', '$stateParams', '$state', 'toastr', 'pokemonPlayerService',
    function ($scope, $stateParams, $state, toastr, pokemonPlayerService) {
        $scope.date = {
            year: (new Date()).getFullYear(),
            day: (new Date()).getDay(),
            month: (new Date()).getMonth()
        };

        $scope.player = {};

        $scope.init = function () {
            pokemonPlayerService.getPlayer($stateParams.playerId).then(function(player){
                $scope.player = player;
                var dob = new Date($scope.player.dob);

                $scope.date = {
                    year: dob.getFullYear(),
                    day: dob.getDay(),
                    month: dob.getMonth()
                };
            });
        };

        $scope.updatePlayer = function(player){
            var dob = new Date();
            dob.setYear($scope.date.year);
            dob.setMonth($scope.date.month - 1);
            dob.setDate($scope.date.day);

            if(dob < (new Date('1/1/1900'))){
                toastr.error('I very much doubt that we have a player that is over 100 years old');
                return;
            }

            player.dob = dob;

            pokemonPlayerService.updatePlayer(player, player).then(function(){
                $state.go('pokemon.players.list');
            });
        };
    }
]);
