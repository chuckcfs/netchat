define( function ( require ) {
    'use strict'

    var EndController       = require( 'session/EndController' );
    var SessionRouter       = require( 'session/SessionRouter' );
    var SessionService      = require( 'session/SessionService' );
    var StartController     = require( 'session/StartController' );

    var SessionModule       = angular.module( 'SessionModule', []);

    SessionModule.factory( 'SessionService', [ '$rootScope', '$cookies', '$resource', 'config', SessionService ]);

    SessionModule.controller( 'SessionStartCtrl', [ '$rootScope', '$scope', '$location', 'socket', 'SessionService', StartController ] );

    SessionModule.controller( 'SessionEndCtrl', [ '$scope', '$location', 'socket', 'SessionService', EndController ] );

    SessionModule.config([ '$stateProvider', SessionRouter ]);
});