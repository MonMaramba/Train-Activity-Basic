//initializing firebase
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
$("#go").on("click", function (event) {
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
    nextTrainTime = moment().add(minsToNextTrain, "minutes");
    formattedNextTrainTime = moment(nextTrainTime).format("hh:mm A");

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
database.ref().on("child_added", function (childSnapshot) {

    //assign to variables
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var train1 = childSnapshot.val().nextTime;
    var fQ = childSnapshot.val().frequency;
    var mins = childSnapshot.val().nextTrainMins;

    //add as table data in html

    $("tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + "Every " + fQ + " mins" + "</td><td>" + train1 + "</td><td>" + mins + " mins" + "</td></tr>");

    //to handle errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

