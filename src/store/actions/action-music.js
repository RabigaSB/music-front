import {FETCH_ARTISTS_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_TRACKS_SUCCESS} from './actionTypes';
import axios from '../../axios-api';

const fetchArtistsSuccess = artists => {
	return {type: FETCH_ARTISTS_SUCCESS, artists};
};

export const fetchArtists = () => {
	return dispatch => {
		return axios.get('/artists').then(
			response => dispatch(fetchArtistsSuccess(response.data))
		)
	};
};

const fetchAlbumsSuccess = albums => {
	return {type: FETCH_ALBUMS_SUCCESS, albums};
};

export const fetchAlbums = (artistId) => {
	return dispatch => {
		return axios.get('/albums?artist=' + artistId).then(
			response => dispatch(fetchAlbumsSuccess(response.data))
		)
	};
};

const fetchTracksSuccess = tracks => {
	return {type: FETCH_TRACKS_SUCCESS, tracks};
};

export const fetchTracks = (albumId) => {
	return dispatch => {
		return axios.get('/tracks?album=' + albumId).then(
			response => dispatch(fetchTracksSuccess(response.data))
		)
	};
};
