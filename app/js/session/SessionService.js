define( function ( require ) {
    'use config'

    return function ( $rootScope, $cookies, $resource, config ) {
        var Service         = {
                _access     : null,

                _loggedIn   : false,

                _session    : null,

                _userId     : null,

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

                getUserId   : function () {
                    return this._userId;
                },

                login       : function ( credentials ) {
                    var self    = this;

                    this._resource.save( credentials,
                        function ( data ) {
                            while( !data.$resolved );

                            var session = {
                                session : data.session,
                                access  : data.type,
                                user_id : data.user_id
                            };
                            
                            $cookies.session        = self._session = data.session;
                            $cookies.access         = self._access = data.type;
                            $cookies.user_id        = self._userId = data.user_id;
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
                    this._userId    = $cookies.user_id;
                    this._loggedIn  = true;
                },

                terminate   : function() {
                    var self    = this;

                    this._resource.remove( {
                        id  : this._session
                    }, null, function() {
                        self._session       = undefined;
                        self._access        = undefined;
                        self._userId        = undefined;
                        self._loggedIn      = false;

                        delete $cookies.session;
                        delete $cookies.access;
                        delete $cookies.user_id;

                        $rootScope.$broadcast( 'LOGOUT_SUCCESS' );
                    });
                }
            };

        return Service;
    };
});