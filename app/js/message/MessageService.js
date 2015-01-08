define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        var Message = {
            _total      : 0,

            _resource   : $resource( config.api_url + 'messages/:id', null, {
                query   : {
                    method              : 'GET',
                    isArray             : true,
                    transformResponse   : function ( data, headers ) {
                        var response    = angular.fromJson( data );

                        Message._total  = response.total;

                        return response.data;
                    }
                }
            }),

            create      : function ( message ) {
                return this._resource.save( message, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'MESSAGE_CREATED', data );
                });
            },

            query       : function ( search ) {
                return this._resource.query({
                    filters : search.filters,
                    limit   : ( search.limit ) ? search.limit : 10,
                    order   : ( search.order ) ? search.orders : 'ASC',
                    page    : ( search.page ) ? search.page : 1,
                    select  : search.select,
                    sort    : ( search.sort ) ? search.sort : 'creation_date'
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( 'MESSAGES_RETRIEVED', data );
                });
            }
        };

        return Message;
    }
});