var score = 0;
var color = "blue";
var set = 3;
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

const Gift = [
    {
        id: 1,
        img: 'https://media.discordapp.net/attachments/991289858150649947/1164769217875279912/banhchung.png?ex=65446add&is=6531f5dd&hm=679127460ed15692d1fb44bf2b330edd273a888e8ceae7b943a0880edd0d72b8&=&width=625&height=625',
    },
    {
        id: 2,
        img: 'https://media.discordapp.net/attachments/991289858150649947/1164769218290524270/baolixi.png?ex=65446ade&is=6531f5de&hm=d66efd3691d270d8647daa0acc86b2b02da0b4894a566a4768c4a6c36706d941&=&width=625&height=625'
    },
    {
        id: 3,
        img: 'https://media.discordapp.net/attachments/991289858150649947/1164769218571554918/hopqua.png?ex=65446ade&is=6531f5de&hm=f71befd569c7b6284df2d25692bec5caad78c911ff936d2f28d344fd04b015ae&=&width=625&height=625'
    }
];

const Danger= [
    {
        id: 1,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164769218911273100/icongian.png?ex=65446ade&is=6531f5de&hm=2a23c4c1d38bba857a600541e897c0047045a072d092d6eead3b911f2996fb51&',
    },
    {
        id: 2,
        img: 'https://cdn.discordapp.com/attachments/991289858150649947/1164769219196493844/iconkhoc.png?ex=65446ade&is=6531f5de&hm=4357b81176d8f2bbb4c8f9a753705b8aba84d98bf2c0ee9b55155c036b299474&'
    }
];
var stopDropBox = false;
let timer;

let seconds = 1;
let minutes = 1;
let secondsDone;
let minutesDone;
let runGame;

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
    minutes=1;
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
        button.innerHTML = 'Stop';
        stopDropBox = false;
        button.classList.add('red-button');
        score = 0;
    $(".score").html(score);
    var counter = document.getElementById("counter");
        startTimer();
        runGame = setInterval(function () {
            for (i = 0; i < 2; i++) {
                dropBox();
            }
        }, 1000);
    } else {
        button.innerHTML = 'Start';
        stopDropBox = true;
        button.classList.remove('red-button');
        refresh();
        clearInterval(runGame); // Dừng vòng lặp khi bấm dừng
    }
}

function dropBox() {
    if (!stopDropBox) {
    var length = random(8, ($(".game").width() - 100));
    var velocity = random(850, 8000);
    var size = random(40, 100);
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


}



$("#myButton").on("click", function() {

    gameStart();
});