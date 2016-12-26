'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.min.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
                'public/lib/font-awesome/css/font-awesome.min.css',
                'public/lib/sweetalert/dist/sweetalert.min.css',
                'public/lib/angular-toastr/dist/angular-toastr.min.css'
            ],
            js: [
                'public/lib/angular/angular.min.js',
                'public/lib/sweetalert/dist/sweetalert.min.js',
                'public/lib/ng-sweet-alert/ng-sweet-alert.js',
                'public/lib/angular-toastr/dist/angular-toastr.tpls.min.js',
                'public/lib/angular-resource/angular-resource.min.js',
                'public/lib/angular-animate/angular-animate.min.js',
                'public/lib/angular-messages/angular-messages.min.js',
                'public/lib/angular-ui-router/release/angular-ui-router.min.js',
                'public/lib/angular-ui-utils/ui-utils.min.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'public/lib/lodash/dist/lodash.min.js',
                'public/lib/moment/moment.min.js',
                'public/lib/angular-file-upload/angular-file-upload.min.js',
                'public/lib/owasp-password-strength-test/owasp-password-strength-test.js'
            ]
        },
        css: 'public/dist/application.min.css',
        js: 'public/dist/application.min.js'
    }
};
