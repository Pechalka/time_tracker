define(function (require) {
    'use strict';
    var Reflux = require('reflux');
    var update = require('react').addons.update;
    
    var actions = require('actions');

    var LocasStorage = require('utils/LocalStorageApi');

    var collection = []

    var api;
   // return function(){
        return Reflux.createStore({
            listenables : [actions],
            getInitialState: function() {
                return collection;
            },
            onShowTask : function(q){
                
                api = new LocasStorage("/tasks/" + q.taskId + "/comments", "id", true);

                api.get().then((data) => {
                    collection = data;
                    this.trigger(collection)
                })
            },
            onAddComment : function(taskId, data){
                
                return api.post(data).then(function(){
                    collection = update(collection, {
                        $push : [data]
                    })
                    this.trigger(collection)
                }.bind(this))
            }
        });
    //}
});
