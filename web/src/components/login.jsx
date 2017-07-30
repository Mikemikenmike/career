import React from "react";
import Radium from "radium";
import google_signin_normal from "../external/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png";

@Radium
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log("Login Constructed");
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card  default-primary-color">
                        <div className="card-content white-text">
                            <span className="card-title">Sign In
                                <i className="material-icons right"
                                   style={[
                                       {
                                           'cursor': 'pointer',
                                           'WebkitTransform': 'rotate(45deg)',
                                           'MozTransform': 'rotate(45deg)',
                                           'OTransform': 'rotate(45deg)',
                                           'mstransform': 'rotate(45deg)',
                                           'transform': 'rotate(45deg)'
                                       }
                                   ]}
                                   onClick={() => {
                                       this.props.showLoginPage(false);
                                   }}>add</i>
                            </span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <input type="image" src={google_signin_normal} onClick={() => {
                                let provider = new firebase.auth.GoogleAuthProvider();
                                provider.addScope('profile email');
                                firebase.auth().signInWithRedirect(provider);
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}