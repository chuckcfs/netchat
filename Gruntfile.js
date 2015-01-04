module.exports = function( grunt ) {
    grunt.initConfig({
        less        : {
            development : {
                options : {
                    compress        : true,
                    yuicompress     : true,
                    optimization    : 2
                },
                files   : {
                    "app/css/style.css" : "app/less/style.less"
                }
            }
        },
        ngconstant  : {
            options     : {
                space   : ' ',
                wrap    : '"use strict";\n\n {%= __ngModule %}',
                name    : 'config'
            },
            development : {
                options     : {
                    dest        : 'app/js/config.js'
                },
                constants   : {
                    config  : {
                        api_url     : 'http://localhost:3000/',
                        consumer    : '54a9ab83120cafcd74bb0da5',
                        secret      : 'J5e2fprVoXJpN1ycPiDP5Xz3howQKZer',
                        static_url  : 'http://localhost:3000/'
                    }
                }
            },
            server      : {
                options     : {
                    dest        : 'app/js/config.js'
                },
                constants   : {
                    config  : {
                        api_url     : 'http://api-netchat.bitslice.net/',
                        consumer    : '54a9ab83120cafcd74bb0da5',
                        secret      : 'J5e2fprVoXJpN1ycPiDP5Xz3howQKZer',
                        static_url  : 'http://api-netchat.bitslice.net/'
                    }
                }
            }
        },
        watch       : {
            styles      : {
                files   : ['app/less/**/*.less'], // which files to watch
                tasks   : ['less'],
                options : {
                    nospawn : true
                }
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-ng-constant' );

    grunt.registerTask( 'default', [ 'watch' ] );
    grunt.registerTask( 'development', [ 'ngconstant:development' ] );
    grunt.registerTask( 'server', [ 'ngconstant:server' ] );
};