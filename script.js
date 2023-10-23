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
let scoreDone;
let runGame;
var soundW = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1165946374148329502/ding-sound-effect_1.mp3?ex=6548b32d&is=65363e2d&hm=feb0a1bbda2f49c9b1e48a208fa328fb7cb1060b266dcdaf98aad399fe9d3ab3&');
var soundL = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1165946873203413092/uh_pjRnSML.mp3?ex=6548b3a4&is=65363ea4&hm=399ad9ab2b3d6154a58df109b9f3f70bd66bd04456459ae9aa3278a7685a639c&');
var soundY = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1165950711452930149/ta-da_yrvBrlS.mp3?ex=6548b737&is=65364237&hm=4fbc1b14c453fe37a90fbdac452f621d2c3a96e44bc549c2353b834493f42b8e&');

function soundYeah() {
    soundY.currentTime = 0;
    soundY.play();
}function soundWin() {
    soundW.currentTime = 0;
    soundW.play();
}
function soundLose() {
    soundL.currentTime = 0;
    soundL.play();
}
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
    scoreDone = score;
    modalContent.innerHTML = ` Điểm của bạn: ${score}`;
    console.log(scoreDone);
    refresh();

    $('#resultModal').modal('show');
}
function checkTime() {
    var CodeWin = {
        code: '',
        description: ''
    };
    console.log(scoreDone);
    if (scoreDone >= 40) {
        CodeWin.code = 'SALE-KL12';
        CodeWin.description = 'Mã giảm giá 300K';
    } else if (scoreDone < 40 && scoreDone >= 30) {
        CodeWin.code = 'SALE-GH78';
        CodeWin.description = 'Mã giảm giá 200K';
    } else {
        CodeWin.code = 'SALE-CD34';
        CodeWin.description = 'Mã giảm giá 100K';
    }
    return CodeWin;
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
        myAudio.play();
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
        myAudio.pause();
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


function copyCouponCode() {
    var couponElement = document.getElementById("coupon");

    var tempInput = document.createElement("input");
    tempInput.value = couponElement.innerText;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand("copy");

    document.body.removeChild(tempInput);

    copyButton.innerHTML = `Đã Sao Chép`;
}
$(document).on('click', '.box', function () {
    if ($(this).data("test")) {
        score += 1;
        soundWin();
    } else {
        score -= 1;
        soundLose();
    }

    $(".score").html(score);
    $(this).remove();
});

function gameStart(){

    dropBox();


}

$("#dataForm").submit(function(e) {
    myAudio.pause();
    soundYeah();
    e.preventDefault();
    var formData = {
        score: score,
        name: $('#name').val(),
        phone: $('#phone').val()
    };

    var CodeWin = checkTime(score);
    document.getElementById('success').innerHTML = `Bạn đã trúng: ${CodeWin.description}.`;
    document.getElementById('coupon').innerHTML = `${CodeWin.code}.`;
    $('#resultModal').modal('hide');
    $('#modalSuccess').modal('show');
});



$("#myButton").on("click", function() {

    gameStart();
});
