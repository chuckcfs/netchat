define( function ( require ) {
    'use strict'

    var ChatController  = require( 'chat/ChatController' );
    var ChatDetails     = require( 'chat/ChatDetails' );
    var ChatList        = require( 'chat/ChatList' );
    var ChatRouter      = require( 'chat/ChatRouter' );
    var ChatService     = require( 'chat/ChatService' );

    var ChatModule      = angular.module( 'ChatModule', []);

    ChatModule.factory( 'ChatService', [ '$rootScope', '$resource', 'config', ChatService ] );

    ChatModule.controller( 'ChatBaseCtrl', [ '$rootScope', '$scope', 'UserService', 'SessionService', ChatController ]);

    ChatModule.controller( 'ChatDetailsCtrl', [ '$scope', '$stateParams', 'ChatService', 'MessageService', 'SessionService', ChatDetails ] );

    ChatModule.controller( 'ChatListCtrl', [ '$scope', 'ChatService', 'SessionService', ChatList ] );

    ChatModule.config([ '$stateProvider', ChatRouter ]);
});