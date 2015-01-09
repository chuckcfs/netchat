define( function ( require ) {
    'use strict'

    return function ( $scope, $location, socket, Session ) {
        $( '#app-sidebar' ).addClass( 'hidden' ).removeClass( 'col-md-3' );
        $( '#main-container' ).removeClass( 'col-md-9' );
        $( '#user-menu' ).addClass( 'hidden' );

        $scope.submit       = function() {
            Session.login({
                email       : $scope.email,
                pass        : $scope.pass
            });
        };

        $scope.$on( 'LOGIN_SUCCESS', function () {
            $( '#app-sidebar' ).removeClass( 'hidden' ).addClass( 'col-md-3' );
            $( '#main-container' ).addClass( 'col-md-9' );

            if ( !socket.isConnected() ) {
                socket.connect();

                socket.on( 'connect', function () {
                    socket.emit( 'join', {
                        user    : Session.getUserId()
                    });
                });

                socket.on( 'message:new', function ( message ) {
                    $rootScope.$broadcast( 'message:received', message );
                });
            }

            $location.path( '/' );
        });
    };
});