define( function ( require ) {
    'use strict'

    var RegisterController  = require( 'user/RegisterController' );
    var RemoveController    = require( 'user/RemoveController' );
    var UserRouter          = require( 'user/UserRouter' );
    var UserService         = require( 'user/UserService' );

    var UserModule          = angular.module( 'UserModule', []);

    UserModule.factory( 'UserService', [ 'BaseService', UserService ] );

    UserModule.controller( 'UserRegisterCtrl', [ '$scope', '$location', 'UserService', RegisterController ] );

    UserModule.controller( 'UserRemoveCtrl', [ '$scope', '$location', '$stateParams', 'socket', 'UserService', 'SessionService', RemoveController ] );

    UserModule.config( [ '$stateProvider', UserRouter ] );
});