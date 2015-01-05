define( function ( require ) {
    'use strict'

    return function ( $scope, $location, Session ) {
        $( '#app-sidebar' ).removeClass( 'col-md-2' );
        $( '#main-container' ).removeClass( 'col-md-10' );

        $scope.submit       = function() {
            Session.login({
                email       : $scope.email,
                pass        : $scope.pass
            });
        };

        $scope.$on( 'LOGIN_SUCCESS', function () {
            $( '#app-sidebar' ).addClass( 'col-md-2' );
            $( '#main-container' ).addClass( 'col-md-10' );

            $location.path( '/' );
        });
    };
});