define( function () {
    'use strict'

    return function ( config ) {
        var ApiCall     = {

            sign        : function () {
                var timestamp   = new Date().getTime();

                return {
                    consumer    : config.consumer,
                    timestamp   : timestamp,
                    signature   : CryptoJS.SHA1( timestamp + config.secret ).toString( CryptoJS.enc.Hex )
                };
            }
        };

        return ApiCall;
    };
});