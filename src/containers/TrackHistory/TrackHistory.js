import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchTrackHistory} from "../../store/actions/action-music";



class TrackHistory extends Component {
	state = {
	};

	componentDidMount() {
		this.props.onFetchTrackHistory();
	}

	render () {
		return (
			<Fragment>
				<h2>My track history</h2>
				{
					this.props.trackHistory.length>0?
						this.props.trackHistory.map(trackHistoryItem => {
							const formattedDate = new Date(trackHistoryItem.datetime).toString();
							return (
								<div key={trackHistoryItem._id}
								     className="d-flex mb-3 border rounded p-4 align-items-center justify-content-between">
									<div className="p-3">{trackHistoryItem.trackId.album.artist.name}</div>
									<div className="p-3">{trackHistoryItem.trackId.name}</div>
									<div className="p-3">{formattedDate}</div>
								</div>
							)}
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
		trackHistory: state.music.trackHistory
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchTrackHistory: () => dispatch(fetchTrackHistory())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);
