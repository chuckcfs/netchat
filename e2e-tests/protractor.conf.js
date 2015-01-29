exports.config  = {
    allScriptsTimeout   : 11000,
    baseUrl             : 'http://localhost:8000',
    capabilities        : {
        browserName     : 'chrome'
    },
    framework           : 'jasmine',
    jasmineNodeOpts     : {
        defaultTimeoutInterval  : 100000
    },
    specs               : [
        '*.js'
    ]
};