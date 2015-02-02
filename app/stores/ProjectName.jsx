define(function (require) {
    'use strict';
    var Reflux = require('reflux');
    var update = require('react').addons.update;
    
    var actions = require('actions');

    var LocasStorage = require('utils/LocalStorageApi');

    var _value = '';

    var api = new LocasStorage("/projects", "id", true);

   // return function(){
        return Reflux.createStore({
            listenables : [actions],
            getInitialState: function() {
                return _value;
            },
            set : function(data){
                _value = data;
                this.trigger(_value)
            },
            onSelectProject : function(p){
                window.location.hash = '/projects/' + p.name;
                this.set(p.name)
            },
            onRemoveProject : function(){
                this.set("");
            },
            onCreateTask : function(){
                window.location.hash = '/projects/' + _value;
            }
        });
    //}
});
