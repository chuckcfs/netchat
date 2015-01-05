define( function () {
    'use strict'

    return function ( $stateProvider ) {
        $stateProvider
            .state( 'login', {
                url     : '/login',
                views   : {
                    'contentBody'       : {
                        templateUrl     : 'partials/login.html',
                        controller      : 'SessionStartCtrl'
                    }
                }
            })
            .state( 'logout', {
                access  : {
                    loginRequired       : true
                },
                url     : '/logout',
                views   : {
                    'contentBody'       : {
                        template        : '',
                        controller      : 'SessionEndCtrl'
                    }
                }
            });
    };
});
