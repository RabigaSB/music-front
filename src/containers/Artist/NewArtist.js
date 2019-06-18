import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import { createArtist } from "../../store/actions/action-music";
import {Button, Form} from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';


class NewAlbum extends Component {
	state = {
		name: '',
		published: false,
		information: '',
	};

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		for (let key in this.state) {
			formData.append(key, this.state[key]);
		}
		this.props.onSubmit(formData);
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

	fileChangeHandler = e => {
		this.setState({image: e.target.files[0]})
	};

	render() {
		return (
			<Fragment>
				<h2>Add new artist</h2>
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
						title="Published"
						type="checkbox"
						required
						name="published"
						checked={this.state.published}
						onChange={this.inputChangeCheckboxHandler}
					/>
					<FormElement
						title="Image"
						type="file"
						name="image"
						placeholder="Enter image"
						value={this.state.image}
						onChange={this.fileChangeHandler}
					/>
					<FormElement
						title="Information"
						type="text"
						required
						name="information"
						placeholder="Enter information"
						value={this.state.information}
						onChange={this.inputChangeHandler}
					/>


					<Button type="submit" color="primary" >Save</Button>

				</Form>
			</Fragment>
		);
	}
}


const mapDispatchToProps = dispatch => {
	return {
		onSubmit: data => dispatch(createArtist(data)),
	};
};

export default connect(null, mapDispatchToProps)(NewAlbum);

