define( function ( require ) {
    'use strict'

    return function ( AuthService ) {
        return {
            link    : function ( scope, elm, attrs ) {
                var makeVisible = function() {
                        elm.removeClass( 'hidden' );
                    },
                    makeHidden  = function() {
                        elm.addClass( 'hidden' );
                    },
                    determine   = function( reset ) {
                        var result;
                        if ( reset ) {
                            makeVisible();
                        }

                        result  = AuthService.authorize( true, roles );
                        if ( result ) {
                            makeVisible();
                        } else {
                            makeHidden();
                        }
                    },
                    roles       = attrs.userAccess.split( ',' );

                if ( roles.length > 0 ) {
                    determine( true );
                }
            }
        };
    };
});