define( function ( require ) {
    'use strict'

    var angular     = require( 'angular' );

    require( 'config' );
    require( 'cookies' );
    require( 'bootstrap' );
    require( 'jQuery' );
    require( 'resource' );
    require( 'router' );
    require( 'socketio' );
    require( 'chat/ChatModule' );
    require( 'common/CommonModule' );
    require( 'message/MessageModule' );
    require( 'session/SessionModule' );
    require( 'user/UserModule' );

    var app         = angular.module( 'NetChat', [
        'config',
        'ngCookies',
        'ngResource',
        'ui.router',
        'socket.io',
        'ChatModule',
        'CommonModule',
        'MessageModule',
        'SessionModule',
        'UserModule'
    ]);

    app.run( [ '$rootScope', '$state', '$location', '$cookies', 'socket', 'config', 'SessionService', function ( $rootScope, $state, $location, $cookies, socket, config, Session ) {
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

        // Set the connection to the backend socket to receive nofications of new messages
        if ( Session.isLoggedIn() && !socket.isConnected() ) {
            socket.connect( config.api_url );

            socket.on( 'connect', function () {
                socket.emit( 'join', {
                    user    : Session.getUserId()
                });
            });

            socket.on( 'message:new', function ( message ) {
                $rootScope.$broadcast( 'message:received', message );
            });
        }
    }]);

    app.config([ '$httpProvider', 'socketProvider', 'config', function ( $httpProvider, socketProvider, config ) {
        $httpProvider.interceptors.push( [ '$rootScope', '$cookies', 'SignService', function ( $rootScope, $cookies, SignService ) {
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

        socketProvider.setUrl( config.api_url );
    }]);

    return app;
});