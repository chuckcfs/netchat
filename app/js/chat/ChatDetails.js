define( function ( require ) {
    'use strict'

    return function ( $scope, $stateParams, Chat, Message, Session ) {
        $scope.user_id  = Session.getUserId();

        Chat.get( $stateParams.id );
        Message.query({
            filters : {
                chat_id : $stateParams.id
            },
            limit   : 20,
            page    : 1
        });

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
            $scope.messages = data;
        });
        $scope.$on( 'MESSAGE_CREATED', function ( e, data ) {
            $scope.newMessage   = '';
            $scope.messages.push( data );
        });
    };
});