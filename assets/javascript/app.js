$(document).ready(function() {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var questionNumber = 0;

    var lastQuestion = 10;

    var correctAnswerHolder;

    // Timer
    var timeSetting = 5; // Amount of time for each question
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
        }
    ];

    // Logo Animation

    setTimeout(logoBackAnimation, 1000);
    setTimeout(logoToTheFutureAnimation, 2000);
    setTimeout(logoTriviaAnimation, 3500);

    function logoBackAnimation() {

        $(".back").animate({
            marginLeft: "-0.7em",
            opacity: "1"
        }, 1000);

    };

    function logoToTheFutureAnimation() {

        $(".to-the-future").animate({
            opacity: "1"
        }, 1000);

    };

    function logoTriviaAnimation() {

        $(".trivia").animate({
            marginRight: "0.5em",
            opacity: "1"
        }, 500);

    };

    function newGame() {

        // Resets game
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        questionNumber = 0;

        nextQuestion();

    };

    // Timer

    var timer = {

        timeRemaining: timeSetting, // Amount of time for each question

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

                // Puts the question options in anchor tags
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
        var playButton = $("<a>").addClass("btn btn-primary start-button").text("Play Again");
    
        // Append and prepend messages
        questionsWrapper.append(message);
        questionsWrapper.append(correctDiv);
        questionsWrapper.append(incorrectDiv);
        questionsWrapper.append(unansweredDiv);
        questionsWrapper.append(playButton);

    };

    // Creating on click function to start game and hides button
    $(".questions-wrapper").on("click", ".start-button", function() {
        $(this).hide();
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
        console.log(chosenAnswer);
        
    });
});