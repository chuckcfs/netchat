define( function ( require ) {
    'use strict'

    var angular             = require( 'angular' );
    var RegisterController  = require( 'user/RegisterController' );
    var UserRouter          = require( 'user/UserRouter' );
    var UserService         = require( 'user/UserService' );

    var UserModule          = angular.module( 'UserModule', []);

    UserModule.factory( 'UserService', [ '$rootScope', '$resource', 'config', UserService ] );

    UserModule.controller( 'UserRegisterCtrl', [ '$scope', '$location', 'UserService', RegisterController ] );

    UserModule.config( [ '$stateProvider', UserRouter ] );
});