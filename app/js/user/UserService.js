define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        var User    = {

            _total      : 0,

            _resource   : $resource( config.api_url + 'users/:id/:action', null ),

            create      : function ( user ) {
                user.access_level   = 3;
                return this._resource.save( user, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'USER_CREATED', data );
                });
            },

            get         : function ( id ) {
                return this._resource.get({
                    id  : id
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'USER_RETRIEVED', data );
                });
            }
        };

        return User;
    };
});