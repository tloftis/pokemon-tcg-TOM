'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
    secure: {
        ssl: (process.env.APP_SSL_CERT && process.env.APP_SSL_KEY) ? true: false,
        privateKey: process.env.APP_SSL_KEY,
        certificate: process.env.APP_SSL_CERT
    },
    db: {
        uri: process.env.MONGODB_PATH || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/pokemon-dev',
        options: {
            user: '',
            pass: ''
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        // logging with Morgan - https://github.com/expressjs/morgan
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'dev',
        options: {
            // Stream defaults to process.stdout
            // Uncomment/comment to toggle the logging to a log on the file system
            //stream: {
            //    directoryPath: process.cwd(),
            //    fileName: 'access.log',
            //    rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
            //        active: false, // activate to use rotating logs 
            //        fileName: 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
            //        frequency: 'daily',
            //        verbose: false
            //    }
            //}
        }
    },
    app: {
        title: defaultEnvConfig.app.title + ' - Development Environment'
    },
    livereload: true,
    seedDB: {
        seed: process.env.MONGO_SEED === 'true',
        options: {
            logResults: !(process.env.MONGO_SEED_LOG_RESULTS === 'false'),
            seedUser: {
                username: process.env.MONGO_SEED_USER_USERNAME || 'user',
                provider: 'local',
                email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
                firstName: 'User',
                lastName: 'Local',
                displayName: 'User Local',
                enabled: true,
                roles: ['user']
            },
            seedAdmin: {
                username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
                provider: 'local',
                email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
                firstName: 'Admin',
                lastName: 'Local',
                displayName: 'Admin Local',
                enabled: true,
                roles: ['user', 'admin']
            }
        }
    }
};
