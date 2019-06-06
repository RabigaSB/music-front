import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchTracks, createTrackHistory} from "../../store/actions/action-music";


class Tracks extends Component {
	state ={
		album: ''
	};
	componentDidMount() {
		this.props.onFetchTracks(this.props.match.params.albumId)
			.then(data => {
				if(data) {
					if(data.tracks.length>0 ) {
						this.setState({album: data.tracks[0].album.name})
					}
				}
			});
	}

	render() {
		return (
			<Fragment>
				<h2>Album name: {this.state.album}</h2>
				{
					this.props.tracks.length>0?
						this.props.tracks.map(track => (
								<div key={track._id}
								     className="d-flex mb-3 border rounded p-4 align-items-center justify-content-between"
								     onClick={() => this.props.onCreateTracks({trackId: track._id})}
								     tabIndex={0}
								>
									<div className="p-3">{track.trackNumber}</div>
									<div className="p-3">{track.name}</div>
									<div className="p-3">{track.length}</div>
								</div>
							)
						)
						:
						<p>no tracks yet</p>
				}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		tracks: state.music.tracks
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchTracks: albumId => dispatch(fetchTracks(albumId)),
		onCreateTracks: data => dispatch(createTrackHistory(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);

