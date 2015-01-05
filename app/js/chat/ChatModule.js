define( function ( require ) {
    'use strict'

    var ChatController  = require( 'chat/ChatController' );
    var ChatRouter      = require( 'chat/ChatRouter' );

    var ChatModule      = angular.module( 'ChatModule', []);

    ChatModule.controller( 'ChatBaseCtrl', [ '$rootScope', '$scope', 'UserService', 'SessionService', ChatController ]);

    ChatModule.config([ '$stateProvider', ChatRouter ]);
});