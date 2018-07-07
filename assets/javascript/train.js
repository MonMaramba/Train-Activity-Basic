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
$("#currentTime").text(moment().format("D MMM HH:mm:ss"));
}
setInterval(clock, 1000);
//Initial values
var now = moment().format("HH:mm");
var tName = "";
var destinationIn = "";
var firstTIn = "";
var freq;
var timeDiff;

//Button click to capture values for train
$("#go").on("click", function(event){
    event.preventDefault();

    tName = $("#TrainNameIn").val().trim();
    destination = $("#DestinationIn").val().trim();
    firstTIn = $("#firstTrainIn").val().trim();
    freq = $("#frequencyIn").val().trim();

    //Code to push into firebase

    database.ref().push({
        name: tName,
        destination: destination,
        firstTrain: firstTIn,
        frequency: freq
    })


    //computations for minutes til next train
    //to make sure computation is for a future event    
    var convertedTime = moment(firstTIn, "hh:mm").subtract(1, "years");
        
    timeDiff = moment().diff(moment(convertedTime), "minutes");
    timeRemain = timeDiff % freq;

    console.log(tName);
    console.log(destination);
    console.log(firstTIn);
    console.log(timeRemain);





})

//to empty input forms
$("#TrainNameIn").val("");
$("#DestinationIn").val("");
$("#firstTrainIn").val("");
$("#frequencyIn").val("");


//compute for next arrival and minutes away

//Code to push into firebase

//Wait for firebase to change values

//handle errors

//show in html



