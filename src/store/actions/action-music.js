import {FETCH_ARTISTS_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_TRACKS_SUCCESS,FETCH_TRACK_HISTORY_SUCCESS} from './actionTypes';
import axios from '../../axios-api';
import {push} from 'connected-react-router';


const getAuthHeader = getState => {
	let headers = {};
	if (getState().users.user) {
		headers = {
			Authorization: getState().users.user.token
		};
	}
	return headers;
};

const getAdminRoute = getState => {
	let adminRoute='';
	if(getState().users.user.role === 'admin') {
		adminRoute = '/admin';
	}
	return adminRoute;
};

const fetchArtistsSuccess = artists => {
	return {type: FETCH_ARTISTS_SUCCESS, artists};
};

export const fetchArtists = () => {
	return (dispatch, getState) => {
		
		const url = '/artists' + getAdminRoute(getState);
		const headers = getAuthHeader(getState);
		
		return axios.get(url, {headers}).then(
			response => dispatch(fetchArtistsSuccess(response.data))
		)
	};
};


const fetchAlbumsSuccess = albums => {
	return {type: FETCH_ALBUMS_SUCCESS, albums};
};

export const fetchAlbums = (artistId) => {
	return (dispatch, getState) => {
		
		const url = '/albums' + getAdminRoute(getState) + '?artist=' + artistId;
		const headers = getAuthHeader(getState);
		
		return axios.get(url, {headers}).then(
			response => dispatch(fetchAlbumsSuccess(response.data))
		)
	};
};


const fetchTracksSuccess = tracks => {
	return {type: FETCH_TRACKS_SUCCESS, tracks};
};

export const fetchTracks = (albumId) => {

	return (dispatch, getState) => {
		
		const url = '/tracks' + getAdminRoute(getState) + '?album=' + albumId;
		const headers = getAuthHeader(getState);
		
		return axios.get(url, {headers})
			.then(response => dispatch(fetchTracksSuccess(response.data)))
			.catch(e => {
				if(e.response.status === 401) {
					alert('You should authorize first');
					dispatch(push('/login'));
				}
			}
		);
	};
};


const fetchTrackHistorySuccess = trackHistory => {
	return {type: FETCH_TRACK_HISTORY_SUCCESS, trackHistory};
};

export const fetchTrackHistory = () => {

	return (dispatch, getState) => {
		let headers = {};
		if (getState().users.user) {
			headers = {
				Authorization: getState().users.user.token
			};
		}
		return axios.get('/track_history', {headers})
			.then(response => dispatch(fetchTrackHistorySuccess(response.data)));
	};
};

export const createTrackHistory = data => {

	return (dispatch, getState) => {
		let headers = {};
		if (getState().users.user) {
			headers = {
				Authorization: getState().users.user.token
			};
		}
		return axios.post('/track_history', data, {headers});
	};
};


export const createArtist = data => {
	
	return (dispatch, getState) => {
		
		const url = '/artists' + getAdminRoute(getState);
		const headers = getAuthHeader(getState);
		
		return axios.post(url, data, {headers})
				.then(response => dispatch(push('/')));
	};
};

export const createAlbum = data => {
	
	return (dispatch, getState) => {
		
		const url = '/albums' + getAdminRoute(getState);
		const headers = getAuthHeader(getState);
		
		return axios.post(url, data, {headers})
				.then(response => dispatch(push('/')));
	};
};


export const createTrack = data => {
	
	return (dispatch, getState) => {
		
		const url = '/tracks' + getAdminRoute(getState);
		const headers = getAuthHeader(getState);
		
		return axios.post(url, data, {headers})
				.then(response => dispatch(push('/')));
	};
};


