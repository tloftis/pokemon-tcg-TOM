'use strict';

/**
 * Module dependencies.
 */

var path = require('path'),
    mongoose = require('mongoose'),
    Tournament = mongoose.model('pokemonTournaments'),
    async = require('async'),
    xml2js = require('xml2js'),
    countries = require(path.resolve('./countries.json')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current tourny
 */
exports.get= function (req, res) {
    res.json(req.tourny);
};

/**
 * Show the current tourny
 */
exports.getCountries = function (req, res) {
    res.json(countries);
};

/**
 * Update a Tournament
 */
exports.create = function (req, res) {
    // Init Variables
    var tourny = new Tournament(req.body);

    // Then save the tourny
    tourny.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(tourny);
    });
};

/**
 * Update a Tournament
 */
exports.update = function (req, res) {
    var tourny = req.tourny;
    var newTournament = req.body || {};

    //For security purposes only merge these parameters
    tourny.firstName = newTournament.firstName || tourny.firstName;

    tourny.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(tourny);
    });
};

/**
 * Delete a tourny
 */
exports.delete = function (req, res) {
    var tourny = req.tourny;

    tourny.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(tourny);
    });
};

/**
 * List of Tournaments
 */
exports.list = function (req, res) {
    Tournament.find({}).sort('-created').lean().exec(function (err, tournys) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(tournys);
    });
};

/**
 * List of Tournaments
 */
exports.parseTournamentsFile = function (req, res) {
    var xml = req.body || {};

    xml2js.parseString(xml.xml, function (err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        async.forEach(result.tournys.tourny, function(tourny, next){
            var newTournament = new Tournament({
                pokeId: tourny['$'].userid,
                firstName: tourny.firstname[0],
                lastName: tourny.lastname[0],
                dob: new Date(tourny.birthdate[0])
            });

            // Add missing tourny fields
            newTournament.displayName = newTournament.firstName + ' ' + newTournament.lastName;

            // Then save the tourny
            newTournament.save(()=>next());
        }, function(){
            res.json('Finished Adding Users!');
        });
    });
};

/**
 * List of Tournaments
 */
exports.createTournamentsFile = function (req, res) {
    var tourny = req.tourny;

    var xmlJson = {
        tournament: {
            $: {
                type: '2',
                    stage: '1',
                    version: '1.48',
                    gametype: 'TRADING_CARD_GAME',
                    mode: 'CUSTOM'
            },
            data: [
                {
                    name: [
                        'asdf'
                    ],
                    id: [
                        ''
                    ],
                    city: [
                        'asdf'
                    ],
                    state: [
                        'asdf'
                    ],
                    country: [
                        'United States'
                    ],
                    roundtime: [
                        '0'
                    ],
                    finalsroundtime: [
                        '0'
                    ],
                    organizer: [
                        {
                            $: {
                                'popid': '1234567',
                                'name': 'tim loftis'
                            }
                        }
                    ],
                    startdate: [
                        '12/20/2016'
                    ],
                    lessswiss: [
                        'false'
                    ],
                    autotablenumber: [
                        'true'
                    ],
                    overflowtablestart: [
                        '0'
                    ]
                }
            ],
                timeelapsed: [
                '0'
            ],
                players: [
                '\n\t'
            ],
                pods: [
                '\n\t'
            ],
                finalsoptions: [
                '\n\t'
            ]
        }
    };

    xml2js.parseString(xml.xml, function (err, result) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        async.forEach(result.tournys.tourny, function(tourny, next){
            var newTournament = new Tournament({
                pokeId: tourny['$'].userid,
                firstName: tourny.firstname[0],
                lastName: tourny.lastname[0],
                dob: new Date(tourny.birthdate[0])
            });

            // Add missing tourny fields
            newTournament.displayName = newTournament.firstName + ' ' + newTournament.lastName;

            // Then save the tourny
            newTournament.save(()=>next());
        }, function(){
            res.json('Finished Adding Users!');
        });
    });
};

/**
 * Tournament middleware
 */
exports.tournyByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Tournament is invalid'
        });
    }

    Tournament.findById(id, '-salt -password').exec(function (err, tourny) {
        if (err) {
            return next(err);
        } else if (!tourny) {
            return next(new Error('Failed to load Tournament ' + id));
        }

        req.tourny = tourny;
        next();
    });
};
