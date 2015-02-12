define(function(require) {    
	var React = require('react');
	var Router = require('react-router');
	var { Route, DefaultRoute, RouteHandler, Link } = Router;

	var Login = require('jsx!components/Login/login');
    var Layout = require('jsx!components/Layout/Layout')
	var ProjectList = require('jsx!components/ProjectList/ProjectList');

    var TaskList = require('jsx!components/TaskList/TaskList');
    var NewTask = require('jsx!components/NewTask/NewTask');
    var EditTask = require('jsx!components/EditTask/EditTask');
    

    var { auth } = require('jsx!utils/auth');


	var App = React.createClass({
		getInitialState: function () {
		    return {
		      loggedIn: auth.loggedIn()
		    };
		},

		setStateOnAuth: function (loggedIn) {
		    this.setState({
		      loggedIn: loggedIn
		    });
		},

		componentWillMount: function () {
		    auth.onChange = this.setStateOnAuth;
		    auth.login();
		},
		render: function() {
			return (
				<RouteHandler/>
			);
		}
	});

    var routes = (
			  <Route handler={App} path="/">
			    <DefaultRoute handler={Login}/>
			    <Route name="/login"  handler={Login}/>
			    <Route  handler={Layout}>
				    <Route name="projects" path="/projects"   handler={ProjectList}/>
				    <Route name="issues" path="/projects/:projectName"   handler={TaskList}/>
				    
				    <Route name="issues_new" path="/projects/:projectName/new"   handler={NewTask}/>
				    <Route name="issues_edit" path="/projects/:projectName/:taskId"   handler={EditTask}/>
			    </Route>
			    
			  </Route>
			);

    var actions = require('jsx!actions');

    return {
    	run : function(){
    		actions.applicationStart();

			Router.run(routes, function (Handler) {
				React.render(<Handler/>, document.getElementById('app'));
			});
    	}
    }
});