define( function ( require ) {
    'use strict'

    return function ( $scope, $location, $stateParams, socket, User, Session ) {
        User.remove( $stateParams.id );

        $scope.$on( 'USER_REMOVED', function () {
            Session.terminate();
        });
        $scope.$on( 'LOGOUT_SUCCESS', function () {
            if ( socket.isConnected() ) {
                socket.disconnect();
            }

            $location.path( '/login' );
        });
    };
});