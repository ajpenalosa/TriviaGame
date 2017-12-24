$(document).ready(function() {

    var audio = new Audio("assets/audio/theme-song.mp3");
    audio.play();

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var questionNumber = 0;

    var lastQuestion = 10;

    var correctAnswerHolder;

    // Timer
    var timeSetting = 30; // Amount of time for each question
    var timeOut = 1000 * 5; // Amount of time between questions

    var intervalId;
    var timerRunning = false;

    var timedOut = false;
    var isCorrect = false;

    // Creating reference to .questions-wrapper
    var questionsWrapper = $(".questions-wrapper");

    // Questions

    var questions = [
        {
            // Question 1
            question: "What is Doc's dog's name?",
            correctAnswer: "Einstein",
            optionB: "Darwin",
            optionC: "Edison",
            optionD: "Newton",
            image: "einstein.jpg"
        },
        {
            // Question 2
            question: "How many gigawatts does the DeLorean need to make time travel possible?",
            optionA: "1.41",
            correctAnswer: "1.21",
            optionC: "1.31",
            optionD: "1.51",
            image: "gigawatts.jpg"
        },
        {
            // Question 3
            question: "Who was originally cast as Marty McFly before Michael J. Fox was recast?",
            optionA: "John Cusack",
            optionB: "Rob Lowe",
            correctAnswer: "Eric Stoltz",
            optionD: "Matthew Broderick",
            image: "eric-stoltz.jpg"
        },
        {
            // Question 4
            question: "What kind of fuel does the DeLorean time machine use?",
            optionA: "Kerosene",
            correctAnswer: "Plutonium",
            optionC: "Diesel",
            optionD: "Uranium",
            image: "plutonium.jpg"
        },
        {
            // Question 5
            question: "What time is it when lightning strikes the clock tower?",
            correctAnswer: "10:04 PM",
            optionB: "10:01 PM",
            optionC: "10:05 PM",
            optionD: "10:11 PM",
            image: "clock-tower.jpg"
        },
        {
            // Question 6
            question: "Finish the line: \"I guess you guys aren't ready for that yet...\"",
            correctAnswer: "But your kids are gonna love it.",
            optionB: "But you will be someday.",
            optionC: "But that's cool.",
            optionD: "But you'll get there.",
            image: "but-your-kids-are-gonna-love-it.jpg"
        },
        {
            // Question 7
            question: "What is Marty's band called?",
            optionA: "The Hammers",
            correctAnswer: "The Pinheads",
            optionC: "The Pee Wees",
            optionD: "Johnny B. Goode",
            image: "the-pinheads.jpg"
        },
        {
            // Question 8
            question: "What name did Marty go by in 1955?",
            correctAnswer: "Calvin Klein",
            optionB: "Hugo Boss",
            optionC: "John Kennedy",
            optionD: "Tom Cruise",
            image: "calvin-klein.jpg"
        },
        {
            // Question 9
            question: "Finish the line: \"Why don't you make like a tree and...\"",
            optionA: "Blow in the wind.",
            optionB: "Leave.",
            optionC: "Fall down.",
            correctAnswer: "Get out of here.",
            image: "get-out-of-here.jpg"
        },
        {
            // Question 10
            question: "What is Marty's girlfriend's name?",
            optionA: "Marilyn",
            optionB: "Allison",
            correctAnswer: "Jennifer",
            optionD: "Anna",
            image: "jennifer.jpg"
        },
        {
            // Question 11
            question: "Doc Brown's clocks are all set back by how much time?",
            optionA: "30 minutes",
            optionB: "1 hour",
            optionC: "45 minutes",
            correctAnswer: "25 minutes",
            image: "docs-clocks.jpg"
        },
        {
            // Question 12
            question: "What is the name of the high school dance where much of the film's action takes place?",
            correctAnswer: "Enchantment Under the Sea",
            optionB: "Casino Royale",
            optionC: "Sock Hop Boogie",
            optionD: "Starry Night",
            image: "enchantment-under-the-sea.jpg"
        },
        {
            // Question 13
            question: "What street does Doc live on in 1955?",
            optionA: "Linda Vista Dr.",
            correctAnswer: "Riverside Dr.",
            optionC: "Oak Glen Rd.",
            optionD: "Blossom Way",
            image: "docs-house.jpg"
        },
        {
            // Question 14
            question: "What speed does the DeLorean have to hit in order to time travel?",
            optionA: "89 mph",
            optionB: "87 mph",
            correctAnswer: "88 mph",
            optionD: "86 mph",
            image: "88mph.jpg"
        },
        {
            // Question 15
            question: "What is the name of the comic book Mr. Peabody's son is holding when they find the Delorean?",
            optionA: "Dennis the Menace",
            optionB: "Archie",
            optionC: "Batman and Robin",
            correctAnswer: "Tales From Space",
            image: "tales-from-space.jpg"
        },
        {
            // Question 16
            question: "What song is playing when Marty first arrives in 1955?",
            optionA: "\"Tutti Frutti\" - by Little Richard",
            correctAnswer: "\"Mr. Sandman\" - by The Chordettes",
            optionC: "\"Only You\" - by Platters",
            optionD: "\"Ko Ko Mo\" - by Perry Como",
            image: "mr-sandman.jpg"
        },
        {
            // Question 17
            question: "Where does Doc first show Marty his time machine in action?",
            correctAnswer: "Twin Pines Mall",
            optionB: "High School Parking Lot",
            optionC: "In His Backyard",
            optionD: "Under the Clock Tower",
            image: "twin-pines-mall.jpg"
        },
        {
            // Question 18
            question: "Doc steals the fuel to run the time machine from terrorists from what country?",
            optionA: "China",
            optionB: "Iran",
            correctAnswer: "Libya",
            optionD: "Saudi Arabia",
            image: "libyans.jpg"
        },
        {
            // Question 19
            question: "What planet does Marty say he's from when he visits George as Darth Vader?",
            optionA: "Mars",
            optionB: "Krypton",
            correctAnswer: "Vulcan",
            optionD: "Saturn",
            image: "vulcan.jpg"
        },
        {
            // Question 20
            question: "When Marty McFly returns to 1985 what's different about Twin Pines Mall?",
            optionA: "The JC Penny is closed",
            optionB: "There's a Target instead of a JC Penny",
            optionC: "It's not there",
            correctAnswer: "The sign says \"Lone Pine Mall\"",
            image: "lone-pine-mall.jpg"
        }
    ];

    // Intro Animation

    var logoBack = $(".back");
    var logoToTheFuture = $(".to-the-future");
    var logoTrivia = $(".trivia");

    var gameWrapper = $(".game-wrapper");
    var startButton = $(".start-button");
    var skipIntroButton = $(".skip-intro");

    setTimeout(logoBackAnimation, 1000 * 5);
    setTimeout(logoToTheFutureAnimation, 1000* 7);
    setTimeout(logoTriviaAnimation, 1000 * 9);

    setTimeout(gameWrapperAnimation, 1000 * 10);

    setTimeout(bodyAnimation, 1000 * 12);
    setTimeout(startButtonAnimation, 1000 * 12);

    // Skip intro button
    skipIntroButton.on("click", function() {

        logoBack.css({
            marginLeft: "-0.7em",
            opacity: "1"
        });

        logoToTheFuture.css({
            opacity: "1"
        });

        logoTrivia.css({
            marginRight: "0.5em",
            opacity: "1"
        });

        gameWrapper.css({
            "background-color": "rgba(0, 0, 0, 0.85)",
            "border-color": "rgba(255, 255, 255, 0.1)"
        });

        startButton.css({
            opacity: "1"
        });

        $("body").css({
            "background-color": "rgba(0, 0, 0, 0)"
        });

        audio.pause();

        $(this).hide();

    });

    // Animates Back
    function logoBackAnimation() {

        logoBack.animate({
            marginLeft: "-0.7em",
            opacity: "1"
        }, 1000);

    };

    // Animates To The Future
    function logoToTheFutureAnimation() {

        logoToTheFuture.animate({
            opacity: "1"
        }, 1000);

    };

    // Animates Trivia
    function logoTriviaAnimation() {

        logoTrivia.animate({
            marginRight: "0.5em",
            opacity: "1"
        }, 500);

    };

    // Animates Game Wrapper
    function gameWrapperAnimation() {

        gameWrapper.animate({
            "background-color": "rgba(0, 0, 0, 0.85)",
            "border-color": "rgba(255, 255, 255, 0.1)"
        }, 500);
    };

    // Animates start button
    function startButtonAnimation() {

        startButton.animate({
            opacity: "1"
        }, 500);

        skipIntroButton.hide();
    };

    // Animates body background color
    function bodyAnimation() {

        $("body").animate({
            "background-color": "rgba(0, 0, 0, 0)"
        }, 500);
    }

    // Starts a new game
    function newGame() {

        // Resets game
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        questionNumber = 0;

        // Sorts the questions in random order
        questions.sort(function(a,b){return 0.5 - Math.random()});

        nextQuestion();

    };

    // Timer

    var timer = {

        // Amount of time for each question
        timeRemaining: timeSetting,

        start: function() {

            // Sets the interval if timer is not running
            if (!timerRunning) {
                intervalId = setInterval(timer.count, 1000);
                timerRunning = true;
            }
        },

        stop: function() {
      
            // Clears the timer and resets
            clearInterval(intervalId);
            timerRunning = false;
            timer.timeRemaining = timeSetting;
        },

        count: function() {

            // Subtract one from time remaining
            timer.timeRemaining--;
            $(".timer-display").text(timer.timeRemaining);

            // Go to time out screen once timer reaches 0
            if (timer.timeRemaining === 0) {
                timedOut = true;
                timer.stop();
                outOfTime();
            }
        }
    };

    // Variables for the iterations
    var currentQuestion;
    var questionOption;
    var questionImage;

    function nextQuestion() {

        var timedOut = false;
        var isCorrect = false;

        // Empties the question wrapper for each new question
        $(".questions-wrapper").empty();

        // Creating timer elements
        var timerWrapper = $("<div>").addClass("timer-wrapper").html("<span class='time-remaining'>Time Remaining:</span>");
        var timerDisplay = $("<span>").addClass("timer-display").text(timer.timeRemaining);
    
        // Append and prepend timer elements
        questionsWrapper.prepend(timerWrapper);
        timerWrapper.append(timerDisplay);

        timer.start();
            
        // Variables for the iterations
        var questionItem = 0;

        // Iterates through the properties of each question in the questions array
        for(var questionProperty in questions[questionNumber]) {

            // Variable to hold the contents of each property
            var questionItemContent = questions[questionNumber][questionProperty];

            if ( questionItem === 0 ) {

                // Puts the current question in an H3
                currentQuestion = $("<h3>").text(questionItemContent).addClass("current-question");
    
                // Appends to the questions wrapper
                questionsWrapper.append(currentQuestion);

            }

            else if ( questionItem === 1 ||  questionItem === 2 ||  questionItem === 3 ||  questionItem === 4 ) {

                // Puts the question options in anchor tags
                questionOption = $("<a>").text(questionItemContent).addClass("question-option " + questionProperty).attr("value", questionProperty);
    
                // Appends to the questions wrapper
                questionsWrapper.append(questionOption);

            }

            else if ( questionItem === 5 ) {

                // Creates the image for the question
                questionImage = $("<img>").attr("src", "assets/images/" + questionItemContent).addClass("img-responsive");

            }

            questionItem++;

          }

          // Putting the correct answer into a variable
          correctAnswerHolder = $(".correctAnswer").text();

    };

    function answerReveal() {

        if (isCorrect) {

            // Clears the screen
            $(".questions-wrapper").empty();

            // Creating out of time messages
            var message = $("<div>").addClass("message").text("Correct!");
            var correctMessageDiv = $("<div>").addClass("correct-message").text("You answered:");
            var correctAnswerDiv = $("<div>").addClass("correct-answer").text(correctAnswerHolder);
        
            // Append and prepend messages
            questionsWrapper.append(message);
            questionsWrapper.append(correctMessageDiv);
            questionsWrapper.append(correctAnswerDiv);

            // Appends image to the questions wrapper
            questionsWrapper.append(questionImage);

            if ( questionNumber === lastQuestion ) {
                // Go to game over if last question
                setTimeout(gameOver, timeOut);
            }
            else {
                // Otherwise, move to next question
                setTimeout(nextQuestion, timeOut);
            }

        } 
        
        else {

            // Clears the screen
            $(".questions-wrapper").empty();

            // Creating messages
            var message = $("<div>").addClass("message").text("Sorry!");
            var correctMessageDiv = $("<div>").addClass("correct-message").text("The correct answer was:");
            var correctAnswerDiv = $("<div>").addClass("correct-answer").text(correctAnswerHolder);
        
            // Append and prepend messages
            questionsWrapper.append(message);
            questionsWrapper.append(correctMessageDiv);
            questionsWrapper.append(correctAnswerDiv);

            // Appends image to the questions wrapper
            questionsWrapper.append(questionImage);

            if ( questionNumber === lastQuestion ) {
                // Go to game over if last question
                setTimeout(gameOver, timeOut);
            }
            else {
                // Otherwise, move to next question
                setTimeout(nextQuestion, timeOut);
            }

        }
    };

    function outOfTime() {

        // Adds 1 to unanswered score
        unanswered++;

        // Adds 1 to the question number
        questionNumber++;

        // Clears the screen
        $(".questions-wrapper").empty();

        // Creating messages
        var message = $("<div>").addClass("message").text("Out of Time!");
        var correctMessageDiv = $("<div>").addClass("correct-message").text("Sorry, the correct answer was:");
        var correctAnswerDiv = $("<div>").addClass("correct-answer").text(correctAnswerHolder);
    
        // Append messages
        questionsWrapper.append(message);
        questionsWrapper.append(correctMessageDiv);
        questionsWrapper.append(correctAnswerDiv);

        // Appends image to the questions wrapper
        questionsWrapper.append(questionImage);

        if ( questionNumber === lastQuestion ) {
            // Go to game over if last question
            setTimeout(gameOver, timeOut);
        }
        else {
            // Otherwise, move to next question
            setTimeout(nextQuestion, timeOut);
        }
        
    };

    function gameOver() {

        // Clears the screen
        $(".questions-wrapper").empty();

        // Creating messages
        var message = $("<div>").addClass("message").text("Here are your results!");
        var correctDiv = $("<div>").addClass("correct-answer").text("Correct Answers: " + correctAnswers);
        var incorrectDiv = $("<div>").addClass("correct-answer").text("Incorrect Answers: " + incorrectAnswers);
        var unansweredDiv = $("<div>").addClass("correct-answer").text("Unanswered: " + unanswered);

        // Creating Play Again button
        var playButton = $("<a>").addClass("btn btn-primary start-button").text("Play Again").css({opacity: "1"});
    
        // Append messages
        questionsWrapper.append(message);
        questionsWrapper.append(correctDiv);
        questionsWrapper.append(incorrectDiv);
        questionsWrapper.append(unansweredDiv);
        questionsWrapper.append(playButton);

    };

    // Creating on click function to start game and hides button
    $(".questions-wrapper").on("click", ".start-button", function() {
        $(this).hide();
        audio.pause();
        newGame();
    });
    
    // Creating on click function for question options
    $(".questions-wrapper").on("click", ".question-option", function() {

        // Grabs the value in the value attribute
        var chosenAnswer = $(this).attr("value");

        // If correct answer was chosen
        if (chosenAnswer === "correctAnswer") {
            isCorrect = true;
            correctAnswers++;
            questionNumber++;
            timer.stop();
            answerReveal();
        }

        // If wrong answer was chosen
        else {
            isCorrect = false;
            incorrectAnswers++;
            questionNumber++;
            timer.stop();
            answerReveal();
        }

        console.log("Number of correct answers: " + correctAnswers);
        console.log("Number of incorrect answers: " + incorrectAnswers);
        console.log("Number of unanswered: " + unanswered);
        console.log(chosenAnswer);
        
    });
});