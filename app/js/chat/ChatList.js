define( function ( require ) {
    'use strict'

    return function ( $scope, Chat, Session, User ) {
        $scope.user_id  = Session.getUserId();
        $scope.search   = function () {
            User.query({
                filters : {
                    name    : $scope.keyword
                },
                limit   : 20,
                select  : 'name'
            });
        };
        $scope.hide     = function () {
            $scope.keyword  = '';
            $scope.users    = Array();
            $( '#retrieved-users' ).slideUp();
        };

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
        $scope.$on( 'USERS_RETRIEVED', function ( e, data ) {
            $( '#retrieved-users' ).slideDown();
            $scope.users    = data;
        });
    };
});