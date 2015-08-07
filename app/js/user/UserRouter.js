define( function ( require ) {
    'use strict'

    return function ( $stateProvider ) {
        $stateProvider
            .state( 'register', {
                url     : 'register',
                views   : {
                    'contentBody'       : {
                        templateUrl     : 'partials/user/register.html',
                        controller      : 'UserRegisterCtrl'
                    }
                }
            })
            .state( 'remove', {
                access      : {
                    loginRequired       : true
                },
                url         : '/remove/:id',
                views   : {
                    'contentBody'       : {
                        template        : '',
                        controller      : 'UserRemoveCtrl'
                    }
                }
            });
    }
});