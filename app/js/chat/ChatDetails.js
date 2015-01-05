define( function ( require ) {
    'use strict'

    return function ( $scope, $stateParams, Chat, Session ) {
        $scope.user_id  = Session.getUserId();

        Chat.get( $stateParams.id );

        $scope.$on( 'CHAT_RETRIEVED', function ( e, data ) {
            $scope.chat = data;
        });
    };
});