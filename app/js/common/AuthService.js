define( function ( require ) {
    'use strict'

    return function ( Session ) {
        var Auth    = {
            authorize   : function( loginRequired, requiredPermissions ) {
                var session = Session.getSession(),
                    access  = Session.getAccess();

                if( session !== undefined && access !== undefined ) {
                    // The user is logged in, check if the user type has enough permissions
                    if ( requiredPermissions ) {
                        switch ( access ) {
                            case 0 :
                            case '0' :
                                if ( requiredPermissions.indexOf( 'Super' ) != -1 ) {
                                    return true;
                                }
                                break;
                            case 1 :
                            case '1' :
                                if ( requiredPermissions.indexOf( 'Admin' ) != -1 ) {
                                    return true;
                                }
                                break;
                            case 2 :
                            case '2' :
                                if ( requiredPermissions.indexOf( 'Developer' ) != -1 ) {
                                    return true;
                                }
                                break;
                            case 3 :
                            case '3' :
                                if ( requiredPermissions.indexOf( 'Registered' ) != -1 ) {
                                    return true;
                                }
                                break;
                            default :
                                return false;
                        }
                    }
                }

                return false;
            }
        };

        return Auth;
    };
});