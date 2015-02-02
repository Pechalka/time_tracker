define(function (require) {
    'use strict';
    var Reflux = require('reflux');
    var update = require('react').addons.update;
    
    var actions = require('actions');

    var LocasStorage = require('utils/LocalStorageApi');

    var collection = []

    var api = new LocasStorage("/projects", "id", true);

   // return function(){
        return Reflux.createStore({
            listenables : [actions],
            getInitialState: function() {
                return collection;
            },
            onAddProject : function(data){
                return this.create(data);
            },

            create : function(data){
                return api.post(data).then(function(){
                    collection = update(collection, {
                        $push : [data]
                    })
                    this.trigger(collection)
                }.bind(this))
            },
            onRemoveProject : function(data){
                api.del(data.id).then(() => {
                    var index = _.findIndex(collection, { id : data.id });
                    return update(collection, {
                        $splice: [[index, 1]]
                    })
                }).then((data) => {
                    collection = data;
                    this.trigger(collection)
                })
            },
            onShowProjects : function(){
                api.get().then((data)=>{
                    collection = data
                    this.trigger(collection)    
                })
                
            }
        });
    //}
});
