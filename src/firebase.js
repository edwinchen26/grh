const firebase = require("firebase/app");
require("firebase/firestore");

const config = {
    apiKey: "AIzaSyAIUhFcuWtfOnSPgXSlxLexdUaHuI6sfVg",
    authDomain: "grh2019-13e86.firebaseapp.com",
    databaseURL: "https://grh2019-13e86.firebaseio.com",
    projectId: "grh2019-13e86",
    storageBucket: "grh2019-13e86.appspot.com",
    messagingSenderId: "1039902249748",
    appId: "1:1039902249748:web:ccb4a933dbfbc230"
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();