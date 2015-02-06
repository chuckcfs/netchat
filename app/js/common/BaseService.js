define( function ( require ) {
    'use strict'

    return function ( $rootScope, $resource, config ) {
        function BaseService( model, resource ) {
            this._model     = '';
            this._total     = 0;
            this._resource  = null;

            return this._init( model, resource );
        };

        BaseService.prototype   = {
            _init       : function ( model, resource ) {
                var that        = this;
                this._model     = model;

                this._resource  = $resource( config.api_url + resource + '/:id/:action', null, {
                    query   : {
                        method              : 'GET',
                        isArray             : true,
                        transformResponse   : function ( data, headers ) {
                            var response    = angular.fromJson( data );

                            that._total     = response.total;

                            return response.data;
                        }
                    }
                });

                return this;
            },

            create      : function ( object ) {
                var that    = this;
                return this._resource.save( object, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( that._model + '_CREATED', data );
                });
            },

            get         : function ( id ) {
                var that    = this;
                return this._resource.get({
                    id  : id
                }, function ( data ) {
                    while( !data.$resolved );

                    $rootScope.$broadcast( that._model + '_RETRIEVED', data );
                });
            },

            getTotal    : function () {
                return this._total;
            },

            query       : function ( search ) {
                var that    = this;
                return this._resource.query({
                    filters : search.filters,
                    limit   : ( search.limit ) ? search.limit : 10,
                    order   : ( search.order ) ? search.order : 'ASC',
                    page    : ( search.page ) ? search.page : 1,
                    select  : search.select,
                    sort    : ( search.sort ) ? search.sort : 'creation_date'
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( that._model + 'S_RETRIEVED', data );
                });
            },

            remove      : function ( id ) {
                var that    = this;
                return this._resource.remove({
                    id  : id
                }, function ( data ) {
                    while ( !data.$resolved );

                    $rootScope.$broadcast( that._model + '_REMOVED', data );
                });
            }
        };

        return BaseService;
    };
});