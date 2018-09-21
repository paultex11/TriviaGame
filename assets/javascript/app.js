$(document).ready(function () {
    var options = [
        {
            question: "What does AR, In AR-15 Stand For?", 
            choice: ["Assault Rifle", "ArmaLite Rife", "Aaron Rodgers", "None Of The Above"],
            answer: 1,
            photo: "https://gunnewsdaily.com/wp-content/uploads/2017/06/iconic-ar15-photo-696x464.jpg"
         },
         {
             question: "Can you safely shoot a 5.56 NATO round in a .223-chambered AR-15?", 
            choice: ["No. Increased pressures can occur due to the .223 chamber’s shorter leade/throatNo.", 
            "Yes, but decreased pressure can occur", "No. The two rounds and guns are incompatible with each other", " Yes. There is no risk"],
            answer: 0,
            photo: "https://qph.fs.quoracdn.net/main-qimg-e84204f7faaa82c500a425ec61e851cd-c"
         }, 
         {
             question: "Approximately how many ft.-lbs. of recoil energy does a standard-velocity, .223 Rem/5.56 NATO cartridge loaded with a 55-grain bullet produce in a typical, 7-pound AR-15 rifle?", 
            choice: ["17.5", "8.1", "3.7", "75" ],
            answer: 2,
            photo: "https://gundigest.com/wp-content/uploads/Colt-LE6920MP-USA-Lead.jpg"
        }, 
        {
            question: "Which of the following rifles is NOT an AR-15-style rifle?", 
            choice: ["Yankee Hill Machine 8550 Specter", "Rock River LAR 15", "Keltec RDB", "Daniel Defense MK 18" ],
            answer: 2,
            photo: "https://cdn0.thetruthaboutguns.com/wp-content/uploads/2016/09/20160730_224456_resized_1_1.jpg"
        }, 
        {
            question: "If subsonic, 55-grain loads are fired from a 16-inch rifle barrel, the AR-15’s muzzle energy goes from approximately 1280 ft.lbs. to what?", 
            choice: ["12", "500", "There is no change in muzzle energy", "125" ],
            answer: 3,
            photo: "http://cormactactical.com/image/cache/catalog/product/Ammo/riflerounds2-1000x750.jpg"
        }, 
        {
            question: "What was the first branch of the military to officially purchase AR-15-type rifles?", 
            choice: [" Army", "Air Force", "Navy", "Marines" ],
            answer: 1,
            photo: "https://2static.fjcdn.com/pictures/Chair+force_d767c3_5748340.jpg"
        }, 
        {
            question: "Using a silencer on an AR-15 rifle will change your bullet’s point of impact which way?", 
            choice: ["Downward", "Randomly or perhaps not at all", "To the left and downward", "To the left and upward" ],
            answer: 1,
            photo: "https://i.ytimg.com/vi/DuS9XnY-IRA/maxresdefault.jpg"
        }, 
        {
            question: "An M4 carbine differs from the military’s M16 rifle, which was adapted from the AR-15, in what way?", 
            choice: [" It’s shorter and lighter", "It’s chambered in .7.62 NATO", "It’s the exact same rifle, just coded differently by various military branches", "It’s a fully automatic version" ],
            answer: 0,
            photo: "https://s3-us-west-2.amazonaws.com/usaft/wp-content/uploads/2016/08/12084400/ar-isnt-assault-rifle-768x768-1.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })