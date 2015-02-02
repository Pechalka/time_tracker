define(function (require) {
    'use strict';
 //   var Projects = require('jsx!stores/Projects');

    return {
    	projects : require('jsx!stores/Projects'),
    	tasks : require('jsx!stores/Tasks')
    }
})