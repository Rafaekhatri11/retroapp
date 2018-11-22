import React, { Component } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import history from './History';
import Landingpage from './components/landingpage/landing';
import Createretro from './components/createretro/createretro';


function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}


class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authed: false
        }
    }

    componentWillMount() {
        console.log(this.state.authed);
        let data = localStorage.getItem('userdata');

        if (JSON.parse(data).id) {
            this.setState({ authed: true });
            console.log(this.state.authed)
        }
        else {
            this.setState({ authed: false })
        }
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Router history={history} >
                        <Switch>
                            {/* <Createretro />   */}
                            <Route exact path="/" component={Landingpage} />
                            {/* <Route path="/createretro" component={Createretro} /> */}
                            <PrivateRoute component={Createretro} authed={this.state.authed} path="/createretro" />

                        </Switch>
                    </Router>
                </Switch>
            </Router>
        );
    }
}


export default Routers;