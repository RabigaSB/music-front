import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {createAlbum} from "../../store/actions/action-music";


class NewAlbum extends Component {
	
	render() {
		return (
				<Fragment>
					here will be form
				</Fragment>
		);
	}
}


const mapDispatchToProps = dispatch => {
	return {
		onPostAlbums: data => dispatch(createAlbum(data))
	};
};

export default connect(null, mapDispatchToProps)(NewAlbum);

