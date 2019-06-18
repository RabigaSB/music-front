import React, {Component, Fragment} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Music from "./containers/Music/Music";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import {logoutUser} from "./store/actions/action-user";
import NewAlbum from "./containers/Albums/NewAlbum";




class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar user={this.props.user} logout={this.props.onLogoutUser} />
                </header>
                <main>
                    <div className='container'>
                        <Switch>
                            <Route path="/" exact component={Music} />
                            <Route exact path="/albums/:artistId" component={Albums}/>
                            <Route exact path="/tracks/:albumId" component={Tracks}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/track_history" component={TrackHistory}/>
                            <Route exact path="/new_artist" component={TrackHistory}/>
                            <Route exact path="/new_album" component={NewAlbum}/>
                            <Route exact path="/new_track" component={TrackHistory}/>
                        </Switch>
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => ({
    onLogoutUser: () => dispatch(logoutUser())
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));



