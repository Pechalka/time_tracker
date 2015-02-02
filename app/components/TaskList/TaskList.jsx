define(function(require) {    
	var React = require('react');
	var { State } = require('react-router');
	var { Row, Col, Grid, Input, TabbedArea, TabPane, Table, Button, ButtonGroup } = require('react-bootstrap');
	
	var actions = require('jsx!actions');
	var Reflux = require('reflux');
	var stores = require('stores');



    return  React.createClass({
    	mixins: [ 
	    	State, 
	    	Reflux.connect(stores.tasks, "tasks"), 
	    	Reflux.connect(stores.projectName, "projectName") 
    	],

    	getInitialState: function() {
    		return {
    			accountType : 'developer' ,
    			//developer manager
    			statuses : ['new', 'resolve', 'feadback', 'reopen', 'completed']
    		};
    	},
    	changeAccountType : function(type, e){
    		e.preventDefault()
    		this.setState({
    			accountType : type
    		})
    	},
    	updateStatus : function(t, e){
    		actions.updateStatus(t, e.target.value);
    	},
    	developerView : function(){
    		var options = this.state.statuses.map((s) => {
    			return <option value={s}>{s}</option>
    		})

    		var rows = this.state.tasks.map((t, index) => {
					return <tr key={t.id}>
			          <td>{index+1}</td>
			          <td><a href={"#/projects/" + this.state.projectName + "/" + t.id}>{t.title}</a></td>
			          <td>
			          		<Input onChange={this.updateStatus.bind(this, t)} type="select" value={t.status} >{options}</Input>
			          </td>
			          <td>{t.category}</td>
			          <td>{t.updated}</td>
			          <td>{t.assignee}</td>
			        </tr>
				})
			return  <div>
				<Table responsive>
			      <thead>
			        <tr>
			          <th>#</th>
			          <th>Subject</th>
			          <th>Status</th>
			          <th>Category</th>
			          <th>Updated</th>
			          <th>Assignee</th>
			        </tr>
			      </thead>
			      <tbody>
			        {rows}
			      </tbody>
			    </Table>
			 </div>
    	},

    	removeTask : function(t, e){
    		e.preventDefault()
    		actions.removeTask(t)
    	},
    	componentDidMount: function() {
    		actions.showTasks(this.getParams());
    		this.setState({
    			projectName : this.getParams().projectName
    		})
    	},
    	componentWillReceiveProps: function(nextProps) {
    		actions.showTasks(this.getParams());
    	},
    	mangerView : function(){
			var rows = this.state.tasks.map((t, index) => {
					return <tr key={t.id}>
			          <td>{index+1}</td>
			          <td><a href={"#/projects/" + this.state.projectName + "/" + t.id}>{t.title}</a></td>
			          <td>{t.status}</td>
			          <td>{t.category}</td>
			          <td>{t.updated}</td>
			          <td>{t.assignee}</td>
			          <td><Button onClick={this.removeTask.bind(this, t)} bsSize="xsmall" bsStyle="danger" >remove</Button></td>
			        </tr>
				})
			return <div>
            		<Table responsive>
				      <thead>
				        <tr>
				          <th>#</th>
				          <th>Subject</th>
				          <th>Status</th>
				          <th>Category</th>
				          <th>Updated</th>
				          <th>Assignee</th>
				          <th></th>
				        </tr>
				      </thead>
				      <tbody>
				        {rows}
				      </tbody>
				    </Table>
            </div>
    	},
		render: function() {
			var isManager = this.state.accountType == 'manager' ;
			var view;

			// var switcher = <ButtonGroup>
			// 			      <Button onClick={this.changeAccountType.bind(this, "developer")}>developer</Button>
			// 			      <Button onClick={this.changeAccountType.bind(this, "manager")}>manager</Button>
			// 			      <Button href="#/login">logout</Button>
			// 			    </ButtonGroup>

			// if (this.state.accountType == 'manager'){
			// 	view = this.mangerView()
			// }

			// if (this.state.accountType == 'developer'){
			// 	view = this.developerView() 
			// }

			view = this.mangerView()
			
			return <Row>
                	<Col xs={12}>
                		{view}
                	</Col>
                </Row>
            
		}

	});
});