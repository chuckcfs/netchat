define( function ( require ) {
    'use config'

    return function ( $rootScope, $cookies, $resource, config ) {
        var Service         = {
                _access     : null,

                _loggedIn   : false,

                _session    : null,

                _resource   : $resource( config.api_url + 'sessions/:id' ),

                isLoggedIn  : function() {
                    return this._loggedIn;
                },

                getAccess   : function() {
                    return this._access;
                },

                getSession  : function() {
                    return this._session;
                },

                login       : function ( credentials ) {
                    var self    = this;

                    this._resource.save( credentials,
                        function ( data ) {
                            while( !data.$resolved );

                            var session = {
                                session : data.session,
                                access  : data.type
                            };
                            
                            $cookies.session        = self._session = data.session;
                            $cookies.access         = self._access = data.type;
                            self._loggedIn          = true;
                            $rootScope.$broadcast( 'LOGIN_SUCCESS', session );
                        },
                        function ( err ) {
                            $rootScope.$broadcast( 'LOGIN_ERROR' );
                        }
                    );
                },

                setSession  : function ( sess ) {
                    this._session   = $cookies.session;
                    this._access    = $cookies.access;
                    this._loggedIn  = true;
                },

                terminate   : function() {
                    var self    = this;

                    this._resource.remove( {
                        id  : this._session
                    }, null, function() {
                        self._session       = undefined;
                        self._access        = undefined;
                        self._loggedIn      = false;

                        delete $cookies.session;
                        delete $cookies.access;

                        $rootScope.$broadcast( 'LOGOUT_SUCCESS' );
                    });
                }
            };

        return Service;
    };
});