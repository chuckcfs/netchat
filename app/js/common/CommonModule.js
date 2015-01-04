define( function ( require ) {
    'use strict'

    var AuthService     = require( 'common/AuthService' );
    var SignService     = require( 'common/SignService' );
    var UserAccess      = require( 'common/UserAccess' );

    var CommonModule    = angular.module( 'CommonModule', []);

    CommonModule.factory( 'SignService', [ 'config', SignService ] );

    CommonModule.factory( 'AuthService', [ 'SessionService', AuthService ] );

    CommonModule.directive( 'userAccess', [ 'AuthService', UserAccess ] );
});