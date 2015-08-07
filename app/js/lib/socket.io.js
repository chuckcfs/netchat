define( function ( require ) {

    var io          = require( 'https://cdn.socket.io/socket.io-1.2.1.js' );

    var SocketIO    = angular.module( 'socket.io', []);

    SocketIO.provider( 'socket', function SocketProvider () {
        var config  = {},
            ioUrl   = '';

        this.setUrl = function ( url ) {
            if ( typeof url == 'string' ) {
                ioUrl   = url;
            } else {
                throw new TypeError( 'Socket URL must be a string' );
            }
        };

        this.$get   = [ '$rootScope', function SocketFactory ( $rootScope ) {
            var connected   = false,
                socket      = null;

            return {
                isConnected : function () {
                    return connected;
                },

                connect     : function ( url ) {
                    if ( url == null ) {
                        url = ioUrl;
                    }

                    socket  = io( url, config );

                    socket.on( 'connect', function () {
                        connected   = true;
                    });
                },

                disconnect  : function () {
                    socket.disconnect();

                    socket.on( 'disconnect', function () {
                        connected   = false;
                    });
                },

                emit        : function ( e, data, cb ) {
                    if ( typeof cb == 'function' ) {
                        socket.emit( e, data, function () {
                            var args    = arguments;

                            $rootScope.$apply( function () {
                                cb.apply( socket, args );
                            });
                        });
                    } else {
                        socket.emit( e, data );
                    }
                },

                off         : function ( e, cb ) {
                    if ( typeof cb == 'function' ) {
                        socket.removeListener( e, cb );
                    } else {
                        socket.removeAllListeners( e );
                    }
                },

                on          : function ( e, cb ) {
                    socket.on( e, function () {
                        var args    = arguments;

                        $rootScope.$apply( function () {
                            cb.apply( socket, args );
                        });
                    });
                }
            };
        }];
    });
});