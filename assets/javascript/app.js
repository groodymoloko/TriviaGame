// this is the jquery scripting for Arizona Trivia Game

// load document before starting javascript           
$(document).ready(function() {

    // declare initial variables
    var clock;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var noAnswers = 0;
    var questionInterval = 10;
    var timer = 10;
    var timerStarted = false;
    var currentQuestion = 0;
    var newQuestion;
    var timerId = '';
    var currentAnswer;

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
        },
        {
            question: "The London Bridge now resides where?",
            choices: ["Lake Roosevelt", "Lake Havasu", "Colorado River", "Lake Powell"],
            answer: 2,
            tidbit: "The bridge was moved stone by stone from Europe"
        },
        {
            question: "The population of Arizona is . . .",
            choices: ["3 million", "5 million", "7 million", "9 million"],
            answer: 3,
            tidbit: "In 1900, Arizona only had 122,000 people"
        },
        {
            question: "The highest point in the state is . . .",
            choices: ["Agazziz Peak", "Mount Baldy", "Mount Humphreys", "Mount Ord"],
            answer: 3,
            tidbit: "Humphreys soars to 12,633 feet above sea level outside Flagstaff"
        },
        {
            question: "Arizona has the most species of what?",
            choices: ["Hummingbirds", "Snakes", "Scorpions", "Bees"],
            answer: 1,
            tidbit: "There are more than 300 different types of hummingbirds that call Arizona home"
        },
        {
            question: "In Arizona, this is illegal:",
            choices: ["Walking a snake on a leash", "Parking your horse without a permit", "Women wearing pants on Sundays", "Donkeys sleeping in bathtubs"],
            answer: 4,
            tidbit: "Makes complete sense doesn't it?"
        },
        {
            question: "Arizona is roughhly the size of . . .",
            choices: ["The UK", "Italy", "Bulgaria", "Netherlands"],
            answer: 2,
            tidbit: "The state is 113,998 square miles"
        },
        {
            question: "Arizona lays claims to . . .",
            choices: ["America's first barrel of tequila", "Best preserved meteor crater in the world", "World's oldest rodeo", "All of the above"],
            answer: 4,
            tidbit: "Arizona is indeed a badass place to live"
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
    
     //start or reset the game
    function startGame() {
        
        $(".btn").css('visibility', 'hidden');

        //reset variables
        correctAnswers = 0;
        incorrectAnswers = 0;
        noAnswers = 0;
        timer = 3;
        currentQuestion = 0;
        clearInterval(timerId);
        nextQuestion();
        $('#level').empty();
        $('.clock').css('visibility', 'visible');
        $('#answerTitle').html('Select an answer');
    }

    //launch the next question in the array
    function nextQuestion() {  
        
        if (!timerStarted) {
            timerId = setInterval(clockStarted, 1000);
        }
        
        if (currentQuestion < questions.length) {
            timer = 13;
            clock.setTime(15);

            clock.start();
            $('#questionNumber').html('Question No. ' + (currentQuestion + 1));
            $('#currentQuestion').html(questions[currentQuestion].question);
            $('#1').html(questions[currentQuestion].choices[0]);
            $('#2').html(questions[currentQuestion].choices[1]);
            $('#3').html(questions[currentQuestion].choices[2]);
            $('#4').html(questions[currentQuestion].choices[3]);
         }
    }

    //the meat and potatos logic
    function clockStarted() {
        if (timer > -1 && currentQuestion < questions.length) {
            timer--;
        }
        else if (timer === -1) {
            noAnswers++;
            result = false;
            clearInterval(timerId);
            resultId = setTimeout(questionResult, 3000);
            $('#currentQuestion').html("Sorry, you are out of time!");
            $('.choice').empty();
            currentAnswer = questions[currentQuestion].choices[questions[currentQuestion].answer - 1];
            $('#1').html("The correct answer was " + currentAnswer);
            $('#2').empty();
            $('#3').empty();
            $('#4').empty();
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
            $('.clock').css('visibility', 'hidden');

            if (correctAnswers >= 8) {
            $('#level').html('You are an AZ master! Nice work.');
            } else {
                $('#level').html('You are an AZ novice! Keep studying.');
            }

            clearInterval(timerId);

        }
    }

    //see if the user picked a correct answer or not
    function questionCompare() {
        var resultId;
    
        if (userChoice == questions[currentQuestion].answer) {
            correctAnswers++;
            clearInterval(timerId);
            resultId = setTimeout(questionResult, 3000);
            $('#currentQuestion').html("Correctemundo! " + questions[currentQuestion].tidbit);
            currentAnswer = questions[currentQuestion].choices[questions[currentQuestion].answer - 1];
            $('#1').html("Nice! The answer was indeed " + currentAnswer);
            $('#2').empty();
            $('#3').empty();
            $('#4').empty();
        }
        else {
            incorrectAnswers++;
            clearInterval(timerId);
            resultId = setTimeout(questionResult, 3000);
            $('#currentQuestion').html("Wrong! Try another one!");
            currentAnswer = questions[currentQuestion].choices[questions[currentQuestion].answer -1];
            $('#1').html("The correct answer was " + currentAnswer);
            $('#2').empty();
            $('#3').empty();
            $('#4').empty();
        }
    }

    //main call to iterate the question # and launch the next question
    function questionResult() {
        
            currentQuestion++;
            nextQuestion();
        
    }

});
