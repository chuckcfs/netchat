define( function ( require ) {
    'use strict'

    return function () {
        return function ( input ) {
            var today       = new Date(),
                yesterday   = new Date(),
                date        = new Date( input );

            yesterday.setDate( yesterday.getDate() - 1 );

            if ( today.toDateString() == date.toDateString() || yesterday.toDateString() == date.toDateString() ) {
                var hours   = date.getHours(),
                    minutes = date.getMinutes(),
                    day     = '';

                if ( hours < 10 ) {
                    hours   = '0' + hours;
                }
                if ( minutes < 10 ) {
                    minutes = '0' + minutes;
                }

                if ( today.toDateString() == date.toDateString() ) {
                    day     = 'Today ';
                } else {
                    day     = 'Yesterday ';
                }

                return day + hours + ':' + minutes;
            } else {
                var month   = date.getMonth() + 1,
                    days    = date.getDate();

                if ( month < 10 ) {
                    month   = '0' + month;
                }
                if ( days < 10 ) {
                    days    = '0' + days;
                }

                return month + '/' + days + '/' + date.getFullYear();
            }
        };
    };
});