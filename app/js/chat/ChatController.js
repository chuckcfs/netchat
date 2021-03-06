define( function ( require ) {
    'use strict'

    return function ( $rootScope, $scope, User, Session ) {
        User.get( Session.getUserId() );

        $scope.$on( 'USER_RETRIEVED', function ( e, user ) {
            $( '#user-menu' ).removeClass( 'hidden' );
            $rootScope.user     = user.name;
            $rootScope.user_id  = user._id;
        });
    };
});