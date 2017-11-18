let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (!answer || !attempt) {
        setHiddenFields();
    }
    if (validateInput(input.value)) {
        attempt++;
    } else {
        return false;
    }

    if (getResults(input.value)) {
        setMessage("You Win! :)")
        showAnswer(true);
        showReplay();
    } else if (attempt >= 10) {
        setMessage("You Lose! :(")
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.")
    }
}

function setHiddenFields() {
    let gen = Math.floor(Math.random()*10000).toString();
    while (gen.length < 4) {
        gen = "0" + gen;
    }

    answer.value = gen;

    attempt.value = 0;
}

function setMessage(msg) {
    let msgDiv = document.getElementById('message');
    msgDiv.innerHTML = msg;
}

function validateInput(input) {
    if (input.length === 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
    }
    return false;
}

function getResults(guess) {
    let correct = 0;
    let results = `<div class="row"><span class="col-md-6">${input}</span><div class="col-md-6">`
    guess.split().forEach(element, i => {
        if (element === answer[i] ) {
            results += `<span class="glyphicon glyphicon-ok"></span>`;
            correct++;
        }
        else if (answer.contains(element) ) results += `<span class="glyphicon glyphicon-transfer"></span>`
        else results += `<span class="glyphicon glyphicon-remove"></span>` 
    });
    results += `</div></div>`;
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results;
    return correct === 4;
}

function showAnswer(win) {
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    code.className += win ? " success" : " failure";
}

function showReplay() {
    let guessing = document.getElementById("guessing-div");
    guessing.style.display = "none";
    let replay = document.getElementById("replay-div");
    replay.style.display = "block";
}