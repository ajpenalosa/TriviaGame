$(document).ready(function() {

    var timeRemaining = 30;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;

    setTimeout(timeUp, 1000 * 30);

    // Questions

    var question01 = {
        question: "What is Doc's dog's name?",
        optionA: "Einstein",
        optionB: "Darwin",
        optionC: "Edison",
        optionD: "Newton"
    };

    var question02 = {
        question: "How many gigawatts does the DeLorean need to make time travel possible?",
        optionA: "1.41",
        optionB: "1.21",
        optionC: "1.31",
        optionD: "1.51"
    };

    var question03 = {
        question: "Who was originally cast as Marty McFly before Michael J. Fox was recast?",
        optionA: "John Cusack",
        optionB: "Rob Lowe",
        optionC: "Eric Stoltz",
        optionD: "Matthew Broderick"
    };

    var questions = [question01, question02, question03];

    function timeUp() {

    }

    function newGame() {

        alert("NEW GAME!!!");


    }

    $(".start-button").on("click", function() {
        $(this).hide();
        newGame();
    });

});