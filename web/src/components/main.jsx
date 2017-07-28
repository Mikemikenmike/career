import React from "react";
import "../css/palette.css";
// import {firebase} from "firebase";
console.log(firebase);


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.provider.addScope('profile email');

        // if (firebase.auth().currentUser == null) {
        //     firebase.auth().signInWithRedirect(this.provider);
        // }

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log("onAuthStateChanged!");
                console.log(user);
            } else {
                console.log("no user");
            }
        });

        firebase.auth().getRedirectResult().then(result => {
            console.log("REDIRECT!!!");
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
        }).catch(error => {
            console.log("ERRRRROR " + error)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...

        });

    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="row">
                    <div className="col s6">hey</div>
                </div>
            </div>
        );
    }
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.side_nav = null;
    }

    componentDidMount() {
        $(this.side_nav).sideNav();
    }

    render() {
        return (
            <nav className="nav-extended">
                <div className={`nav-wrapper default-primary-color`}>
                    <a href="#" className="brand-logo  center">Logo</a>
                    <ul id="nav-right" className="right hide-on-med-and-down">
                        <li>
                            <a href="#"
                               data-activates="slide-out"
                               ref={button => {
                                   this.side_nav = button;
                               }}>
                                <i className="material-icons">menu</i></a>
                        </li>
                    </ul>
                    <SideNav />
                </div>
                <div className="nav-content dark-primary-color">
                    <ul className="tabs tabs-transparent">
                        <li className="tab"><a className="active" href="#test1">Home</a></li>
                        <li className="tab"><a href="#test2">Enroute</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

class SideNav extends React.Component {
    render() {
        return (
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
            </ul>
        );
    }
}