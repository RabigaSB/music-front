import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import { createArtist, fetchArtistById, editArtist } from "../../store/actions/action-music";
import {Button, Form} from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';
import config from '../../config';


class NewArtist extends Component {
	state = {
		name: '',
		published: false,
		information: '',
	};

	componentDidMount() {
		if (this.props.edit) {
			this.props.getAtrist(this.props.match.params.artistId)
				.then(data => {
					this.setState({
						published: data.artist.published,
					})
				});
		}
	}

	submitFormHandler = event => {
		event.preventDefault();
		if(this.props.edit) {
			this.props.editArtist(
				{published: this.state.published},
				this.props.match.params.artistId
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
		// console.log(this.props.artist);
		return (
			<Fragment>
				<h2 className='mt-5 mb-4'>{!this.props.edit? 'Add new': 'Edit'} artist</h2>
				{this.props.edit && this.props.artist?
					<div>
						<img width={60} height={60} src={config.apiURL + '/uploads/' + this.props.artist.image} alt="artist"/>
						<p><b>{this.props.artist.name}</b></p>
						<p>information: <b>{this.props.artist.information}</b></p>
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
						</Fragment>
						: null
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
							/> : null
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
		user: state.users.user,
		artist: state.music.artist
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: data => dispatch(createArtist(data)),
		getAtrist: id => dispatch(fetchArtistById(id)),
		editArtist: (data, id) => dispatch(editArtist(data, id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArtist);

