define( function ( require ) {
    'use strict'

    return function ( $scope, $location, socket, Session ) {
        Session.terminate();
        $scope.$on( 'LOGOUT_SUCCESS', function() {
            if ( socket.isConnected() ) {
                socket.disconnect();
            }

            $location.path( '/login' );
        });
    };
});