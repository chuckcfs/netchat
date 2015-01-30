define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        var User    = {

            _total      : 0,

            _resource   : $resource( config.api_url + 'users/:id/:action', null, {
                query   : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data, headers ) {
                        var response    = angular.fromJson( data );

                        User._total     = response.total;

                        return response.data;
                    }
                }
            }),

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
            },

            query       : function ( search ) {
                return this._resource.query({
                    filters : search.filters,
                    limit   : ( search.limit ) ? search.limit : 10,
                    order   : ( search.order ) ? search.order : 'creation_date',
                    page    : ( search.page ) ? search.page : 1,
                    select  : search.select,
                    sort    : ( search.sort ) ? search.sort : 'ASC'
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'USERS_RETRIEVED', data );
                });
            },

            remove      : function ( id ) {
                return this._resource.remove({
                    id  : id
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'USER_REMOVED', data );
                });
            }
        };

        return User;
    };
});