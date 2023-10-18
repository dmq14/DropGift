var score = 0;
var color = "blue";
var set = 3;
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

const Gift = [
    {
        id: 1,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164136005268422656/1.png?ex=65421d24&is=652fa824&hm=845cace8de306d40e378794d9a3a675c89c75d5e4e89fbd56e83e3c64b11fe74&',
    },
    {
        id: 2,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164136005608149043/2.png?ex=65421d24&is=652fa824&hm=88e0fbc85f025cf1eb573bf02fb924c4863c40f77b37312b93827e89170f5a7d&'
    },
    {
        id: 3,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164136006384107531/3.png?ex=65421d24&is=652fa824&hm=51687e0f88c306da08970a419920b9800841f617932215ce09cc52bd19f2058b&'
    }
];

const Danger= [
    {
        id: 1,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164136007508168755/5.png?ex=65421d24&is=652fa824&hm=e361bc1e4ea947890ef223cc820e5f4e7d114b8162e90baa92a0b9ddf17d8ee0&',
    },
    {
        id: 2,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164136007130689556/4.png?ex=65421d24&is=652fa824&hm=2cb1ddeae1209cc31b45339eaf0a103f9fcc7425c4b3a7489901afb4d08a4b9e&'
    }
];
var stopDropBox = false;
let timer;

let seconds = 6;
let minutes = 0;
let secondsDone;
let minutesDone;
function startTimer() {
    
    if (!timer) {
        setTimeout(1000)
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}


function updateTimer() {
    if (minutes > 0 || seconds > 0) {
        if (seconds === 0) {
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }
        if (minutes === 0 && seconds === 0){
            displayResultModal();
            stopTimer();
        }
        const timerDisplay = document.getElementById("timer");
        timerDisplay.textContent = `Thời gian: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function displayResultModal() {
    let modalTitle = document.getElementById('modalTitle');
    let modalContent = document.getElementById('modalContent');
    modalTitle.innerHTML = 'Kết quả';
    modalContent.innerHTML = ` Điểm của bạn: ${score}`;
    refresh();

    $('#resultModal').modal('show');
}

function refresh(){
    stopTimer();
    minutes=3;
    seconds=1;
    updateTimer();
    score = 0;
    $(".score").html(score);
    var counter = document.getElementById("counter");
    stopDropBox = true;
    myButton.innerHTML = 'Start';

}

window.onload = function () {
    updateTimer();
};


function setBG() {
    if (Math.round(Math.random())) {
        return Danger[0].img;
    } else {
        return Danger[1].img;
    }
}
function start() {
    var button = document.getElementById('myButton');
    if (button.innerHTML === 'Start') {
        button.innerHTML = 'Dừng';
        stopDropBox = false;
        startTimer();
    } else {
        button.innerHTML = 'Start';
        stopDropBox = true;
        refresh();
    }
}
function dropBox() {
    if (!stopDropBox) {
    var length = random(10, ($(".game").width() - 100));
    var velocity = random(850, 10050);
    var size = random(50, 120);
    var thisBox = $("<div/>", {
        class: "box",
        style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
    });

    //set data and bg based on data
    thisBox.data("test", Math.round(Math.random()));
    var randomGiftIndex = random(0, Gift.length - 1);
    var randomDangerIndex = random(0, Danger.length - 1);
    if (thisBox.data("test")) {
        thisBox.css({ "background": "url('" + Gift[randomGiftIndex].img + "')", "background-size": "contain" });
    } else {
        thisBox.css({ "background": "url('" + Danger[randomDangerIndex].img + "')", "background-size": "contain" });
    }

    //insert gift element
     $(".game").append(thisBox);


    //random start for animation
    setTimeout(function () {
        thisBox.addClass("move");
    }, random(0, 5000));

    //remove this object when animation is over
    thisBox.one("webkitTransitionEnd ontransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
            $(this).remove();
        });
    }

}


$(document).on('click', '.box', function () {
    if ($(this).data("test")) {
        score += 1;
    } else {
        score -= 1;
    }

    $(".score").html(score);
    $(this).remove();
});

function gameStart(){

    dropBox();
    var runGame = setInterval(function () {
        for (i = 0; i < 5; i++) {
            dropBox();
       }
    }, 2000);

}



$("#myButton").on("click", function() {

    gameStart();
});