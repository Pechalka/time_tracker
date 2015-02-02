define(function (require) {
    'use strict';
    var Reflux = require('reflux');
    var update = require('react').addons.update;
    
    var actions = require('actions');

    var LocasStorage = require('utils/LocalStorageApi');

    var collection = []

    var api = new LocasStorage("/tasks", "id", true);

   // return function(){
        return Reflux.createStore({
            listenables : [actions],
            getInitialState: function() {
                return collection;
            },
            onShowTasks : function(q){
                api = new LocasStorage("projects/" + q.projectName + "/tasks", "id", true);
                api.get().then((data) => {
                    collection = data;
                    this.trigger(collection)
                })
            },
            onCreateTask : function(data){
                api.post(data).then(() => {
                    return update(collection, {
                        $push : [data]
                    })
                }).then((data) => {
                    collection = data;
                    this.trigger(collection)
                });
            },
            onRemoveTask : function(data){
                api.del(data.id).then(() => {
                    var index = _.findIndex(collection, { id : data.id });
                    return update(collection, {
                        $splice: [[index, 1]]
                    })
                }).then((data) => {
                    collection = data;
                    this.trigger(collection)
                })
            }
        });
    //}
});
