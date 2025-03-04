import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchArtists} from "../../store/actions/action-music";
import Thumbnail from "../../components/Thumbnail/Thumbnail";


class Artist extends Component {
	componentDidMount() {
		this.props.onFetchArtists();
	}

	render() {
		return (
			<Fragment>
				<h2>Artists</h2>
				{
					this.props.artists.length>0?
					this.props.artists.map(artist => (
						<div className='position-relative' key={artist._id}>
							<Link to={'/edit_artist/' + artist._id} className='btn--edit'><i className="fas fa-edit"></i></Link>
							<Link to={"/albums/" + artist._id} className="d-flex mb-3 border rounded p-4">
								<Thumbnail image={artist.image}/>
								<div className="p-3 ">{artist.name}</div>
							</Link>
						</div>
						)
					)
					:
					<p>no artists yet</p>

				}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		artists: state.music.artists
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchArtists: () => dispatch(fetchArtists())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);

