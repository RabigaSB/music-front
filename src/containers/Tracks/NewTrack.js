import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import { createTrack, fetchAlbums} from "../../store/actions/action-music";
import {Button, Form} from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';


class NewTrack extends Component {
	state = {
		name: '',
		published: false,
		trackNumber: '',
		album: '',
		length: ''
	};

	componentDidMount() {
		this.props.onFetchAlbums();
	}

	submitFormHandler = event => {
		event.preventDefault();

		// const formData = new FormData();
		//
		// for (let key in this.state) {
		// 	formData.append(key, this.state[key]);
		// }
		this.props.onSubmit(this.state);
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	inputChangeCheckboxHandler = event => {
		this.setState({
			[event.target.name]: event.target.checked
		});
	};

	render() {
		return (
			<Fragment>
				<h2>Add new track</h2>
				<Form onSubmit={this.submitFormHandler}>
					<FormElement
						title="Name"
						type="text"
						required
						name="name"
						placeholder="Enter name"
						value={this.state.name}
						onChange={this.inputChangeHandler}
					/>
					<FormElement
						title="Track number"
						type="number"
						required
						min="0"
						name="trackNumber"
						placeholder="Enter trackNumber"
						value={this.state.year}
						onChange={this.inputChangeHandler}
					/>
					<FormElement
						title="Published"
						type="checkbox"
						required
						name="published"
						checked={this.state.published}
						onChange={this.inputChangeCheckboxHandler}
					/>
					<FormElement
						title="Length"
						type="text"
						required
						name="length"
						placeholder="Enter length"
						value={this.state.length}
						onChange={this.inputChangeHandler}
					/>
					<FormElement
						title="Album"
						type="select"
						required
						name="album"
						options={this.props.albums}
						value={this.state.album}
						onChange={this.inputChangeHandler}
					/>


					<Button type="submit" color="primary" >Save</Button>

				</Form>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		albums: state.music.albums
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: data => dispatch(createTrack(data)),
		onFetchAlbums: () => dispatch(fetchAlbums())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTrack);

