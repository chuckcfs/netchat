define( function ( require ) {
    'use strict'

    return function ( $scope, Chat, Session ) {
        $scope.user_id  = Session.getUserId();

        Chat.query({
            filters : {
                '$or'   : [
                    {
                        'from._id'  : $scope.user_id
                    },
                    {
                        'to._id'    : $scope.user_id
                    }
                ]
            },
            limit   : 9999,
            select  : 'from to last_message'
        });

        $scope.$on( 'CHATS_RETRIEVED', function ( e, data ) {
            $scope.chats    = data;
        });
    };
});