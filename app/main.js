(function () {

	var libs = '../bower_components/';

	requirejs.config({
        urlArgs: "bust=" + (new Date()).getTime(),
        paths: {
            'css': libs + 'require-css/css',
            'text': libs + 'requirejs-text/text',
            "JSXTransformer": libs + "jsx-requirejs-plugin/js/JSXTransformer",
            "jsx": libs + "jsx-requirejs-plugin/js/jsx",
            'react-draggable' : libs + 'react-draggable/dist/react-draggable',
            'react-bootstrap' : libs + 'react-bootstrap/react-bootstrap',
            'reflux' : libs + 'reflux/dist/reflux',
            'react-router': libs + 'react-router/dist/react-router',

            'bacon' : libs + 'bacon/dist/Bacon',
            'jquery' : libs + 'jquery/jquery'
        },
        shim: {
        	'bacon' : ['jquery'],
            'react-router': {
                exports: 'ReactRouter',
                deps: ['react']
            }
        } ,
        jsx: {
            fileExtension: '.jsx',
            harmony: true,
            stripTypes: true
        }
    });


    

    define('react', function (require) {
        var React = require('../bower_components/react/react-with-addons');
        window.React = React;

        define('React', function (require) {
            return React;
        });

        return React;
    });

    define(function (require) {
    	var React = require('react');
        
        var router = require('jsx!components/router')

        router.run();


    })
}());