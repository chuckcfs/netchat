define( function ( require ) {
    'use strict'

    var SessionRouter       = require( 'session/SessionRouter' );
    var SessionService      = require( 'session/SessionService' );
    var StartController     = require( 'session/StartController' );

    var SessionModule       = angular.module( 'SessionModule', []);

    SessionModule.factory( 'SessionService', [ '$rootScope', '$cookies', '$resource', 'config', SessionService ]);

    SessionModule.controller( 'SessionStartCtrl', [ '$scope', '$location', 'SessionService', StartController ] );

    SessionModule.config([ '$stateProvider', SessionRouter ]);
});