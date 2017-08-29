import React from "react";
import google_signin_normal from "../external/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="hero is-primary is-medium">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Sign in
                        </h1>
                        <h2 className="subtitle">
                            Currently only google accounts are supported.
                        </h2>
                        <input type="image" src={google_signin_normal} onClick={() => {
                            let provider = new firebase.auth.GoogleAuthProvider();
                            provider.addScope('profile email');
                            firebase.auth().signInWithRedirect(provider);
                        }}/>
                    </div>
                </div>
            </section>
        );
    }


}