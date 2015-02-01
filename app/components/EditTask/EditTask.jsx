define(function(require) {    
	var React = require('react');
	var { Panel, Well,  Row, Col, Grid, Input, TabbedArea, TabPane, Table, Button, ButtonGroup } = require('react-bootstrap');
	var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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

		},
		render : function(){
			return <Well bsSize="small">
				<form onSubmit={this.addComment}>
					<Input valueLink={this.linkState("title")} type="text" label='Title'  />
					<Input valueLink={this.linkState("text")} type="textarea" label='Comment'  />
					<Button onClick={this.createTask}>Add comment</Button>
				</form>
			</Well>
		}
	})

	var CommentsList = React.createClass({
		getInitialState: function() {
    		return {
    			comments : [1, 2]
    		}
    	},
		render : function(){
			var comments = this.state.comments.map((c) => {
				return <div className="media">
					<div className="media-body">
						<h4 className="media-heading">Media heading</h4>
						<p>{lorem}</p>
					</div>
				</div>
			})

			return <div>{comments}</div>
		}
	})

    return  React.createClass({
    	getInitialState: function() {
    		return {
				title : 'blb blb title',
				description : lorem ,
				id : 5
    		}
    	},
		render: function() {
			return (
				<Row>
					<Col xs={10}>
					<Panel header={this.state.title}>
						<p>{this.state.description}</p>
					</Panel>
					<AddCommentForm taskId={this.state.id}/>
					<CommentsList taskId={this.state.id} />
					</Col>
				</Row>

			);
		}

	});
});