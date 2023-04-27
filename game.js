var level=-1;
var buttonColours = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern = [];

$(document).keypress(function(event){
    if(level===-1){
        nextSequence();
    }
})

function nextSequence(){
    level++;
    $("h1").html("Level "+level);

    var number = Math.random();
    number = number*4;
    number = Math.floor(number);

    var randomChosenColour = buttonColours[number];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

}

function playSound(key){
    var audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}

function reset(){
    gamePattern=[];
    userClickedPattern=[];
    level = -1;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
}

$(".btn").click(function(){
    var userChosenColour = $(this)[0].id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
    if(level==-1) return;

    playSound(userChosenColour);

    if(userClickedPattern.length===gamePattern.length){
        userClickedPattern=[];
        setTimeout(function(){
            nextSequence();
        },1000);
    }
})



function animatePress(currColour){
    $("#"+currColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    for(var i=0;i<currentLevel;i++){
        if(gamePattern[i]!=userClickedPattern[i]) {
            reset();
        }
    }  
}
