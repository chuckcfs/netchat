define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        var Chat    = {
            _total  : 0,

            _resource   : $resource( config.api_url + 'chats', null, {
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

                    var records = new Array(),
                        ids     = new Array(),
                        user_id = search.filters.user_id;

                    $rootScope.$broadcast( 'CHATS_RETRIEVED', data );
                });
            }
        };

        return Chat;
    };
});