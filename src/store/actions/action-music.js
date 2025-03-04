import {
	FETCH_ARTISTS_SUCCESS,
	FETCH_ALBUMS_SUCCESS,
	FETCH_TRACKS_SUCCESS,
	FETCH_TRACK_HISTORY_SUCCESS,
	FETCH_ARTIST_BY_ID_SUCCESS,
	FETCH_ALBUM_BY_ID_SUCCESS,
	FETCH_TRACK_BY_ID_SUCCESS
} from './actionTypes';
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
	if (getState().users.user) {
		if(getState().users.user.role === 'admin') {
			adminRoute = '/admin';
		}
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
	let endpoint = '';
	if(artistId) endpoint = '?artist=' + artistId;
	return (dispatch, getState) => {
		
		const url = '/albums' + getAdminRoute(getState) + endpoint;
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

		console.log(data);
		
		const url = '/tracks' + getAdminRoute(getState);
		const headers = getAuthHeader(getState);
		
		return axios.post(url, data, {headers})
				.then(response => dispatch(push('/')));
	};
};

const fetchArtistByIdSuccess = artist => {
	return {type: FETCH_ARTIST_BY_ID_SUCCESS, artist};
};

export const fetchArtistById = artistId => {
	return (dispatch, getState) => {

		const url = '/artists/'+ artistId + getAdminRoute(getState);
		const headers = getAuthHeader(getState);

		return axios.get(url, {headers}).then(
			response => dispatch(fetchArtistByIdSuccess(response.data[0]))
		)
	};
};

const fetchAlbumByIdSuccess = album => {
	return {type: FETCH_ALBUM_BY_ID_SUCCESS, album};
};

export const fetchAlbumById = id => {
	return (dispatch, getState) => {

		const url = '/albums/'+ id + getAdminRoute(getState);
		const headers = getAuthHeader(getState);

		return axios.get(url, {headers}).then(
			response => dispatch(fetchAlbumByIdSuccess(response.data[0]))
		)
	};
};

const fetchTrackByIdSuccess = track => {
	return {type: FETCH_TRACK_BY_ID_SUCCESS, track};
};

export const fetchTrackById = id => {
	return (dispatch, getState) => {

		const url = '/tracks/'+ id + getAdminRoute(getState);
		const headers = getAuthHeader(getState);

		return axios.get(url, {headers}).then(
			response => dispatch(fetchTrackByIdSuccess(response.data[0]))
		)
	};
};



export const editArtist = (data, id) => {
	return (dispatch, getState) => {
		const url = '/artists/'+ id + '/publish';
		const headers = getAuthHeader(getState);

		return axios.patch(url, data, {headers});
	};
};

export const editAlbum = (data, id) => {
	return (dispatch, getState) => {
		const url = '/albums/'+ id + '/publish';
		const headers = getAuthHeader(getState);

		return axios.patch(url, data, {headers});
	};
};

export const editTrack = (data, id) => {
	return (dispatch, getState) => {
		const url = '/track/'+ id + '/publish';
		const headers = getAuthHeader(getState);

		return axios.patch(url, data, {headers});
	};
};


