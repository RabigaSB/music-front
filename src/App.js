import React, {Component, Fragment} from 'react';
import { withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {logoutUser} from "./store/actions/action-user";
import Routes from './Routes';


class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar user={this.props.user} logout={this.props.onLogoutUser} />
                </header>
                <main>
                    <div className='container'>
                        <Routes user={this.props.user} />
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



