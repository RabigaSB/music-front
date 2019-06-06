import {FETCH_ARTISTS_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_TRACKS_SUCCESS,FETCH_TRACK_HISTORY_SUCCESS} from '../actions/actionTypes';

const initialState = {
	artists: [],
	albums: [],
	tracks: [],
	trackHistory: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ARTISTS_SUCCESS:
			return {...state, artists: action.artists};
		case FETCH_ALBUMS_SUCCESS:
			return {...state, albums: action.albums};
		case FETCH_TRACKS_SUCCESS:
			return {...state, tracks: action.tracks};
		case FETCH_TRACK_HISTORY_SUCCESS:
			return {...state, trackHistory: action.trackHistory};
		default:
			return state;

	}
};

export default reducer;
