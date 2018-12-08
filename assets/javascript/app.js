// this is the jquery scripting for Arizona Trivia Game

// load document before starting javascript           
$(document).ready(function() {

    // declare initial variables
    var clock;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var noAnswers = 0;
    var questionInterval = 3;
    var timer = 3;
    var timerStarted = false;
    var currentQuestion = 0;
    var newQuestion;
    var timerId = '';

    // array of questions
    var questions = [
        {
            question: "What is the third largest city in Arizona?",
            choices: ["Tucson", "Flagstaff", "Phoenix", "Mesa"],
            answer: 4,
            tidbit: "Mesa was once called the most conservative city in the nation"
        },
        {
            question: "What is the Arizona state flower?",
            choices: ["Saguaro", "Mesquite", "Palo Verde", "Agave"],
            answer: 1,
            tidbit: "The saguaro cactus can grow to over 75 feet tall"
        },
        {
            question: "Arizona leads the nation in what?",
            choices: ["Copper", "Citrus", "Cotton", "Cattle"],
            answer: 1,
            tidbit: "The state produces 60% of all copper in the United States"
        }
    ];

    // code for the flip clock (has separate javascript file)
    clock = $('.clock').FlipClock(questionInterval, {
        clockFace: 'MinuteCounter',
        countdown: true,
        autoStart: false,
        callbacks: {
            start: function() {
            },
            stop: function() {
            }
        }
    });
    
    // start game when user clicks start or reset button
     $('.btn').on('click', startGame);
     // launches the comparison of the chosen answer to actual answer
     $('.choice').on('click', function () {
        userChoice = this.id;
        clock.stop();
        questionCompare();
     });
    
    function startGame() {
        $(".btn").css('visibility', 'hidden');
        //reset variables
        correctAnswers = 0;
        incorrectAnswers = 0;
        noAnswers = 0;
        questionInterval = 3;
        timer = 3;
        timerStarted = false;
        currentQuestion = 0;
        timerId = '';
        clearInterval(timerId);
        nextQuestion();
        $('#level').empty();
    }

    function nextQuestion() {  
        timer = 3;
        clock.setTime(4);
        if (!timerStarted) {
            timerId = setInterval(clockStarted, 1000);
        }
        clock.start();
        $('#questionNumber').html('Question No. ' + (currentQuestion + 1));
        $('#currentQuestion').html(questions[currentQuestion].question);
        $('#1').html(questions[currentQuestion].choices[0]);
        $('#2').html(questions[currentQuestion].choices[1]);
        $('#3').html(questions[currentQuestion].choices[2]);
        $('#4').html(questions[currentQuestion].choices[3]);
    }

    function clockStarted() {
        if (timer > -1 && currentQuestion < questions.length) {
            timer--;
            // console.log("time: " + timer);
            // console.log("currentQuestion: " + currentQuestion);
            // console.log("questions.length: " + questions.length);
        }
        else if (timer === -1) {
            noAnswers++;
            result = false;
            clearInterval(timerId);
            resultId = setTimeout(questionResult, 3000);
            $('#currentQuestion').html("Sorry, you are out of time!");
            $('.choice').empty();
            $('#1').html("Placeholder for highlighting correct answer");
        }
        else if (currentQuestion == questions.length) {
            clock.stop();
            $('.btn').css('visibility', 'visible');
            $('.btn').html('Restart!');
            $('#questionNumber').html('No. of correct answers');
            $('#currentQuestion').html(correctAnswers);
            $('#answerTitle').html('No. of wrong answers');
            $('#1').html(incorrectAnswers);
            $('#2').empty();
            $('#3').html("No. unanswered");
            $('#4').html(noAnswers);
            console.log("CurrentQuestion: " + currentQuestion);

            if (correctAnswers >= 8) {
            $('#level').html('You are an AZ master!');
            } else {
                $('#level').html('You are an AZ novice!');
            }

        }
    }

    function questionCompare() {
        var resultId;
    
        if (userChoice == questions[currentQuestion].answer) {
            correctAnswers++;
            clearInterval(timerId);
            resultId = setTimeout(questionResult, 3000);
            $('#currentQuestion').html("Correctemundo! " + questions[currentQuestion].tidbit);
        }
        else {
            incorrectAnswers++;
            clearInterval(timerId);
            resultId = setTimeout(questionResult, 3000);
            $('#currentQuestion').html("Wrong! Try another one!");
        }
    }

    function questionResult() {
        
            currentQuestion++;
            nextQuestion();
        
    }

});
