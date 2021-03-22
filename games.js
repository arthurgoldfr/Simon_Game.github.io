var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 1;
var started = false;
var j = 1;
$(document).keypress(function () {
  if (started === false){
    nextSequence();
    started = true;
  }

});



$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  $("#"+ userChosenColor).fadeOut(100).fadeIn(100);
  var goodAnswer = checkAnswer(userChosenColor,gamePattern,j);
  console.log(goodAnswer);
  if (goodAnswer){
    playSound(userChosenColor);
    if (j==gamePattern.length-1) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      level++;
      gamePattern=[];
    }
    else {
        j++;
      }
    }
  else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
});


function nextSequence() {
  $("h1").text("Level " + level);
  for (let i = 0; i < level; i++){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    setTimeout(function(){
      $("#"+ gamePattern[i]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, 800*(i+1));
  }
j=0;
}

function playSound(name){
  var sound = new Audio("sounds/" + name +".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#currentColor").addClass("pressed");
  setTimeout(function () {
    $("#currentColor").removeClass("pressed");
  }, 100);
}

function checkAnswer(userChosenColor, gamePattern, j){
  return (userChosenColor == gamePattern[j]);
}
function startOver() {
  started = false;
  gamePattern = [];
  level = 1;
  j=1;
}
