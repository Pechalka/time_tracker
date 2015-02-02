define(function(require) {    
	var React = require('react');
    var { Panel, Well, Row, Col, Grid, Input, TabbedArea, TabPane, Table, Button, ButtonGroup } = require('react-bootstrap');
	
    var Reflux = require('reflux');
	var actions = require('jsx!actions');
    var stores = require('stores');

    return  React.createClass({
    	mixins : [
            React.addons.LinkedStateMixin,
            Reflux.connect(stores.projects, "projects")
        ],
        getInitialState: function() {
    		return {
    			newProjectName : ''
    		};
    	},
        componentDidMount: function() {
            actions.showProjects();
        },
    	removeProject : function(project, e){
    		e.preventDefault()
    		actions.removeProject(project)
    	},
    	addProject : function(e){
    		e.preventDefault()	
    		actions.addProject({ name : this.state.newProjectName})
    		this.setState({
    			newProjectName : ''
    		})
    	},
    	selectProject : function(p, e){
            //href={"#/projects/" + p.name} 

            window.location.hash = '/projects/' + p.name;
            return false;
        },
		render: function() {
            //debugger
			var projects = this.state.projects.map((p, index) => {
					var css = "list-group-item  clearfix"
					if (index == 1){
						css += " active";
					}
					return <a onClick={this.selectProject.bind(this, p)} className={css}>
    <h4 className="list-group-item-heading">{p.name}</h4>
    <p className="list-group-item-text">asdasdasd</p>
    <Button onClick={this.removeProject.bind(this, p)} className="pull-right" bsSize="xsmall">remove</Button>
  </a>	
				})
			return <Panel header="Projects">
				<ul className="list-group">
				   {projects}
				</ul>
				<Input valueLink={this.linkState("newProjectName")}  type="text" buttonAfter={<Button onClick={this.addProject}>Add project</Button>} />
            </Panel>
		}

	});
});