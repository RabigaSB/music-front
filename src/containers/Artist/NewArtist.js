import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import { createArtist, fetchArtistById } from "../../store/actions/action-music";
import {Button, Form} from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';


class NewArtist extends Component {
	state = {
		name: '',
		published: false,
		information: '',
	};

	componentDidMount() {
		console.log(this.props);
		if (this.props.edit) {
			this.props.getAtrist(this.props.match.params.artistId)
				.then(data => {
					console.log(data);
					this.setState({
						name: data.artist.name,
						published: data.artist.published,
						information: data.artist.information,
						// image: data.artist.image,
					})

				});
		}

	}

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
		// console.log(this.props.artist);
		return (
			<Fragment>
				<h2 className='mt-5 mb-4'>Add new artist</h2>
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
					{this.props.user?
						(this.props.user.role === 'admin'?
							<FormElement
								title="Published"
								type="checkbox"
								required
								name="published"
								checked={this.state.published}
								onChange={this.inputChangeCheckboxHandler}
							/> : null
						): null
					}
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

const mapStateToProps = state => {
	return {
		user: state.users.user,
		artist: state.music.artist
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: data => dispatch(createArtist(data)),
		getAtrist: id => dispatch(fetchArtistById(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArtist);

