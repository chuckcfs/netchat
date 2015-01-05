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
            });
    };
});