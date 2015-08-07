'use strict'

describe( 'NetChat', function () {
    browser.get( '/' );

    it ( 'should automatically redirect to /login when the user is not logged in!', function () {
        expect( browser.getLocationAbsUrl() ).toMatch( '/login' );
    });
});