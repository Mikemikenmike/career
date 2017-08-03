import React from "react";
import "../css/palette.css";
import Login from "./login.jsx";
import NavBar from "./navbar.jsx";
import Home from "./home.jsx";
import Enroute from "./enroute.jsx";
import Study from "./study.jsx";
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
            this.setState({user: user || {}});
        });

        await this.Auth.getRedirectResult((result) => {
            let user = result.user;
            if (user) {
                this.setState({user: user});
            }
        });
    }

    render() {
        console.log(history);
        return (
            <div>
                <NavBar
                    showLoginPage={this.showLoginPage}
                    signOut={this.signOut}
                    setPage={this.setPage}
                    user={this.state.user}
                    tabs={[
                        {href: "home", label: "Home"},
                        {href: "enroute", label: "Enroute"}
                    ]}
                    {...this.props}
                />
                {this.state.login_screen && <Login showLoginPage={this.showLoginPage}/>}

                <Route exact path={`${this.props.match.url}`} component={Home}/>
                <Route exact path={`${this.props.match.url}home`} component={Home}/>

                <Route exact path={`${this.props.match.url}enroute`} component={props => {
                    return <Enroute Database={this.Database}
                                    user={this.state.user}
                                    {...props}
                    />
                }}/>

                <Route path={`${this.props.match.url}enroute/:module`} component={props => {
                    return <Study Database={this.Database}
                                  user={this.state.user}
                                  {...props} />
                }}/>
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
