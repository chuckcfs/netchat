define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        var User    = {

            _total      : 0,

            _resource   : $resource( config.api_url + 'users/:id/:action', null ),

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