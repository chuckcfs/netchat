define( function ( require ) {
    'use strict'

    return function ( $compile, $http, $templateCache ) {
        return {
            restrict    : 'EA',
            scope       : {
                config  : '='
            },
            templateUrl : 'partials/common/fileuploader.html',
            link        : function ( scope, el, attrs ) {
                var Sign            = scope.config.requestSign,
                    session         = scope.config.session,
                    add             = function ( e, data ) {
                        var file    = data.files[0];

                        loadImage( file, function ( img ) {
                            $( '#file-uploader' ).fadeIn();
                            $( '#image-upload' ).append( img );
                        }, {
                            maxWidth    : 100,
                            maxHeight   : 100
                        });

                        var signature       = Sign();
                        signature.session   = session;
                        data.formData       = signature;
                        data.close          = scope.close;
                        data.submit();
                    },
                    done            = function ( e, data ) {
                        var bar     = $( data.form.find( '.progress-bar' )[0] );

                        bar.css( 'width', 0 );

                        $( '#file-uploader' ).fadeOut();
                        $( '#image-upload' ).html( '' );
                    },
                    progress        = function ( e, data ) {
                        var progress    = parseInt( data.loaded / data.total * 100, 10 ),
                            bar         = $( data.form.find( '.progress-bar' )[0] );

                        bar.css( 'width', progress + '%' );
                        bar.attr( 'aria-valuenow', progress );
                    },
                    config          = function ( scope, attrs ) {
                        var config  = {};

                        var attribute               = setAttribute( 'dataType' );
                        config.dataType             = ( attribute ) ? attribute : 'json';
                        config.url                  = setAttribute( 'url' );
                        config.sequentialUploads    = setAttribute( 'sequentialUploads' );

                        // File uploader callbacks
                        attribute                   = setAttribute( 'add' );
                        config.add                  = ( attribute ) ? attribute : add;
                        attribute                   = setAttribute( 'done' );
                        config.done                 = ( attribute ) ? attribute : done;
                        attribute                   = setAttribute( 'progress' );
                        config.progress             = ( attribute ) ? attribute : progress;

                        return config;
                    },
                    setAttribute    = function ( attr ) {
                        return ( attrs[ attr ] ) ? attrs[ attr ] : ( ( scope.config[ attr ] ) ? scope.config[ attr ] : false );
                    };

                scope.field         = setAttribute( 'displayField' );
                scope.file_name     = setAttribute( 'fileName' );

                var configParams    = config( scope, attrs ),
                    uploadForm      = $( el );

                uploadForm.fileupload( configParams );

                scope.attach        = function () {
                    $( '.input-fileupload' ).click();
                };
                scope.close         = function () {
                    var bar     = $( '.progress-bar' );

                    bar.css( 'width', 0 );

                    $( '#file-uploader' ).fadeOut();
                    $( '#image-upload' ).html( '' );
                };
            }
        };
    };
});