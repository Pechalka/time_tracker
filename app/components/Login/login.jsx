define(function(require) {    
	var React = require('react');

    var { Row, Col, Grid, Input, TabbedArea, TabPane } = require('react-bootstrap');
    var { LinkedStateRadioGroupMixin } = require('mixins');

    require('css!./login');


    var actions = require('jsx!actions');
    

    var RegistForm = React.createClass({
        mixins : [
            LinkedStateRadioGroupMixin,
            React.addons.LinkedStateMixin
        ],
        getInitialState: function() {
            return {
                accountType : "developer",
                email : '',
                password : ''
            };
        },
        register : function(e){
            e.preventDefault()
            actions.registrUser(this.state);
        },
        render : function(){
            var accountType = this.radioGroup('accountType');

            return <form onSubmit={this.register}>
                <Input valueLink={this.linkState("email")} type="text" label='email'  />
                <Input valueLink={this.linkState("password")} type="password" label='password'  />
                <Row className="text-center">
                    <Col xs={6}>
                        <Input checkedLink={accountType.valueLink("manager")} type="radio" label="Manager"    />
                    </Col>
                    <Col xs={6}>
                        <Input checkedLink={accountType.valueLink("developer")} type="radio" label="Developer"     />
                    </Col>
                </Row>
                <Input  bsStyle="warning" type="submit" value="Register" block />
            </form>
        }
    })

    var LoginForm = React.createClass({
        mixins : [
            React.addons.LinkedStateMixin
        ],
        getInitialState: function() {
            return {
                email : '',
                password : ''
            };
        },
        login : function(e){
            e.preventDefault()
            actions.login(this.state);
        },
        render : function(){
            return <form onSubmit={this.login}>
                <Input type="text" label='email' valueLink={this.linkState("email")} />
                <Input type="password" label='password' valueLink={this.linkState("password")} />
                <Input bsStyle="success" type="submit" value="Login" block />
            </form>
        }
    })

    return  React.createClass({
        render: function() {
            return <Grid>
                <Row>
                    <Col xsOffset={4} xs={4} className="login-form-container">
                        <TabbedArea  defaultActiveKey={2}>
                            <TabPane className="login-form" eventKey={1} tab="Login">
                                <LoginForm/>
                             </TabPane>
                             <TabPane className="login-form" eventKey={2} tab="Register">
                                <RegistForm/>
                             </TabPane>   
                         </TabbedArea>
                    </Col>
                </Row>
            </Grid>
		}

	});
});