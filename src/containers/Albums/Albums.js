import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {fetchAlbums} from "../../store/actions/action-music";
import {Link} from "react-router-dom";
import Thumbnail from '../../components/Thumbnail/Thumbnail';


class Albums extends Component {
	state ={
		artist: ''
	};
	componentDidMount() {
		this.props.onFetchAlbums(this.props.match.params.artistId)
			.then(data => {
				if(data.albums.length>0) {
					this.setState({artist: data.albums[0].artist.name})
				}
			});

	}

	render() {
		return (
			<Fragment>
				<h2>{this.state.artist}'s albums</h2>
				{
					this.props.albums.length >0?
						this.props.albums.map(album => (
							<Link to={"/tracks/" + album._id} key={album._id} className="d-flex mb-3 border rounded p-4 align-items-center">
								<Thumbnail image={album.image}/>
								<div className="p-3">{album.name}</div>
								<div className="p-3">{album.year}</div>
							</Link>
							)
						)
						:
						<p>no albums yet</p>

				}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		albums: state.music.albums
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchAlbums: artistId => dispatch(fetchAlbums(artistId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);

