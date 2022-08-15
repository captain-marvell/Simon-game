
function startOver() {
  level=0;
  gamePattern=[];
  started=false;
}
//3.create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];
//5. create a new empty array called gamePattern.
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// check if any key is pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + " " + level);
    nextSequence();
    started = true;
  }
});

// check wich button is pressed
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }

  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var lost = new Audio("sounds/wrong.mp3");
    lost.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
    }
}

//1.create a new function called nextSequence()
function nextSequence() {
   userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + " " + level);
  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);
  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];
  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  //7. make the random chosen button flash.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // console.log(userClickedPattern);
}

// play sounds
function playSound(name) {
  //8. add the audio file to the chosen button .
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// nextSequence();

// add effect for the user selected button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 0.1)
}
