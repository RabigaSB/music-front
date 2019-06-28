import React, {Component} from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "reactstrap";
import {connect} from "react-redux";

import config from "../../config";
import {facebookLogin} from "../../store/actions/action-user";

class FacebookLogin extends Component {
	facebookResponse = response => {
		if (response.id) {
			this.props.facebookLogin(response);
		}
	};

	render() {
		return <FacebookLoginButton
			appId={config.facebookAppId}
			fields="name,email,picture"
			render={renderProps => (
				<Button onClick={renderProps.onClick}>
					Enter with Facebook
				</Button>
			)}
			callback={this.facebookResponse}
		/>
	}
}

const mapDispatchToProps = dispatch => ({
	facebookLogin: data => dispatch(facebookLogin(data))
});

export default connect(null, mapDispatchToProps)(FacebookLogin);
