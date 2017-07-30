import React from "react";
import "../css/palette.css";
import Login from "./login.jsx";


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            login_screen: false
        };

        // if (firebase.auth().currentUser == null) {
        //     firebase.auth().signInWithRedirect(this.provider);
        // }

        let comp = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                comp.setState({user: user});
            } else {
                comp.setState({user: null});
            }
        });

        firebase.auth().getRedirectResult().then(result => {
            console.log("REDIRECT!!! Result");
            console.log(result);
            // if (result.credential) {
            //     // This gives you a Google Access Token. You can use it to access the Google API.
            //     var token = result.credential.accessToken;
            //     // console.log(token);
            //     // ...
            // }
            //
            // var user = firebase.auth().currentUser;
            // if (user != null) {
            //     user.providerData.forEach(function (profile) {
            //         console.log("Sign-in provider: " + profile.providerId);
            //         console.log("  Provider-specific UID: " + profile.uid);
            //         console.log("  Name: " + profile.displayName);
            //         console.log("  Email: " + profile.email);
            //         console.log("  Photo URL: " + profile.photoURL);
            //     });
            // }
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            comp.setState({user: user});
        }).catch(error => {
            console.log("ERRRRROR " + error)

        });

        this.signOut = this.signOut.bind(this);
        this.showLoginPage = this.showLoginPage.bind(this);
    }

    render() {
        return (
            <div>
                <NavBar
                    showLoginPage={this.showLoginPage}
                    signOut={this.signOut}
                    user={this.state.user}
                    tabs={[
                        {href: "home", label: "Home", active: true},
                        {href: "enroute", label: "Enroute", active: true}
                    ]}
                />
                {this.state.login_screen && <Login showLoginPage={this.showLoginPage}/>}

                <div id="home" className="row">
                    <div className="col s6">hey</div>
                </div>
                <div id="enroute" className="row">
                    <div className="col s6">no</div>
                </div>
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
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.side_nav = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`Navbar next: ${nextProps}`);
        console.log(nextProps);
        return true;
    }

    render() {
        return (
            <nav className="nav-extended">
                <div className={`nav-wrapper default-primary-color`}>
                    <a href="#" className="brand-logo  center">Logo</a>
                    <ul id="nav-right" className="right hide-on-med-and-down">
                        <li>
                            {this.props.user ?
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
                                    <img src="https://c1.staticflickr.com/4/3739/11255092594_42232c74b1_b.jpg"/>
                                </div>
                                {/*<a href="#!user"><img className="circle" src="images/yuna.jpg"/></a>*/}
                                <a href="#!name"><span className="white-text name">John Doe</span></a>
                                <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
                            </div>
                        </li>
                        <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                        <li><a href="#!">Second Link</a></li>
                        <li>
                            <div className="divider"></div>
                        </li>
                        <li><a className="subheader">Subheader</a></li>
                        <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
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
                                <li key={i} className="tab"><a className={tab.active || ''} href={`#${tab.href}`}>{tab.label}</a></li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        );
    }
}