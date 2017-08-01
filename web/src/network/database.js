export default class Database {
    getUsers() {
        return new Promise((resolve, reject) => {
            let ref = firebase.database().ref('users').once('value').then(snapshot => {
                console.log(snapshot.val());
                resolve(snapshot);
            }, err => {
                console.log(err);
                reject(err);
            })
        });
    }

    addUser(uid, name, email) {
        let updates = {
            users: {
                [uid]: {
                    name: name,
                    email: email,
                    modules: {}
                }
            }
        };
        firebase.database().ref().update(updates);
    }

    Get(path) {
        return new Promise((resolve, reject) => {
            firebase.database().ref(path).once('value').then(snapshot => {
                console.log(snapshot.val());
                resolve(snapshot);
            }, err => {
                console.log(err);
                reject(err);
            })
        });
    }
}
