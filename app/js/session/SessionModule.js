define( function ( require ) {
    'use strict'

    var SessionService      = require( 'session/SessionService' );

    var SessionModule       = angular.module( 'SessionModule', []);

    SessionModule.factory( 'SessionService', [ '$rootScope', '$cookies', '$resource', 'config', SessionService ]);
});