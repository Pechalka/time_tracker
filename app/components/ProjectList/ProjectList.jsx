define(function(require) {    
	var React = require('react');
    var { Panel, Well, Row, Col, Grid, Input, TabbedArea, TabPane, Table, Button, ButtonGroup } = require('react-bootstrap');
	
    var Reflux = require('reflux');
	var actions = require('jsx!actions');
    var stores = require('stores');

    return  React.createClass({
    	mixins : [
            React.addons.LinkedStateMixin,
            Reflux.connect(stores.projects, "projects"),
            Reflux.connect(stores.projectName, "projectName")
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
            e.stopPropagation();
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
            actions.selectProject(p);

            return false;
        },
		render: function() {
            //debugger
			var projects = this.state.projects.map((p, index) => {
					var css = "list-group-item  clearfix"
					if (p.name == this.state.projectName){
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