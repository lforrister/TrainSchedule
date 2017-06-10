currentTime = moment();
	console.log(currentTime);





// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCyJhpC6aUVUBz_Zs79F3LF0EJk2rqZhFU",
    authDomain: "train-schedule-3e261.firebaseapp.com",
    databaseURL: "https://train-schedule-3e261.firebaseio.com",
    projectId: "train-schedule-3e261",
    storageBucket: "train-schedule-3e261.appspot.com",
    messagingSenderId: "1085137623884"
  };

  firebase.initializeApp(config);


// Create a variable to call firebaase
var database = firebase.database();

// Create variables to use later 
var trainName = "";
var destination = "";
var frequency = "";
var startTime = "";

//Capture Button Click 

$("#submit").on("click", function() {
	event.preventDefault();

	// capture the value of the user's input

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	startTime = $("#startTime").val().trim();
	frequency = $("#frequency").val().trim();


	// push it to firebase

	database.ref().push({
		trainName : trainName,
		destination: destination,
		startTime: startTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP

	});


});




// Display it to the page 
database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());

	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().startTime);
	console.log(childSnapshot.val().frequency);
	

	// var minutesAway = current time - first train % frequency
	// minutesAway = currentTime - childSnapshot.val().startTime;
	// console.log(minutesAway);
	startTimeValue = childSnapshot.val().startTime;
	console.log(startTimeValue);

	diffTime = moment().diff(moment(startTimeValue, "HH:mm"), "minutes");
	console.log("How much time has passed: " + diffTime);

	trainNumbers = parseInt(diffTime / childSnapshot.val().frequency);
	console.log("Train Number: " + trainNumbers);

	ironBoard = trainNumbers * childSnapshot.val().frequency;
	console.log("ironBoard: " + ironBoard);

	minutesAway = diffTime - ironBoard;
	console.log("Minutes Away: " + minutesAway);

	minutesAway2 = childSnapshot.val().frequency - minutesAway;
	console.log("Minutes Away 2: " + minutesAway2);

	// nextArrival = currentTime + " + " + minutesAway + " minutes";
	// console.log("Next Arrival: " + nextArrival);

	//nextArrival = currentTime + minutesAway;
	nextArrival = currentTime.add(minutesAway2, 'minutes').format("HH:mm");
	console.log(nextArrival);








	// diffTime = moment().diff(moment(startTimeValue), "minutes");
	// console.log ("Difference in Time: " + diffTime);
	// console.log (startTimeValue);

	

	$("#output").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + 
		childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency +
		"</td><td>" + nextArrival + "</td><td>" + minutesAway2 + "</td></tr>");

	}, function(errorObject) {
		console.log("This read failed: " + errorObject.code);
	});