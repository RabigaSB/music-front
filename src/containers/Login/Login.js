import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup, Alert} from "reactstrap";
import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from '../../store/actions/action-user';
import {connect} from 'react-redux';
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Login extends Component {
	state = {
		username: '',
		password: ''
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	submitFormHandler = event => {
		event.preventDefault();
		this.props.loginUser(this.state);
	};

	render() {
		return (
			<Fragment>
				<h2>Login</h2>
				{
					this.props.error ?
						<Alert color="danger">{this.props.error.message}</Alert>
						:null
				}
				<Form onSubmit={this.submitFormHandler}>
					<FormElement
						name="username"
						type="text"
						title="Username"
						value={this.state.username}
						onChange={this.inputChangeHandler}
						placeholder="Enter your desired username"

					/>

					<FormElement
						name="password"
						type="password"
						title="Password"
						value={this.state.password}
						onChange={this.inputChangeHandler}
						placeholder="Enter new secure password"
					/>

					<FormGroup row>
						<Col sm={{offset: 2, size: 10}}>
							<Button type="submit" color="primary">
								Login
							</Button>
						</Col>
					</FormGroup>
				</Form>
				<FacebookLogin/>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		error: state.users.loginError
	}
};

const mapDispatchToProps = dispatch => {
	return {
		loginUser: userData => dispatch(loginUser(userData))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

