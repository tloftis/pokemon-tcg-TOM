'use strict';

/**
 * Module dependencies.
 */

var path = require('path'),
    mongoose = require('mongoose'),
    Player = mongoose.model('pokemonPlayers'),
    async = require('async'),
    xml2js = require('xml2js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current player
 */
exports.get= function (req, res) {
    res.json(req.player);
};

/**
 * Update a Player
 */
exports.create = function (req, res) {
    // Init Variables
    var player = new Player(req.body);

    // Add missing player fields
    player.displayName = player.firstName + ' ' + player.lastName;

    // Then save the player
    player.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(player);
    });
};

/**
 * Update a Player
 */
exports.update = function (req, res) {
    var player = req.player;
    var newPlayer = req.body || {};

    //For security purposes only merge these parameters
    player.firstName = newPlayer.firstName || player.firstName;
    player.lastName = newPlayer.lastName || player.lastName;
    player.pokeId = newPlayer.pokeId || player.pokeId;
    player.dob = newPlayer.dob || player.dob;
    player.email = newPlayer.email || player.email;
    player.displayName = player.firstName + ' ' + player.lastName;

    player.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(player);
    });
};

/**
 * Delete a player
 */
exports.delete = function (req, res) {
    var player = req.player;

    player.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(player);
    });
};

/**
 * List of Players
 */
exports.list = function (req, res) {
    Player.find({}).sort('-created').lean().exec(function (err, players) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(players);
    });
};

/**
 * List of Players
 */
exports.parsePlayersFile = function (req, res) {
    var xml = req.body || {};

    xml2js.parseString(xml.xml, function (err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        async.forEach(result.players.player, function(player, next){
            var newPlayer = new Player({
                pokeId: player['$'].userid,
                firstName: player.firstname[0],
                lastName: player.lastname[0],
                dob: new Date(player.birthdate[0])
            });

            // Add missing player fields
            newPlayer.displayName = newPlayer.firstName + ' ' + newPlayer.lastName;

            // Then save the player
            newPlayer.save(()=>next());
        }, function(){
            res.json('Finished Adding Users!');
        });
    });
};

/**
 * Player middleware
 */
exports.playerByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Player is invalid'
        });
    }

    Player.findById(id, '-salt -password').exec(function (err, player) {
        if (err) {
            return next(err);
        } else if (!player) {
            return next(new Error('Failed to load Player ' + id));
        }

        req.player = player;
        next();
    });
};
