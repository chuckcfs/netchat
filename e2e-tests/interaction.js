'use strict'

describe( 'NetChat Interactions', function () {
    var user        = {
            name    : 'End2End Testing',
            email   : 'e2etest@netchat.com',
            pass    : 'e2etesting'
        },
        receiver    = {
            name    : 'End2End Receiver',
            email   : 'e2ereceiver@netchat.com',
            pass    : 'e2etesting'
        },
        path        = require( 'path' );

    browser.get( '/' );

    it ( 'should create an user for testing purposes', function () {
        element( by.css( '.help' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
            expect( browser.getLocationAbsUrl() ).toBe( '/register' );

            element( by.model( 'user.name' ) ).sendKeys( user.name );
            element( by.model( 'user.email' ) ).sendKeys( user.email );
            element( by.model( 'user.pass' ) ).sendKeys( user.pass );
            element( by.css( '.btn-primary' ) ).click().then( function () {
                expect( browser.getLocationAbsUrl() ).toMatch( '/login' );
            });
        });
    });

    it ( 'should create an user to send a message to', function () {
        element( by.css( '.help' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
            expect( browser.getLocationAbsUrl() ).toBe( '/register' );

            element( by.model( 'user.name' ) ).sendKeys( receiver.name );
            element( by.model( 'user.email' ) ).sendKeys( receiver.email );
            element( by.model( 'user.pass' ) ).sendKeys( receiver.pass );
            element( by.css( '.btn-primary' ) ).click().then( function () {
                expect( browser.getLocationAbsUrl() ).toMatch( '/login' );
            });
        });
    });

    it ( 'should login into the system with the created user', function () {
        element( by.model( 'email' ) ).sendKeys( user.email );
        element( by.model( 'pass' ) ).sendKeys( user.pass );
        element( by.css( '.btn-primary' ) ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/' );
        });
    });

    it ( 'should search for the receiver user and start a new chat with her', function () {
        element( by.model( 'keyword' ) ).sendKeys( receiver.name );
        element( by.id( 'retrieved-users' ) ).all( by.tagName( 'ul' ) ).first().all( by.tagName( 'li' ) ).first().click().then( function () {
            element( by.model( 'newMessage' ) ).sendKeys( 'End 2 end testing message' );
            element( by.css( '.message-editor' ) ).all( by.css( '.btn' ) ).first().click().then( function () {
                expect( element( by.id( 'messages-list' ) ).all( by.css( '.message' ) ).count() ).toBe( 1 );
            });
        });
    });

    it ( 'should send a message with an attachment', function () {
        var file    = path.resolve( __dirname, './files/test.jpg' );

        element( by.css( '.input-fileupload' ) ).sendKeys( file ).then( function () {
            browser.sleep( 2000 );
            element( by.model( 'newMessage' ) ).sendKeys( 'Test message with attachemnt' );
            element( by.css( '.message-editor' ) ).all( by.css( '.btn' ) ).first().click().then( function () {
                expect( element( by.id( 'messages-list' ) ).all( by.css( '.message' ) ).count() ).toBe( 2 );
            });
        });
    });

    it ( 'should remove the created user and terminate the user session', function () {
        element( by.css( '.dropdown-toggle' ) ).click().then( function () {
            element( by.css( '.dropdown-menu' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
                expect( browser.getLocationAbsUrl() ).toMatch( '/' );
            });
        });
    });

    it ( 'should login into the system with the receiver user', function () {
        element( by.model( 'email' ) ).sendKeys( receiver.email );
        element( by.model( 'pass' ) ).sendKeys( receiver.pass );
        element( by.css( '.btn-primary' ) ).click().then( function () {
            expect( browser.getLocationAbsUrl() ).toMatch( '/' );
        });
    });

    it ( 'should remove the created user and terminate the user session', function () {
        element( by.css( '.dropdown-toggle' ) ).click().then( function () {
            element( by.css( '.dropdown-menu' ) ).all( by.tagName( 'a' ) ).first().click().then( function () {
                expect( browser.getLocationAbsUrl() ).toMatch( '/' );
            });
        });
    });
});