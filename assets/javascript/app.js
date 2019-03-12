$("#start").on("click", function () {
    game.start();
})

$(document).on("click", "#end", function () {
    game.done();
})

var questions = [{
    question: "What is the title of the first Harry Potter?",
    answers: ["Harry Potter and the Deathly Hallows", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Half-Blood Prince", "Harry Potter and the Sorcerer's Stone"],
    correctAnswer: "Harry Potter and the Sorcerer's Stone",
},
{
    question: "Who is narrating the story in The Kingkiller Chronicles?",
    answers: ["Bast", "Kwothe", "Chronicler", "Denna"],
    correctAnswer: "Kwothe",
},
{
    question: "Who is the main charchter in The Hunger Games?",
    answers: ["Katniss", "Prim", "Peta", "Gale"],
    correctAnswer: "Katniss",
},
{
    question: "Who is the author of Animal Farm?",
    answers: ["J.K Rowling", "Shel Silverstein", "George Orwell", "Jane Austen"],
    correctAnswer: "George Orwell",
},
{
    question: "Which book takes place in outer space?",
    answers: ["Lord of the Flies", "The Giving Tree", "Twilight", "Ender's Game"],
    correctAnswer: "Ender's Game",
},
{
    question: "What book did J.R.R. Tolkien write",
    answers: ["Pride and Prejudice", "Lord of the Rings", "To Kill a Mockingbird", "Gone with the Wind"],
    correctAnswer: "Lord of the Rings",
}];

var game = {
    correct: 0,
    incorrect: 0,
    counter: 120,
    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            console.log("Time is up!");
            game.done();
        }
    },
    start: function () {
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").prepend("<h2>Time Remaining: <span id='counter'>120</span> Seconds</h2>");
        $("#start").remove();
        for (var i = 0; i < questions.length; i++) {
            $("#subwrapper").append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                $("#subwrapper").append("<input type = 'radio' name = 'question-" + i + " 'value='" + questions[i].answers[j] + " '>" + questions[i].answers[j])
            }
        }
        $("#subwrapper").append("<br><button id='end'>DONE</button>");
    },
    done: function () {
        $.each($("input[name='question-0']:checked"), function () {
            if ($(this).val() == questions[0].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }

        });
        $.each($("input[name='question-1']:checked"), function () {
            if ($(this).val() == questions[1].correctAnswer) {
                game.correct++;
            } else {
                game.incorrect++;
            }
        });

        this.result();
    },

    result: function () {
        clearInterval(timer);
        $("#subwrapper h2").remove();

        $("#subwrapper").html("<h2>All Done!</h2>");
        $("#subwrapper").append("<h3>Correct Answers: " + this.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    }
}