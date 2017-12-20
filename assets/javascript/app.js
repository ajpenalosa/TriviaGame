$(document).ready(function() {

    var timeRemaining = 30;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;

    setTimeout(timeUp, 1000 * 30);

    // Questions

    var questions = [
        {
            question: "What is Doc's dog's name?",
            correctAnswer: "Einstein",
            optionB: "Darwin",
            optionC: "Edison",
            optionD: "Newton" 
        },
        {
            question: "How many gigawatts does the DeLorean need to make time travel possible?",
            optionA: "1.41",
            correctAnswer: "1.21",
            optionC: "1.31",
            optionD: "1.51"
        },
        {
            question: "Who was originally cast as Marty McFly before Michael J. Fox was recast?",
            optionA: "John Cusack",
            optionB: "Rob Lowe",
            correctAnswer: "Eric Stoltz",
            optionD: "Matthew Broderick"
        }
    ];

    function timeUp() {

    }

    function newGame() {

        // Creating reference to .questions-wrapper
        var questionsWrapper = $(".questions-wrapper");
            
        // Variables for the iterations
        var questionNumber = 0;
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
                questionItem = $("<a>").text(questionItemContent).addClass("question-option");
            }
    
            // Appends the p element to the questions wrapper
            questionsWrapper.append(questionItem);

            console.log(questionItemContent);

          }
    }

    $(".start-button").on("click", function() {
        $(this).hide();
        newGame();
    });

});