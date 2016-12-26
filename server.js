'use strict';

require('dotenv').load();
global.rootDir = __dirname;

global.rootRequire = function(str){
    return require(str);
};

global.rootRequire.resolve = function(str){
    return require.resolve(str);
};

require('./config/lib/app').start(function(app, db, config){
    /*if(config.secure.ssl && (config.port !== 80)){
        var redirectApp = require('express')();

        redirectApp.get('*',function(req,res){
            res.redirect('https://' + req.get('host') + req.url);
        });

        redirectApp.listen(80, function(){
            console.log('Redirecting HTTP traffic to HTTPS');
        });
    }*/
});
