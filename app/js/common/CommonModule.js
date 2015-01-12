define( function ( require ) {
    'use strict'

    var angular         = require( 'angular' );
    var AuthService     = require( 'common/AuthService' );
    var FileUploader    = require( 'common/FileUploader' );
    var FinishRender    = require( 'common/FinishRender' );
    var SignService     = require( 'common/SignService' );
    var UserAccess      = require( 'common/UserAccess' );

    var CommonModule    = angular.module( 'CommonModule', []);

    CommonModule.factory( 'SignService', [ 'config', SignService ] );

    CommonModule.factory( 'AuthService', [ 'SessionService', AuthService ] );

    CommonModule.directive( 'userAccess', [ 'AuthService', UserAccess ] );

    CommonModule.directive( 'finishRender', [ '$timeout', FinishRender ] );

    CommonModule.directive( 'fileUploader', [ '$compile', '$http', '$templateCache', FileUploader ] );
});