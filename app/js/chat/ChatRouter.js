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
                    'contentBody'       : {
                        template        : '',
                        controller      : 'ChatBaseCtrl'
                    }
                }
            });
    };
});