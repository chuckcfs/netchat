define( function ( require ) {
    'use strict'

    var angular         = require( 'angular' );
    var ChatController  = require( 'chat/ChatController' );
    var ChatDetails     = require( 'chat/ChatDetails' );
    var ChatList        = require( 'chat/ChatList' );
    var ChatRouter      = require( 'chat/ChatRouter' );
    var ChatService     = require( 'chat/ChatService' );

    var ChatModule      = angular.module( 'ChatModule', []);

    ChatModule.factory( 'ChatService', [ '$rootScope', '$resource', 'config', ChatService ] );

    ChatModule.controller( 'ChatBaseCtrl', [ '$rootScope', '$scope', 'UserService', 'SessionService', ChatController ]);

    ChatModule.controller( 'ChatDetailsCtrl', [ '$scope', '$stateParams', 'config', 'ChatService', 'MessageService', 'SessionService', 'SignService', ChatDetails ] );

    ChatModule.controller( 'ChatListCtrl', [ '$scope', '$state', 'ChatService', 'SessionService', 'UserService', ChatList ] );

    ChatModule.config([ '$stateProvider', ChatRouter ]);
});