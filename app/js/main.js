require.config({
    paths   : {
        'socketio'          : 'lib/socket.io'
    }
});

define( function ( require ) {
    'use strict'

    var app     = require( 'app' ),
        $html   = angular.element( document.getElementsByTagName('html')[0] );

    angular.element().ready( function() {
        angular.bootstrap( $html, [app['name']] );
    });
});