define( function ( require ) {
    'use strict'

    var angular     = require( 'angular' );

    require( 'config' );
    require( 'cookies' );
    require( 'bootstrap' );
    require( 'jQuery' );
    require( 'resource' );
    require( 'router' );

    var app         = angular.module( 'NetChat', [
        'config',
        'ngCookies',
        'ngResource',
        'ui.router'
    ]);

    return app;
});