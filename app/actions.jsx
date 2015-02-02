define(function(require) {
	
    var Reflux = require('reflux');

    var actions =  Reflux.createActions([
        'registrUser',
        'login',

        'updateStatus',
        'removeTask',
        'createTask',
        'showTasks',

        'removeProject',
        'addProject',
        'showProjects'
    ])  

    var log = function(key){
    	return function(data){
    		console.log(key, " " , data);
    	}
    }

    actions.registrUser.listen(function(data){
        log("registrUser ", data);
        location.hash = '/projects';
    })
    
    actions.login.listen(function(data){
        log("login ", data);
        location.hash = '/projects';
    })
    

    actions.updateStatus.listen(function(task, newStatus){
        console.log("updateStatus ", task ," " , newStatus);
    })

    actions.removeTask.listen(log("removeTask"))

    actions.createTask.listen(function(data){
        console.log("createTask ", data );
        location.hash = '/projects/test';
    })

    actions.removeProject.listen(function(data){
        console.log("removeProject ", data );
    })

    actions.addProject.listen(function(data){
        console.log("addProject ", data );
    })


    var LocalStore = function(url){
        var self = this;
        
        self.collection = [];

        

        self.create = function(data){

        }

        self.fetchAll = function(){

        }

        self.fetchOne = function(id){

        }

        self.removeById = function(id){

        }

        self.updateById = function(id, data){

        }


    }


    return actions;
});