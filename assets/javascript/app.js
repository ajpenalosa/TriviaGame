$(document).ready(function() {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var questionNumber = 0;

    var correctAnswerHolder;

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
            optionD: "Newton" 
        },
        {
            // Question 2
            question: "How many gigawatts does the DeLorean need to make time travel possible?",
            optionA: "1.41",
            correctAnswer: "1.21",
            optionC: "1.31",
            optionD: "1.51"
        },
        {
            // Question 3
            question: "Who was originally cast as Marty McFly before Michael J. Fox was recast?",
            optionA: "John Cusack",
            optionB: "Rob Lowe",
            correctAnswer: "Eric Stoltz",
            optionD: "Matthew Broderick"
        },
        {
            // Question 4
            question: "What kind of fuel does the DeLorean time machine use?",
            optionA: "Kerosene",
            correctAnswer: "Plutonium",
            optionC: "Diesel",
            optionD: "Uranium"
        },
        {
            // Question 5
            question: "What time is it when lightning strikes the clock tower?",
            correctAnswer: "10:04 PM",
            optionB: "10:01 PM",
            optionC: "10:05 PM",
            optionD: "10:11 PM"
        },
        {
            // Question 6
            question: "Finish the line: \"I guess you guys aren't ready for that yet...\"",
            correctAnswer: "But your kids are gonna love it.",
            optionB: "But you will be someday.",
            optionC: "But that's cool.",
            optionD: "But you'll get there."
        },
        {
            // Question 7
            question: "What is Marty's band called?",
            optionA: "The Hammers",
            correctAnswer: "The Pinheads",
            optionC: "The Pee Wees",
            optionD: "Johnny B. Goode"
        },
        {
            // Question 8
            question: "What name did Marty go by in 1955?",
            correctAnswer: "Calvin Klein",
            optionB: "Hugo Boss",
            optionC: "John Kennedy",
            optionD: "Tom Cruise"
        },
        {
            // Question 9
            question: "Finish the line: \"Why don't you make like a tree and...\"",
            optionA: "Blow in the wind.",
            optionB: "Leave.",
            optionC: "Fall down.",
            correctAnswer: "Get out of here."
        },
        {
            // Question 10
            question: "What is Marty's girlfriend's name?",
            optionA: "Marilyn",
            optionB: "Allison",
            correctAnswer: "Jennifer",
            optionD: "Anna"
        }
    ];

    function newGame() {

        nextQuestion();

    };

    // Timer

    var timeSetting = 5; // Amount of time for each question
    var intervalId;
    var timerRunning = false;

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
                timer.stop();
                timeOut();
            }
        }
    };

    function nextQuestion() {

        // Empties the question wrapper for each new question
        $(".questions-wrapper").empty();

        // Creating timer elements
        var timerWrapper = $("<div>").addClass("timer-wrapper").text("Time Remaining: ");
        var timerDisplay = $("<span>").addClass("timer-display").text(timer.timeRemaining);
    
        // Append and prepend timer elements
        questionsWrapper.prepend(timerWrapper);
        timerWrapper.append(timerDisplay);

        timer.start();
            
        // Variables for the iterations
        var questionItem;
        var isFirstItem = true;

        // Iterates through the properties of each question in the questions array
        for(var questionProperty in questions[questionNumber]) {

            // Variable to hold the contents of each property
            var questionItemContent = questions[questionNumber][questionProperty];

            if (isFirstItem) {
                // Puts first property in a new p element
                questionItem = $("<h3>").text(questionItemContent).addClass("current-question");
                isFirstItem = false;
            }

            else {
                // Puts the rest of the properties in anchor tags
                questionItem = $("<a>").text(questionItemContent).addClass("question-option " + questionProperty).attr("value", questionProperty);
            }
    
            // Appends the p element to the questions wrapper
            questionsWrapper.append(questionItem);

          }

          // Putting the correct answer into a variable
          correctAnswerHolder = $(".correctAnswer").text();
    };

    function timeOut() {

        // Adds 1 to the question number
        questionNumber++;

        // Clears the screen
        $(".questions-wrapper").empty();

        // Creating out of time messsages
        var outOfTimeMessage = $("<div>").addClass("out-of-time").text("Out of Time!");
        var correctAnswerDiv = $("<div>").addClass("correct-answer").text("Sorry, the correct answer was: " + correctAnswerHolder);
    
        // Append and prepend messages
        questionsWrapper.append(outOfTimeMessage);
        questionsWrapper.append(correctAnswerDiv);

        // Screen times out and moves to next question
        setTimeout(nextQuestion, 1000 * 5);
    }

    // Creating on click function to start game and hides button
    $(".start-button").on("click", function() {
        $(this).hide();
        newGame();
    });
    
    // Creating on click function for question options
    $(".questions-wrapper").on("click", ".question-option", function() {

        // Grabs the value in the value attribute
        var chosenAnswer = $(this).attr("value");

        // If correct answer was chosen
        if (chosenAnswer === "correctAnswer") {
            console.log("YOU WIN!!");
            correctAnswers++;
            questionNumber++;
            timer.stop();
            nextQuestion();
        }

        // If wrong answer was chosen
        else {
            console.log("YOU LOSE!!!");
            incorrectAnswers++;
            questionNumber++;
            timer.stop();
            nextQuestion();
        }

        console.log("Number of correct answers: " + correctAnswers);
        console.log("Number of incorrect answers: " + incorrectAnswers);
        console.log(chosenAnswer);
        
    });
});