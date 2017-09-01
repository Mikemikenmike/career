import React from "react";
import "../css/palette.css";
import Login from "./login.jsx";
import NavBar from "./navbar.jsx";
import Home from "./home.jsx";
import Basics from "./basics.jsx";
import Enroute from "./enroute.jsx";
import Study from "./study.jsx";
import StripeClass from "./stripe.jsx";
import Database from "../network/database.js";
import Auth from "../network/auth.js";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.Auth = new Auth();
        this.Database = new Database();

        this.state = {
            user: {},
            permissions: {
                roles: {}
            },
            login_screen: false,
            selected_page: '',
            modules: {},
            user_modules: {}
        };

        this.signOut = this.signOut.bind(this);
        this.showLoginPage = this.showLoginPage.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    async componentDidMount() {
        this.Auth.onAuthStateChange(async(user) => {
            let permissions = await this.Database.Get(`permissions/${user.uid}`);
            console.log(permissions.roles);
            this.setState({user: user || {}, permissions: permissions.val()});
            console.log("USER!");
        });

        await this.Auth.getRedirectResult(async(result) => {
            let user = result.user;
            if (user) {
                let permissions = await this.Database.Get(`permissions/${user.uid}`);
                console.log(permissions);
                this.setState({user: user || {}, permissions: permissions});
                console.log("USER! redirect");
            }
        });
    }

    render() {
        return (
            <div>
                <NavBar
                    showLoginPage={this.showLoginPage}
                    signOut={this.signOut}
                    setPage={this.setPage}
                    user={this.state.user}
                    permissions={this.state.permissions}
                    tabs={[
                        {href: "home", label: "Home"},
                        {href: "enroute", label: "Enroute"}
                    ]}
                    {...this.props}
                />
                {/*{this.state.login_screen && <Login showLoginPage={this.showLoginPage}/>}*/}

                <Route exact path={`${this.props.match.url}`} component={Home}/>
                <Route exact path={`${this.props.match.url}home`} component={Home}/>


                <Route path={`${this.props.match.url}atc/basics`} component={(props) => <Basics Database={this.Database}
                                                                                                permissions={this.state.permissions} {...props} />}/>
                <Route exact path={`${this.props.match.url}atc`} component={(props) => <Basics Database={this.Database}
                                                                                               permissions={this.state.permissions} {...props}/>}/>

                <Route exact path={`${this.props.match.url}login`} component={Login}/>

                {/*<Route exact path={`${this.props.match.url}stripe`} component={props => {*/}
                {/*console.log("render stripe route");*/}
                {/*return <StripeClass Database={this.Database}*/}
                {/*user={this.state.user}*/}
                {/*{...props}*/}
                {/*/>*/}
                {/*}}/>*/}

                <Route exact path={`${this.props.match.url}atc/enroute`} component={props => {
                return <Enroute Database={this.Database}
                user={this.state.user}
                {...props}
                />
                }}/>

                {/*<Route path={`${this.props.match.url}enroute/:module`} component={props => {*/}
                {/*return <Study Database={this.Database}*/}
                {/*user={this.state.user}*/}
                {/*{...props} />*/}
                {/*}}/>*/}
            </div>
        );
    }

    signOut() {
        let comp = this;
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            comp.setState({user: null});
            console.log("Sign Out Complete");
        }).catch(function (error) {
            // An error happened.
            console.log("Sign Out Error");
        });
    }

    showLoginPage(val) {
        this.setState({login_screen: val});
    }

    setPage(name) {
        this.setState({selected_page: name});
    }
}
