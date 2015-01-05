define( function ( require ) {
    'use strict'

    var angular     = require( 'angular' );

    require( 'config' );
    require( 'cookies' );
    require( 'bootstrap' );
    require( 'jQuery' );
    require( 'resource' );
    require( 'router' );
    require( 'chat/ChatModule' );
    require( 'common/CommonModule' );
    require( 'session/SessionModule' );
    require( 'user/UserModule' );

    var app         = angular.module( 'NetChat', [
        'config',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ChatModule',
        'CommonModule',
        'SessionModule',
        'UserModule'
    ]);

    app.run( [ '$rootScope', '$state', '$location', '$cookies', 'AuthService', 'SessionService', function ( $rootScope, $state, $location, $cookies, Auth, Session ) {
        $rootScope.$state   = $state;

        // Check the user session
        if ( Session.isLoggedIn() ) {
            if ( $location.path() == '/login' || $location.path() == '' ) {
                $location.path( '/' );
            }
        } else {
            // Check if there's a cookie
            if ( $cookies.session !== null && $cookies.session !== undefined && $cookies.session !== '' ) {
                Session.setSession();

                if ( $location.path() == '/login' || $location.path() == '' ) {
                    $location.path( '/' );
                }
            } else {
                $location.path( '/login' );
            }
        }

        $rootScope.$on( '$stateChangeStart', function ( event, next ) {
            var authorized  = false,
                access      = next.access;
            if ( access !== undefined && access !== null ) {
                authorized  = Auth.authorize( access.loginRequired, access.requiredPermissions );
                
                if ( !authorized ) {
                    $location.path( '/login' );
                }
            }
        });
    }]);

    app.config([ '$httpProvider', function ( $httpProvider ) {
        $httpProvider.interceptors.push( [ '$q', '$rootScope', '$cookies', 'SignService', function ( $q, $rootScope, $cookies, SignService ) {
            return {
                request     : function( config ) {
                    var external    = ( config.url.indexOf( 'http' ) != -1 ) ? true : false;

                    if ( external ) {
                        var holder  = '';

                        if ( config.method == "DELETE" || config.method == "GET" ) {
                            holder  = 'params';
                        } else {
                            holder  = 'data';
                        }
                        // Append the application signature to the api request
                        if ( config[holder] === undefined || config[holder] === null ) {
                            config[holder]   = {};
                        }

                        var auth    = SignService.sign();
                        config[holder].consumer  = auth.consumer;
                        config[holder].timestamp = auth.timestamp;
                        config[holder].signature = auth.signature;

                        if ( $cookies.session !== undefined && $cookies.session !== '' ) {
                            config[holder].session   = $cookies.session;
                        }
                    }

                    return config;
                },
                response    : function( response ) {
                    var external    = ( response.config.url.indexOf( 'http' ) != -1 ) ? true : false;

                    if ( external ) {
                        if ( response.status == 401 ) {
                            delete $cookies.session;
                            delete $cookies.access;

                            $rootScope.$broadcast( 'LOGOUT_SUCCESS' );
                        }
                    }

                    return response;
                }
            };
        }]);
    }]);

    return app;
});