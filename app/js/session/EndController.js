define( function ( require ) {
    'use strict'

    return function ( $scope, $location, Session ) {
        Session.terminate();
        $scope.$on( 'LOGOUT_SUCCESS', function() {
            $location.path( '/login' );
        });
    };
});