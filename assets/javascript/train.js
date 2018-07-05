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
//for current time and update every second
function clock() {
$("#currentTime").text(moment().format("D MMM YYYY HH:mm:ss"));
}
setInterval(clock, 1000);
//Initial values

//Button click to capture values for train

//Code to push into firebase

//Wait for firebase to change values

//handle errors

//show in html



