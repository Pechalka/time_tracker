define(function(require) {    
	var React = require('react');
	var { State } = require('react-router');
	var { Panel, Well,  Row, Col, Grid, Input, TabbedArea, TabPane, Table, Button, ButtonGroup } = require('react-bootstrap');
	var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

	var actions = require('jsx!actions');
	var Reflux = require('reflux');
	var stores = require('stores');

	var AddCommentForm = React.createClass({
		mixins : [
            React.addons.LinkedStateMixin
        ],
        getInitialState: function() {
			return {
				title : '',
				text : ''
			};
		},
		addComment : function(e){
			e.preventDefault()

			actions.addComment(this.props.taskId, this.state);
			this.setState({
				title : '',
				text : ''
			})
		},
		render : function(){
			return <Well bsSize="small">
				<form onSubmit={this.addComment}>
					<Input valueLink={this.linkState("title")} type="text" label='Title'  />
					<Input valueLink={this.linkState("text")} type="textarea" label='Comment'  />
					<Button type="submit" onClick={this.createTask}>Add comment</Button>
				</form>
			</Well>
		}
	})

	var CommentsList = React.createClass({
		mixins: [ Reflux.connect(stores.comments, "comments") ],
    	render : function(){
			var comments = this.state.comments.map((c) => {
				return <div className="media">
					<div className="media-body">
						<h4 className="media-heading">{c.title}</h4>
						<p>{c.text}</p>
					</div>
				</div>
			})

			return <div>{comments}</div>
		}
	})

    return  React.createClass({
    	mixins: [ State, Reflux.connect(stores.task) ],
    	componentDidMount: function() {
    		actions.showTask(this.getParams())
    	},
    	componentWillReceiveProps: function(nextProps) {
    		actions.showTask(this.getParams())
    	},
		render: function() {
			return (
				<Row>
					<Col xs={10}>
					<Panel header={this.state.title}>
						<p>{this.state.description}</p>
					</Panel>
					<AddCommentForm taskId={this.state.id}/>
					<CommentsList  />
					</Col>
				</Row>

			);
		}

	});
});