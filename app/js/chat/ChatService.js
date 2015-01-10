define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        var Chat    = {
            _total  : 0,

            _resource   : $resource( config.api_url + 'chats/:id', null, {
                query   : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data, headers ) {
                        var response    = angular.fromJson( data );

                        Chat._total     = response.total;

                        return response.data;
                    }
                }
            }),

            create      : function ( chat ) {
                return this._resource.save( chat, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'CHAT_CREATED', data );
                });
            },

            get         : function ( id ) {
                return this._resource.get({
                    id  : id
                }, function ( data ) {
                    while( !data.$resolved );

                    $rootScope.$broadcast( 'CHAT_RETRIEVED', data );
                });
            },

            query       : function ( search ) {
                return this._resource.query({
                    filters : search.filters,
                    limit   : ( search.limit ) ? search.limit : 10,
                    order   : ( search.order ) ? search.order : 'ASC',
                    page    : ( search.page ) ? search.page : 1,
                    select  : search.select,
                    sort    : ( search.sort ) ? search.sort : 'creation_date'
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'CHATS_RETRIEVED', data );
                });
            }
        };

        return Chat;
    };
});