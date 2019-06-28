import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {createAlbum, fetchArtists} from "../../store/actions/action-music";
import {Button, Form} from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';


class NewAlbum extends Component {
	state = {
		name: '',
		published: false,
		year: '',
		artist: '',
	};

	componentDidMount() {
		this.props.onFetchArtists();
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
		return (
			<Fragment>
				<h2 className='mt-5 mb-4'>Add new album</h2>
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
						title="Year"
						type="number"
						required
						min="0"
						name="year"
						placeholder="Enter year"
						value={this.state.year}
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
							/>: null
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
						title="Artist"
						type="select"
						required
						name="artist"
						options={this.props.artists}
						value={this.state.artist}
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
		artists: state.music.artists,
		user: state.users.user
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: data => dispatch(createAlbum(data)),
		onFetchArtists: () => dispatch(fetchArtists())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);

