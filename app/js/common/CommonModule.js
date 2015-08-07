define( function ( require ) {
    'use strict'

    var BaseService     = require( 'common/BaseService' );
    var FileUploader    = require( 'common/FileUploader' );
    var FinishRender    = require( 'common/FinishRender' );
    var SignService     = require( 'common/SignService' );

    var CommonModule    = angular.module( 'CommonModule', []);

    CommonModule.factory( 'SignService', [ 'config', SignService ] );

    CommonModule.factory( 'BaseService', [ '$rootScope', '$resource', 'config', BaseService ] );

    CommonModule.directive( 'finishRender', [ '$timeout', FinishRender ] );

    CommonModule.directive( 'fileUploader', [ '$compile', '$http', '$templateCache', FileUploader ] );
});