//initialize firebase
var config = {
    apiKey: "AIzaSyDmoCo_jTxk5bBjq26MnbQ41ekzZh0iPtI",
    authDomain: "first-project-1d33c.firebaseapp.com",
    databaseURL: "https://first-project-1d33c.firebaseio.com",
    projectId: "first-project-1d33c",
    storageBucket: "first-project-1d33c.appspot.com",
    messagingSenderId: "159227054709"
  };

  firebase.initializeApp(config);

  var database = firebase.database();