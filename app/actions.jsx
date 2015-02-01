define(function(require) {
	
    var Reflux = require('reflux');

    var actions =  Reflux.createActions([
        'registrUser',
        'login',

        'updateStatus',
        'removeTask',
        'createTask',

        'removeProject',
        'addProject'
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
        console.log("removeProject ", data );
    })


    return actions;
});