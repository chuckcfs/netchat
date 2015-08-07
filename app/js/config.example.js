"use strict";

var module  = angular.module('config', [])

module.constant( 'config', {
    api_url     : 'YOUR_API_URL',
    consumer    : 'WEB_APPLICATION_ID',
    secret      : 'WEB_APPLICATION_DECODED_SECRET',
    static_url  : 'FILES_URL',
    s3_uploads  : true
});