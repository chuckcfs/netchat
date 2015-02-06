define( function ( require ) {
    'use strict'

    return function ( BaseService ) {
        var MessageService  = new BaseService( 'MESSAGE', 'messages' );

        return MessageService;
    }
});