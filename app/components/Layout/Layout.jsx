define(function(require) {    
	var React = require('react');

	var Router = require('react-router');
	var stores = require('stores');
	var actions = require('jsx!actions');

	var { Route, DefaultRoute, RouteHandler, Link } = Router;
	var { Nav, Navbar, NavItem, Link, Grid } = require('react-bootstrap');
	 var Reflux = require('reflux');
	var isArray = function(obj){
		return Object.prototype.toString.call( obj ) === '[object Array]';
	}

	var { Authentication } = require('jsx!utils/auth');

	
	var NavMenu = React.createClass({
		mixins: [  Router.State, Reflux.connect(stores.projectName, "projectName") ],
		getInitialState: function() {
			return {
			};
		},
		logout : function(e){
			e.preventDefault()
			actions.logout();
		},
		render : function(){
			
			var style = {
				borderRadius : '0'
			}
			var menu = [
				{
					href : "#/projects", 
					title : "Projects", 
					to : "projects"
				},
				{
					href : this.state.projectName ? "#/projects/" + this.state.projectName : '#/projects', 
					title : "Issues", 
					to : ["issues", "issues_edit"]
				},
				{
					href : this.state.projectName ? "#/projects/" + this.state.projectName + "/new" : '#/projects', 
					title : "New issues", 
					to :  "issues_new"	
				}
			]
			var items = menu.map(function(item, index) {
				var isActive = false;

				if (isArray(item.to)){
					isActive = item.to
								   .map((to) => this.isActive(to, this.props.params, this.props.query))
								   .some((value) => !!value);

				} else {
					isActive = this.isActive(item.to, this.props.params, this.props.query);
				}
				
				return <NavItem key={index} active={isActive} eventKey={index} href={item.href}>{item.title}{isActive}</NavItem>
			}.bind(this))

			return  <Navbar style={style} inverse>
		      <Nav>
		        {items}
		      </Nav>
		      <Nav right>
		        <NavItem eventKey={0} onClick={this.logout}>Log out</NavItem>
		      </Nav>
		    </Navbar>
		}
	})
	
    return  React.createClass({
    	mixins : [Authentication],
		render: function() {
			
			return (
				<div >
					<NavMenu/>
					<Grid>
						<RouteHandler/>
					</Grid>
				</div>
			);
		}
	});
});