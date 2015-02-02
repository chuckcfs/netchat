define( function ( require ) {
    'use strict'

    return function ( $scope, $state, Chat, Session, User ) {
        var searching   = false,
            user        = {};

        $scope.user_id  = Session.getUserId();
        $scope.chats    = Array();
        $scope.hide     = function () {
            $scope.keyword  = '';
            $scope.users    = Array();
            $( '#retrieved-users' ).slideUp();
        };
        $scope.select   = function ( index ) {
            searching   = true;
            user        = $scope.users[index];
            Chat.query({
                filters         : {
                    '$or'       : [
                        {
                            '$and'  : [
                                {
                                    from        : {
                                        _id     : $scope.user_id,
                                        name    : $scope.user
                                    }
                                },
                                {
                                    to          : {
                                        _id     : user._id,
                                        name    : user.name
                                    }
                                }
                            ]
                        },
                        {
                            '$and'  : [
                                {
                                    to          : {
                                        _id     : $scope.user_id,
                                        name    : $scope.user
                                    }
                                },
                                {
                                    from        : {
                                        _id     : user._id,
                                        name    : user.name
                                    }
                                }
                            ]
                        }
                    ]
                },
                select          : 'from to last_message'
            });
        };
        $scope.search   = function () {
            User.query({
                filters : {
                    name    : $scope.keyword,
                    _id     : {
                        '$ne'   : $scope.user_id
                    }
                },
                limit   : 20,
                select  : 'name'
            });
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
            select  : 'from to last_message',
            sort    : 'last_message'
        });

        $scope.$on( 'CHATS_RETRIEVED', function ( e, data ) {
            if ( !searching ) {
                for ( var i = 0; i < data.length; i++ ) {
                    $scope.chats.unshift( data[i] );
                }
            } else {
                if ( data.length == 1 ) {
                    $scope.hide();
                    searching   = false;
                    $state.go( 'chat.details', {
                        id  : data[0]._id
                    });
                } else {
                    Chat.create({
                        from        : {
                            _id     : $scope.user_id,
                            name    : $scope.user
                        },
                        to          : {
                            _id     : user._id,
                            name    : user.name
                        }
                    });
                    user        = {};
                }
            }
        });
        $scope.$on( 'CHAT_CREATED', function ( e, data ) {
            $scope.hide();
            $scope.chats.unshift( data );
            $state.go( 'chat.details', {
                id  : data._id
            });
        });
        $scope.$on( 'USERS_RETRIEVED', function ( e, data ) {
            $( '#retrieved-users' ).slideDown();
            $scope.users    = data;
        });
    };
});