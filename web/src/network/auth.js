/**
 * Created by mike on 7/30/17.
 */

export default class Auth {

    onAuthStateChange(cb) {
        firebase.auth().onAuthStateChanged(cb);
    }

    getRedirectResult() {
        return new Promise((resolve, reject) => {
            firebase.auth().getRedirectResult().then(result => {
                resolve(result);
                // console.log("REDIRECT!!! Result");
                // console.log(result);
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
                // var user = result.user;
                // console.log(user);
                // comp.setState({user: user || {}});
            }).catch(error => {
                reject(error);
            });
        });
    }
}