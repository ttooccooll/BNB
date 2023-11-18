document.addEventListener("DOMContentLoaded", function () {
    var gameStartModal = document.getElementById("gameStartModal");
    var startGameButton = document.getElementById("startGameButton");

    pauseAnimations();
    startGameButton.addEventListener("click", function () {
        gameStartModal.style.display = "none";
        startGame();
    });
});

function startGame() {
    stopSad()
    playAudio();
    playAudioLizzy()
    resumeAnimations();
    playAudioWalk()
    counter = 0;
    gameStartModal.style.display = "none";
}

var character = document.getElementById("character");
var block = document.getElementById("block");
var saxy = document.getElementById("saxy");
var lizzy = document.getElementById("lizzy");
var pigeon = document.getElementById("pigeon");
var counter = 0;
var audio;
var isJumping = false;
var isSpace = false;
var isSpaceAnimating = false;
var jumpTimeout;
var leapTimeout;


document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
        if (!isSpace) {
            jump();
            leap();
        }
    }
    if (event.keyCode === 13) {
        leap();
    }
    if (event.keyCode === 16) {
        closeModal();
    }
    if (event.keyCode === 66) {
        startGame();
    }
});

function playAudio() {
    var audio = document.getElementById("backgroundMusic");
    audio.play();
}

function stopAudio() {
    var audio = document.getElementById("backgroundMusic");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

var audioWalk = new Audio("./public/walk.m4a");

function playAudioWalk() {
    audioWalk.play();
}

function stopAudioWalk() {
    audioWalk.pause();
}

var audioJump = new Audio("./public/Jump.m4a");

function playAudioJump() {
    audioJump.play();
}

var audioLeap = new Audio("./public/Leap.m4a");

function playAudioLeap() {
    audioLeap.play();
}

var audioLaugh = new Audio("./public/Party.mp3");

function playAudioLaugh() {
    audioLaugh.play();
}

var audioSax = new Audio("./public/SAX.mp3");

function playAudioSax() {
    audioSax.play();
}

var audioLizzy = new Audio("./public/Explode.mp3");

function playAudioLizzy() {
    audioLizzy.play();
}

var audioNom = new Audio("./public/nom.m4a");

function playAudioNom() {
    audioNom.play();
}

function playSad() {
    var audio = document.getElementById("sadMusic");
    audio.play();
}

function stopSad() {
    var audio = document.getElementById("sadMusic");
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

function jump() {
    if (character.classList == "animate" || isSpace) {
        return;
    }
    isJumping = true;
    character.classList.remove("normal");
    stopAudioWalk()
    playAudioJump();
    character.classList.add("animate");
    jumpTimeout = setTimeout(function () {
        character.classList.remove("animate");
        isJumping = false;
        character.classList.add("normal");
        playAudioWalk()
    }, 900);
}

function leap() {
    if (character.classList == "animater" || isJumping || isSpace) {
        return;
    }
    character.classList.remove("normal");
    stopAudioWalk()
    playAudioLeap();
    character.classList.add("animater");
    leapTimeout = setTimeout(function () {
        character.classList.remove("animater");
        character.classList.add("normal");
        playAudioWalk()
    }, 2200);
}

var animationsPaused = false;

function pauseAnimations() {
    animationsPaused = true;
    block.style.animation = "none";
    saxy.style.animation = "none";
    lizzy.style.animation = "none";
    pigeon.style.animation = "none";
}

function resumeAnimations() {
    animationsPaused = false;
    block.style.animation = "block 3s infinite linear";
    saxy.style.animation = "saxy 7.5s infinite linear";
    lizzy.style.animation = "fire .5s infinite linear, lizzy 20.5s infinite linear";
    pigeon.style.animation = "pigeon 23.9s infinite linear";
}

function gameOverModal(score) {
    clearInterval(checkDead);
    clearInterval(checkToppled);
    clearInterval(checkWarrened);
    pauseAnimations();
    stopAudioWalk()
    var modal = document.getElementById("gameOverModal");
    var modalText = document.getElementById("modalText");
    console.log("modalText:", modalText);
    if (modalText) {
        modalText.innerHTML = score;
    } else {
        console.error("Element with ID 'modalText' not found");
    }
    modal.style.display = "block";
}

function closeModal() {
        window.location.reload(true);
}

function updateScore() {
    counter += 1;
    document.getElementById("scoreSpan").innerHTML = counter;
}

var scoreInterval = setInterval(updateScore, 1000);

    checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < 130 && blockLeft > -60 && characterTop >= 180) {
        pauseAnimations();
        stopAudio();
        playAudioLaugh()
        playSad();
        block.style.animation = "none";
        gameOverModal("You've been eaten by a roving bachelorette party. Hit shift to play again. Score: " + counter);
        counter = 0;
        block.style.animation = "block 3s infinite linear";
    } else {
        updateScore();
    }
}, 10);

    checkToppled = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let saxyLeft = parseInt(window.getComputedStyle(saxy).getPropertyValue("left"));
    if (saxyLeft < 110 && saxyLeft > -30 && characterTop >= 180) {
        pauseAnimations();
        stopAudio();
        playAudioSax()
        playSad();
        saxy.style.animation = "none";
        gameOverModal("Never get in front of a horn player late for his gig. Hit shift to play again. Score: " + counter);
        counter = 0;
        saxy.style.animation = "saxy 7.5s infinite linear";
    } else {
        updateScore();
    }
}, 10);

checkWarrened = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let lizzyLeft = parseInt(window.getComputedStyle(lizzy).getPropertyValue("left"));
    if (lizzyLeft < 110 && lizzyLeft > -20 && characterTop <= 100) {
        pauseAnimations();
        stopAudio();
        playAudioLizzy()
        playSad();
        lizzy.style.animation = "none";
        gameOverModal("Unlike real bitcoin, you are highly stoppable. Score: " + counter);
        counter = 0;
        lizzy.style.animation = "lizzy 20.5s infinite linear";
    } else {
        updateScore();
    }
}, 10);

let checkPigeon = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let PigeonLeft = parseInt(window.getComputedStyle(pigeon).getPropertyValue("left"));        

    if (PigeonLeft < 110 && PigeonLeft > -40 && characterTop <= 120 && !isSpaceAnimating) {
        isSpaceAnimating = true;
        pigeon.style.animation = "none";
        isJumping = false;
        isSpace = true;
        playAudioNom()
        clearTimeout(jumpTimeout);
        clearTimeout(leapTimeout);
        character.classList.remove("normal");
        character.classList.remove("animate");
        character.classList.remove("animater");
        character.classList.add("space");
        setTimeout(function(){
            character.classList.remove("space");
            isSpace = false;
            isSpaceAnimating = false;
            character.classList.add("normal");
        }, 3500);
    } else {
        updateScore();
    }
}, 10);