// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAIgwg21srDI2CjN95S24CxSIcerpc-L1c",
    authDomain: "train-d517d.firebaseapp.com",
    databaseURL: "https://train-d517d.firebaseio.com",
    projectId: "train-d517d",
    storageBucket: "",
    messagingSenderId: "3128195461",
    appId: "1:3128195461:web:351ea02d6d01be75"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#newTrain").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var initTime = moment($("#initTime")).format("HH:mm");
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        dest: destination,
        time: initTime,
        freq: frequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    alert("Train successfully added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#initTime").val("");
    $("#frequency").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var initTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    // train Info
    console.log(trainName);
    console.log(destination);
    console.log(initTime);
    console.log(frequency);


    // Assumptions
    var tFrequency = frequency;

    var firstTime = $("#initTime").val;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




    // Create the new row
    var newRow = $("<div class='cf'>").append(
        $("<div class='fl w-20 tc pv3 bg-black-05'>").text(trainName),
        $("<div class='fl w-20 tc pv3 bg-black-10'>").text(destination),
        $("<div class='fl w-20 tc pv3 bg-black-05'>").text(frequency),
        $("<div class='fl w-20 tc pv3 bg-black-10'>").text(nextTrain),
        $("<div class='fl w-20 tc pv3 bg-black-05'>").text(tMinutesTillTrain),
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});