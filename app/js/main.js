require.config({
    paths   : {
        'angular'           : '../bower_components/angular/angular.min',
        'bootstrap'         : '../bower_components/bootstrap/dist/js/bootstrap.min',
        'cookies'           : '../bower_components/angular-cookies/angular-cookies.min',
        'fileupload'        : '../bower_components/blueimp-file-upload/js/jquery.fileupload',
        'load-image'        : '../bower_components/blueimp-load-image/js/load-image',
        'jQuery'            : '../bower_components/jquery/dist/jquery.min',
        'jquery.ui.widget'  : '../bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget',
        'resource'          : '../bower_components/angular-resource/angular-resource.min',
        'router'            : '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'socketio'          : 'lib/socket.io'
    },

    shim    : {
        'angular'           : {
            exports : 'angular'
        },
        'bootstrap'         : [
            'jQuery'
        ],
        'config'            : [
            'angular'
        ],
        'cookies'           : [
            'angular'
        ],
        'fileupload'        : [
            'angular',
            'jQuery',
            'jquery.ui.widget',
            '../bower_components/blueimp-file-upload/js/jquery.iframe-transport'
        ],
        'resource'          : [
            'angular'
        ],
        'router'            : [
            'angular'
        ]
    }
});

define( function ( require ) {
    'use strict'

    var angular = require( 'angular' ),
        app     = require( 'app' ),
        $html   = angular.element( document.getElementsByTagName('html')[0] );

    angular.element().ready( function() {
        angular.bootstrap( $html, [app['name']] );
    });
});