'use strict';

angular.module('pokemon').service('pokemonPlayerService', ['Utility',
    function (Utility) {
        var service = {};

        service.getPlayers = function (){
            return Utility.http.get('pokemon/players');
        };

        service.createPlayer = function(player){
            return Utility.http.post('pokemon/players', player);
        };

        service.uploadPlayers = function(xmlData){
            return Utility.http.put('pokemon/players', {xml:xmlData});
        };

        service.getPlayer = function(pokemonId){
            pokemonId = (pokemonId || {})._id || pokemonId;
            return Utility.http.get('pokemon/players/' + pokemonId);
        };

        service.updatePlayer = function(pokemonId, player){
            pokemonId = (pokemonId || {})._id || pokemonId;
            return Utility.http.put('pokemon/players/' + pokemonId, player);
        };

        service.removePlayer = function(pokemonId){
            pokemonId = (pokemonId || {})._id || pokemonId;
            return Utility.http.delete('pokemon/players/' + pokemonId);
        };

        return service;
    }
]);