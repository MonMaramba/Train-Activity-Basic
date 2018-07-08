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
var freq = 0;
var timeDiff;
var minsToNextTrain;
var nextTrainTime;
var formattedNextTrainTime;

//Button click to capture values for train
$("#go").on("click", function(event){
    event.preventDefault();

    tName = $("#TrainNameIn").val().trim();
    destination = $("#DestinationIn").val().trim();
    firstTIn = $("#firstTrainIn").val().trim();
    freq = $("#frequencyIn").val().trim();

    //computations for minutes til next train
    //to make sure computation is for a future event    
    var convertedTime = moment(firstTIn, "HH:mm")
        
    timeDiff = moment().diff(moment(convertedTime), "minutes");
    timeRemainder = timeDiff % freq;
    
    //compute for minutes away
    minsToNextTrain = freq - timeRemainder;

    //compute for time of next train arrival
    /*while (nextTrainTime <= moment()) {
        nextArrival = moment(firstTIn).add(freq);  
        console.log(nextTrainTime);}*/

    nextTrainTime = moment().add(minsToNextTrain, "minutes");
    formattedNextTrainTime = moment(nextTrainTime).format("hh:mm A");  

    /*console.log(tName);
    console.log(destination);
    console.log(firstTIn);
    console.log(freq);
    console.log(timeRemainder);
    console.log(minsToNextTrain);
    console.log(formattedNextTrainTime);*/

       //Code to push into firebase

       database.ref().push({
        name: tName,
        destination: destination,
        firstTrain: firstTIn,
        frequency: freq,
        nextTrainMins: minsToNextTrain,
        nextTime: formattedNextTrainTime
        
    })


    //to empty input forms
    $("#TrainNameIn").val("");
    $("#DestinationIn").val("");
    $("#firstTrainIn").val("");
    $("#frequencyIn").val("");

    return false;




})

//firebase "listener" for new values
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextTrainMins);
    console.log(childSnapshot.val().nextTime);




//Wait for firebase to change values

//handle errors

//show in html

})

