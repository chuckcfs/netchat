define( function ( require ) {
    'use strict'

    var ChatController  = require( 'chat/ChatController' );
    var ChatList        = require( 'chat/ChatList' );
    var ChatRouter      = require( 'chat/ChatRouter' );

    var ChatModule      = angular.module( 'ChatModule', []);

    ChatModule.controller( 'ChatBaseCtrl', [ '$rootScope', '$scope', 'UserService', 'SessionService', ChatController ]);

    ChatModule.controller( 'ChatListCtrl', [ '$scope', ChatList ] );

    ChatModule.config([ '$stateProvider', ChatRouter ]);
});