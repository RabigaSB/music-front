import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {createAlbum, fetchArtists, fetchAlbumById, editAlbum} from "../../store/actions/action-music";
import {Button, Form} from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';
import config from '../../config';


class NewAlbum extends Component {
	state = {
		name: '',
		published: false,
		year: '',
		artist: '',
	};

	componentDidMount() {
		if (this.props.edit) {
			this.props.getAlbum(this.props.match.params.id)
				.then(data => {
					this.setState({
						name: data.album.name,
						published: data.album.published,
						year: data.album.year,
						img: data.album.image,
						artist: data.album.artist.name
					})
				});
		} else {
			this.props.onFetchArtists();
		}
	}

	submitFormHandler = event => {
		event.preventDefault();

		if(this.props.edit) {
			this.props.editAlbum(
				{published: this.state.published},
				this.props.match.params.id
			);
		} else {
			const formData = new FormData();
			for (let key in this.state) {
				formData.append(key, this.state[key]);
			}
			this.props.onSubmit(formData);
		}
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
				<h2 className='mt-5 mb-4'>{!this.props.edit? 'Add new': 'Edit'} album</h2>
				{this.props.edit && this.state.name?
					<div>
						<img width={60} height={60} src={config.apiURL + '/uploads/' + this.state.img} alt="pic"/>
						<p><b>{this.state.name}</b></p>
						<p>artist: <b>{this.state.artist}</b></p>
						<p>year: <b>{this.state.year}</b></p>
					</div>
					: null
				}
				<Form onSubmit={this.submitFormHandler}>
					{!this.props.edit?
						<Fragment>
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
						</Fragment> : null
					}
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
		onFetchArtists: () => dispatch(fetchArtists()),
		getAlbum: id => dispatch(fetchAlbumById(id)),
		editAlbum: (data, id) => dispatch(editAlbum(data, id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);

