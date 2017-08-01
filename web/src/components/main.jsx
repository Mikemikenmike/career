import React from "react";
import "../css/palette.css";
import Login from "./login.jsx";
import Home from "./home.jsx";
import Enroute from "./enroute.jsx";
import user_background_img from "../external/images/background-2529716_1280.jpg";
import Database from "../network/database.js";
import Auth from "../network/auth.js";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.Auth = new Auth();
        this.Database = new Database();

        this.state = {
            user: {},
            login_screen: false,
            selected_page: '',
            components: {
                "home": <Home />,
                "enroute": <Enroute />
            }
        };

        this.signOut = this.signOut.bind(this);
        this.showLoginPage = this.showLoginPage.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    async componentDidMount() {
        this.Auth.onAuthStateChange((user) => {
            this.setState({user: user || {}});
        });

        await this.Auth.getRedirectResult((result) => {
            let user = result.user;
            if (user) {
                this.setState({user: user});
            }
        });

        console.log("DONE!");

    }

    render() {
        return (
            <div>
                <NavBar
                    showLoginPage={this.showLoginPage}
                    signOut={this.signOut}
                    setPage={this.setPage}
                    user={this.state.user}
                    tabs={[
                        {href: "home", label: "Home", active: true},
                        {href: "enroute", label: "Enroute", active: true}
                    ]}
                />
                {this.state.login_screen && <Login showLoginPage={this.showLoginPage}/>}

                {this.state.selected_page == "home" &&
                <Home

                />}

                {this.state.selected_page == "enroute" &&
                <Enroute Database={this.Database}
                         user={this.state.user}

                />}
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

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.side_nav = null;
    }

    render() {
        return (
            <nav className="nav-extended">
                <div className={`nav-wrapper default-primary-color`}>
                    <a href="#" className="brand-logo  center">Logo</a>
                    <ul id="nav-right" className="right">
                        <li>
                            {!$.isEmptyObject(this.props.user) ?
                                <a href="#"
                                   data-activates="slide-out"
                                   ref={button => {
                                       this.side_nav = button;
                                       $(button).sideNav();
                                   }}>
                                    <i className="material-icons">menu</i>
                                </a>
                                :
                                <a href="#"
                                   onClick={() => {
                                       this.props.showLoginPage(true);
                                   }}>
                                    Sign In
                                </a>
                            }
                        </li>
                    </ul>
                    <ul id="slide-out" className="side-nav">
                        <li>
                            <div className="user-view">
                                <div className="background">
                                    <img src={user_background_img}/>
                                </div>
                                <a href="#!user"><img className="circle" src={this.props.user.photoURL}/></a>
                                <a href="#!name"><span className="white-text name">{this.props.user.displayName}</span></a>
                                <a href="#!email"><span className="white-text email">{this.props.user.email}</span></a>
                            </div>
                        </li>
                        <li><a className="wave-effect" href="#" onClick={() => {
                            this.props.signOut();
                            $(this.side_nav).sideNav("hide");
                            $(this.side_nav).sideNav("destroy");
                        }}>Sign Out</a></li>
                    </ul>
                </div>
                <div className="nav-content dark-primary-color">
                    <ul className="tabs tabs-transparent" ref={(tabs) => {
                        $(tabs).tabs();
                    }}>
                        {/*<li className="tab"><a className="active" href="#test1">Home</a></li>*/}
                        {/*<li className="tab"><a href="#test2">Enroute</a></li>*/}
                        {this.props.tabs.map((tab, i) => {
                            return (
                                <li key={i} className="tab">
                                    <a className={tab.active || ''}
                                       onClick={() => {
                                           this.props.setPage(tab.href);
                                       }}
                                       href={`#${tab.href}`}>{tab.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        );
    }
}