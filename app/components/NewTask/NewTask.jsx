define(function(require) {    
	var React = require('react');
	var { Row, Col, Grid, Input, TabbedArea, TabPane, Table, Button, ButtonGroup } = require('react-bootstrap');
	
	var actions = require('jsx!actions');

    return  React.createClass({
    	mixins : [
            React.addons.LinkedStateMixin
        ],
        getInitialState: function() {
        	return {
        		title : "",
        		category : "feature",
        		description : "" 
        	};
        },
    	createTask : function(e){
    		actions.createTask(this.state);
    	},
		render: function() {
			return (
				<Row>
					<Col xs={10}>
						<form>
							<Input valueLink={this.linkState("title")} type="text" label='Title'  />
							<Input valueLink={this.linkState("category")} type="select" label='Category' >
						        <option value="bug">bug</option>
						        <option value="feature">feature</option>
						    </Input>
							<Input valueLink={this.linkState("description")} type="textarea" label='Description'  />
							<Button onClick={this.createTask}>Create</Button>
						</form>
					</Col>
				</Row>
			);
		}

	});
});