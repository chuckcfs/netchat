define( function ( require ) {
    'use strict'

    var angular         = require( 'angular' );
    var MessageService  = require( 'message/MessageService' );

    var MessageModule   = angular.module( 'MessageModule', []);

    MessageModule.factory( 'MessageService', [ '$rootScope', '$resource', 'config', MessageService ] );
});