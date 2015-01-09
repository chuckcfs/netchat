define( function ( require ) {
    'use strict'

    return function ( $scope, $stateParams, Chat, Message, Session ) {
        var list        = $( '#messages-list' ),
            query       = {
                filters : {
                    chat_id : $stateParams.id
                },
                limit   : 10,
                order   : 'DESC',
                page    : 1
            };

        list.scroll( function () {
            if ( list.scrollTop() == 0 ) {
                if ( Message.getTotal() > $scope.messages.length ) {
                    query.page++;
                    Message.query( query );
                }
            }
        });

        $scope.user_id  = Session.getUserId();
        $scope.messages = Array();

        Chat.get( $stateParams.id );
        Message.query( query );

        $scope.send     = function () {
            var from    = {
                    _id     : $scope.user_id,
                    name    : $scope.user
                },
                to      = ( $scope.chat.from._id == $scope.user_id ) ? {
                    _id     : $scope.chat.to._id,
                    name    : $scope.chat.to.name
                } : {
                    _id     : $scope.chat.from._id,
                    name    : $scope.chat.from.name
                };

            Message.create({
                chat    : $stateParams.id,
                content : $scope.newMessage,
                from    : from,
                to      : to
            });
        };

        $scope.$on( 'CHAT_RETRIEVED', function ( e, data ) {
            $scope.chat = data;
        });
        $scope.$on( 'MESSAGES_RETRIEVED', function ( e, data ) {
            for ( var i = 0; i < data.length; i++ ) {
                $scope.messages.unshift( data[i] );
            }
        });
        $scope.$on( 'MESSAGE_CREATED', function ( e, data ) {
            $scope.newMessage   = '';
            $scope.messages.push( data );
        });

        $scope.$on( 'message:received', function ( e, message ) {
            if ( message.chat_id == $stateParams.id ) {
                $scope.messages.push( message );
            }
        });
        $scope.$on( 'render:finished', function () {
            list.scrollTop( list[0].scrollHeight );
        });
    };
});