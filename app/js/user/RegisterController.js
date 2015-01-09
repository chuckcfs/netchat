define( function ( require ) {
    'use strict'

    return function ( $scope, $location, User ) {
        $scope.register = function () {
            User.create( $scope.user );
        };

        $scope.$on( 'USER_CREATED', function ( e, data ) {
            $location.path( '/login' );
        });
    };
});