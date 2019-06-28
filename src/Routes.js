import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import Artist from './containers/Artist/Artist';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import NewArtist from './containers/Artist/NewArtist';
import NewAlbum from './containers/Albums/NewAlbum';
import NewTrack from './containers/Tracks/NewTrack';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';

const ProtectedRoute = ({isAllowed, ...props}) => (
	isAllowed ? <Route {...props} /> : <Redirect to="/login" />
);

const Routes = ({user}) => (
	<Switch>
	<Route path="/" exact component={Artist} />
	<Route exact path="/albums/:artistId" component={Albums}/>
	<Route exact path="/tracks/:albumId" component={Tracks}/>
	<Route exact path="/track_history" component={TrackHistory}/>

	<Route exact path="/new_artist" component={NewArtist}/>
	<Route exact path="/new_album" component={NewAlbum}/>
	<Route exact path="/new_track" component={NewTrack}/>

	<Route exact path="/register" component={Register}/>
	<Route exact path="/login" component={Login}/>

	<ProtectedRoute
		path="/edit_artist/:artistId"
		exact
		isAllowed={user && user.role === 'admin'}
		render={props => <NewArtist {...props} edit/>}
	/>
	<ProtectedRoute
		path="/edit_album/:id"
		exact
		isAllowed={user && user.role === 'admin'}
		render={props => <NewAlbum {...props} edit/>}
	/>
	<ProtectedRoute
		path="/edit_track/:id"
		exact
		isAllowed={user && user.role === 'admin'}
		render={props => <NewTrack {...props} edit/>}
	/>
</Switch>
);

export default Routes;
