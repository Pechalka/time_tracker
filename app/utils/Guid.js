define(function (require) {
    'use strict';
    var _ = require('lodash');

    // 64 bit random value
    var chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    function generateGuid() {
        /*jslint bitwise:true*/
        return _.reduce(_.times(11, function () {
            return Math.random() * chars.length | 1;
        }), function (result, i) {
            return result + chars.charAt(i);
        }, '');
    }

    return generateGuid;
});
