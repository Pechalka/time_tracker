define(function (require) {
    'use strict';
    var Reflux = require('reflux');
    var update = require('react').addons.update;
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    var actions = require('actions');

    var LocasStorage = require('utils/LocalStorageApi');

    var value = {
    	title : 'title',
    	description : lorem,
    	id : null
    }

    
	var api;

   // return function(){
        return Reflux.createStore({
            listenables : [actions],
            getInitialState: function() {
                return value;
            },
            onShowTask : function(q){
            	api = new LocasStorage("projects/" + q.projectName + "/tasks", "id", true);
            	api.get(q.taskId).then((data) => {
            		value = data;
            		this.trigger(value);
            	})
            }
        });
    //}
});
