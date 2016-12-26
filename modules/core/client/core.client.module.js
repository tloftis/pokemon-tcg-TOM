'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

angular.module('core').config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-left',
        maxOpened: 3,
        newestOnTop: true,
        preventDuplicates: false,
        progressBar: true
    });
});
