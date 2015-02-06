define( function ( require ) {
    'use strict'

    return function ( BaseService ) {
        var ChatService     = new BaseService( 'CHAT', 'chats' );

        return ChatService;
    };
});