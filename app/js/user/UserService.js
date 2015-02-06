define( function ( require ) {
    'use strict'

    return function ( BaseService ) {
        var UserService     = new BaseService( 'USER', 'users' );

        UserService.create  = function ( user ) {
            user.access_level   = 3;
            BaseService.prototype.create.apply( this, [ user ] );
        };

        return UserService;
    };
});