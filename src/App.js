import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Music from "./containers/Music/Music";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';



class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <main>
                    <div className='container'>
                        <Switch>
                            <Route path="/" exact component={Music} />
                            <Route exact path="/albums/:artistId" component={Albums}/>
                            <Route exact path="/tracks/:albumId" component={Tracks}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                        </Switch>
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default App;

