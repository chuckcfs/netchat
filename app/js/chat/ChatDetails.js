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

        $scope.$on( 'CHAT_RETRIEVED', function ( e, data ) {
            $scope.chat = data;
        });
        $scope.$on( 'MESSAGES_RETRIEVED', function ( e, data ) {
            $scope.messages = data;
        });
    };
});