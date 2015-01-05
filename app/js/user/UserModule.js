define( function ( require ) {
    'use strict'

    var UserService     = require( 'user/UserService' );

    var UserModule      = angular.module( 'UserModule', []);

    UserModule.factory( 'UserService', [ '$rootScope', '$resource', 'config', UserService ] );
});