'use strict';

module.exports = function (app) {
    // User Routes
    var pokemonPlayers = require('../controllers/pokemon-player.server.controller');

    app.route('/api/pokemon/players').
        post(pokemonPlayers.create).
        put(pokemonPlayers.parsePlayersFile).
        get(pokemonPlayers.list);

    app.route('/api/pokemon/players/:pokeId').
        get(pokemonPlayers.get).
        put(pokemonPlayers.update).
        delete(pokemonPlayers.delete);
    
    // Finish by binding the user middleware
    app.param('pokeId', pokemonPlayers.playerByID);
};
