define( function ( require ) {
    'use strict'

    return function ( $stateProvider ) {
        $stateProvider
            .state( 'chat', {
                access  : {
                    loginRequired       : true,
                    requiredPermissions : [ 'Super', 'Admin', 'Registered' ]
                },
                url     : '/',
                views   : {
                    'chatsList'         : {
                        templateUrl     : 'partials/chat/list.html',
                        controller      : 'ChatListCtrl'
                    },
                    'contentHeader'     : {
                        controller      : 'ChatBaseCtrl'
                    }
                }
            })
            .state( 'chat.details', {
                access  : {
                    loginRequired       : true,
                    requiredPermissions : [ 'Super', 'Admin', 'Registered' ]
                },
                parent  : 'chat',
                url     : 'chat/:id',
                views   : {
                    'contentBody@'      : {
                        templateUrl     : 'partials/chat/details.html',
                        controller      : 'ChatDetailsCtrl'
                    }
                }
            });
    };
});