define( function ( require ) {
    'use strict'

    return function ( $scope, $location, Session ) {
        $( '#app-sidebar' ).removeClass( 'col-md-3' );
        $( '#main-container' ).removeClass( 'col-md-9' );
        $( '#user-menu' ).addClass( 'hidden' );

        $scope.submit       = function() {
            Session.login({
                email       : $scope.email,
                pass        : $scope.pass
            });
        };

        $scope.$on( 'LOGIN_SUCCESS', function () {
            $( '#app-sidebar' ).addClass( 'col-md-3' );
            $( '#main-container' ).addClass( 'col-md-9' );

            $location.path( '/' );
        });
    };
});