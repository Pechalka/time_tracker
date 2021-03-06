define(function(require) {
	
    var Reflux = require('reflux');

    var actions =  Reflux.createActions([
        'registrUser',
        'login',
        'logout',

        'updateStatus',
        'removeTask',
        'createTask',
        'showTasks',
        'showTask',

        'removeProject',
        'addProject',
        'showProjects',
        'selectProject',

        'addComment',

        'applicationStart'
    ])  

     var { auth } = require('jsx!utils/auth');

    actions.registrUser.listen(function(data){
        actions.login(data)
    })
    
    actions.logout.listen(function(){
        auth.logout();
        location.hash = '/login'; 
    })

    actions.login.listen(function(data){
        auth.login(data.email, data.password, (authenticated)=>{
            if (authenticated) location.hash = '/projects';     
        })
    })
    
    // actions.applicationStart.listen(function(){
    //     alert('start');
    // })

    return actions;
});