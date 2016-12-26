'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    validator = require('validator'),
    Schema = mongoose.Schema;

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
    return (validator.isEmail(email)) || !email;
};

var pokemonPlayerSchema = new Schema({
    dob: {
        type: Date,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    displayName: {
        type: String,
        trim: true
    },
    pokeId: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
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
pokemonPlayerSchema.pre('save', function (next) {
    this.lastEdit = new Date();

    next();
});

mongoose.model('pokemonPlayers', pokemonPlayerSchema, 'pokemon-player');
