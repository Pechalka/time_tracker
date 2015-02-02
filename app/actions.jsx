define(function(require) {
	
    var Reflux = require('reflux');

    var actions =  Reflux.createActions([
        'registrUser',
        'login',

        'updateStatus',
        'removeTask',
        'createTask',
        'showTasks',
        'showTask',

        'removeProject',
        'addProject',
        'showProjects',
        'selectProject',

        'addComment'
    ])  


    actions.registrUser.listen(function(data){
        location.hash = '/projects';
    })
    
    actions.login.listen(function(data){
        location.hash = '/projects';
    })
    

    return actions;
});