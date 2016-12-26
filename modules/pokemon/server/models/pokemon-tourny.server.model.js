'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    validator = require('validator'),
    countries = require(path.resolve('./countries.json')),
    Schema = mongoose.Schema;

var tournySchema = new Schema({
    type: {//Sigle elementaion(1) or Swiss(2)
        type: Number,
        enum: [1,2], //2 = Leauge,PRERELEASE,TCG1DAY,TCG2DAY,VGCPREMIER
        default: Date.now
    },
    stage: {//Unknown Possibly what round the game is on
        type: Number,
        default: 1,
        required: true
    },
    version: {//The version of TOM used
        type: String,
        default: '1.48',
        required: true
    },
    gametype: {//Video game or Trading card
        type: String,
        enum: ['TRADING_CARD_GAME', 'VIDEO_GAME'],
        required: true
    },
    mode: {//What kind of tourny, pre-release, league, custom etc..
        type: String,
        enum: ['LEAGUECHALLENGE', 'CUSTOM', 'PRERELEASE', 'TCG1DAY', 'TCG2DAY', 'VGCPREMIER'],
        required: true
    },
    timeelapsed:{ //Unknown, how much time that has already gone by
        type: Number,
        default: 0,
        required: true
    },
    players: [{ //Whos in the tourny
        type: Schema.ObjectId,
        ref: 'pokemonPlayers'
    }],
    data:{
        name:{ //The name of the game
            type: String,
            required: true
        },
        id: { //The saction ID given by pokemon
            type: String,
            required: false
        },
        city:{ //Name of the city the event is in
            type: String,
            required: true
        },
        state:{//State initials MI, CA, NV ect...
            type: String,
            required: true
        },
        country:{ //Name of the country
            type: String,
            enum: countries,
            required: true
        },
        roundtime:{ //Unknown, possibly the current time in the match
            type: Number,
            default: 0,
            required: true
        },
        finalsroundtime:{//Uknown, possibly for a different time on start
            type: Number,
            default: 0,
            required: true
        },
        organizer: {
            type: Schema.ObjectId,
            ref: 'pokemonPlayers'
        },
        startdate:{ //day the tourny starts
            type: Date,
            default: Date.now
        },
        lessswiss:{ //Not sure, doesn't change between being swiss and not
            type: Boolean,
            required: true
        },
        autotablenumber:{ //Auto table numbers or not
            type: Boolean,
            required: true
        },
        overflowtablestart:{ //Not sure exactly
            type: Number,
            default: 0,
            required: true
        }
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastEdit: {
        type: Date,
        default: Date.now
    }
});

/**
 * Hook a pre save method to hash the password
 */
tournySchema.pre('save', function (next) {
    this.lastEdit = new Date();

    next();
});

mongoose.model('pokemonTournaments', tournySchema, 'pokemon-tourny');
