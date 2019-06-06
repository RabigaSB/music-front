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



class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar user={this.props.user} />
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
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));



