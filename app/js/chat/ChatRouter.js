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
                    'contentBody'       : {
                        template        : '',
                        controller      : 'ChatBaseCtrl'
                    }
                }
            });
    };
});