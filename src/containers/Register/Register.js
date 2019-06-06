import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from 'react-redux';
import {registerUser} from '../../store/actions/action-user';
import FormElement from "../../components/UI/Form/FormElement";


class Register extends Component {
	state = {
		username: '',
		password: ''
	};
	inputChangeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	onSubmitHandler = e => {
		e.preventDefault();
		this.props.registerUser({...this.state});
	};
	getFieldError = fieldName => {
		return this.props.error && this.props.error.message && this.props.error.message.errors &&
			this.props.error.message.errors[fieldName] &&
			this.props.error.message.errors[fieldName].message;
	};

	render () {
		return (
			<Fragment>
				<h2>Register new user</h2>
				<Form onSubmit={this.onSubmitHandler}>

					<FormElement
						name="username"
						type="text"
						title="Username"
						value={this.state.username}
						onChange={this.inputChangeHandler}
						error={this.getFieldError('username')}
						placeholder="Enter your desired username"

					/>

					<FormElement
						name="password"
						type="password"
						title="Password"
						value={this.state.password}
						onChange={this.inputChangeHandler}
						error={this.getFieldError('password')}
						placeholder="Enter new secure password"
					/>

					<FormGroup row>
						<Col sm={{offset: 2, size: 10}}>
							<Button type="submit" color="primary">
								Register
							</Button>
						</Col>
					</FormGroup>

				</Form>
			</Fragment>
		);

	}
}
const mapStateToProps = state => {
	return {
		error: state.users.registerError
	}
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: userData => dispatch(registerUser(userData))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
