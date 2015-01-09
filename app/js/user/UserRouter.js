define( function ( require ) {
    'use strict'

    return function ( $stateProvider ) {
        $stateProvider
            .state( 'register', {
                url     : 'register',
                views   : {
                    'contentBody'       : {
                        templateUrl     : 'partials/user/register',
                        controller      : 'UserRegisterCtrl'
                    }
                }
            });
    }
});