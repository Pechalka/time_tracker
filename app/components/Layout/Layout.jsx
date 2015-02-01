define(function(require) {    
	var React = require('react');

	var Router = require('react-router');
	var { Route, DefaultRoute, RouteHandler, Link } = Router;
	var { Nav, Navbar, NavItem, Link, Grid } = require('react-bootstrap');
	
	var isArray = function(obj){
		return Object.prototype.toString.call( obj ) === '[object Array]';
	}

	var NavMenu = React.createClass({
		mixins: [ Router.State ],
		getInitialState: function() {
			return {
				projectName : "test" 
			};
		},
		render : function(){
			
			var style = {
				borderRadius : '0'
			}

			var items = [
				{
					href : "#/projects", 
					title : "Projects", 
					to : "projects"
				},
				{
					href : "#/projects/" + this.state.projectName , 
					title : "Issues", 
					to : ["issues", "issues_edit"]
				},
				{
					href : "#/projects/" + this.state.projectName + "/new", 
					title : "New issues", 
					to :  "issues_new"	
				}
			].map(function(item, index) {
				var isActive = false;

				if (isArray(item.to)){
					isActive = item.to
								   .map((to) => this.isActive(to, this.props.params, this.props.query))
								   .some((value) => !!value);

				} else {
					isActive = this.isActive(item.to, this.props.params, this.props.query);
				}
				
				return <NavItem active={isActive} eventKey={index} href={item.href}>{item.title}{isActive}</NavItem>
			}.bind(this))

			return  <Navbar style={style} inverse>
		      <Nav>
		        {items}
		      </Nav>
		      <Nav right>
		        <NavItem eventKey={0} href="#/login">Log out</NavItem>
		      </Nav>
		    </Navbar>
		}
	})
	
    return  React.createClass({
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