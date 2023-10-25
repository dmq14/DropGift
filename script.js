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

let seconds = 31;
let minutes = 1;
let scoreDone;
let runGame;
var soundW = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1165946374148329502/ding-sound-effect_1.mp3?ex=6548b32d&is=65363e2d&hm=feb0a1bbda2f49c9b1e48a208fa328fb7cb1060b266dcdaf98aad399fe9d3ab3&');
var soundL = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1165946873203413092/uh_pjRnSML.mp3?ex=6548b3a4&is=65363ea4&hm=399ad9ab2b3d6154a58df109b9f3f70bd66bd04456459ae9aa3278a7685a639c&');
var soundY = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1165950711452930149/ta-da_yrvBrlS.mp3?ex=6548b737&is=65364237&hm=4fbc1b14c453fe37a90fbdac452f621d2c3a96e44bc549c2353b834493f42b8e&');
var soundT = new Audio('https://cdn.discordapp.com/attachments/991289858150649947/1166240044806320228/fairy-dust-sound-effect.mp3?ex=6549c4ae&is=65374fae&hm=7d40fee555787b21844bcc588b74a1a965a4d6f9cd9589d25edebe0818a6c1bc&');

var isMuted = false;

function soundYeah() {
    if (!isMuted) {
        soundY.currentTime = 0;
        soundY.play();
    }
}
function soundTing() {
    if (!isMuted) {
        soundT.currentTime = 0;
        soundT.play();
    }
}
function soundWin() {
    if (!isMuted) {
        soundW.currentTime = 0;
        soundW.play();
    }
}

function soundLose() {
    if (!isMuted) {
        soundL.currentTime = 0;
        soundL.play();
    }
}

function muteSounds() {
    isMuted = true;
    soundW.muted = true;
    soundL.muted = true;
    soundY.muted = true;
}

function unmuteSounds() {
    isMuted = false;
    soundW.muted = false;
    soundL.muted = false;
    soundY.muted = false;
}
function startTimer() {
    
    if (!timer) {
        setTimeout(1000)
        timer = setInterval(updateTimer, 1000);
        noti();
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        myButton.classList.remove('red-button');
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
    soundTing();
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
    
    if (scoreDone < 20) {
        CodeWin.code = 'SALE-Q100';
        CodeWin.description = 'Mã giảm giá trị 100K';
    } else if (scoreDone >= 20 && scoreDone < 30) {
        CodeWin.code = 'SALE-E200';
        CodeWin.description = 'Mã giảm giá trị 200K';
    } else if (scoreDone >= 30 && scoreDone < 40) {
        CodeWin.code = 'SALE-T300';
        CodeWin.description = 'Mã giảm giá trị 300K';
    } else if (scoreDone >= 40 && scoreDone < 50) {
        CodeWin.code = 'SALE-Y500';
        CodeWin.description = 'Mã giảm giá trị 500K';
    } else if (scoreDone >= 60 && scoreDone < 70) {
        CodeWin.code = 'SALE-P600';
        CodeWin.description = 'Mã giảm giá trị 600K';
    } else if (scoreDone >= 70 && scoreDone < 80) {
        CodeWin.code = 'SALE-M800';
        CodeWin.description = 'Mã giảm giá trị 800K';
    } else if (scoreDone >= 80 && scoreDone < 90) {
        CodeWin.code = 'SALE-B900';
        CodeWin.description = 'Mã giảm giá trị 900K';
    } else if (scoreDone >= 100) {
        CodeWin.code = 'SALE-M1M';
        CodeWin.description = 'Mã giảm giá trị 1 triệu đồng';
    } else {
        CodeWin.code = 'SALE-CD34';
        CodeWin.description = 'Mã giảm giá trị 100K';
    }
    return CodeWin;
}

function refresh(){
    stopTimer();
    minutes=1;
    seconds=31;
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
function noti(){
    notification.innerHTML = `         <div class=" mt-6">
    <div class="alert alert-success" role="alert">
      Thời gian bắt đầu!
    </div>
  </div>`;
    setTimeout(() => {
        notification.style.opacity = 0;
        notification.classList.add('hidden');
    }, 3000);
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
        clearInterval(runGame); 
    }
}

function dropBox() {
    if (!stopDropBox) {
        var length = random(7, ($(".game").width() - 100));
        var velocity = random(800, 8000);
        var size = random(40, 100);
        var thisBox = $("<div/>", {
            class: "box",
            style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
        });

        var randomType = random(0, 9);
        if (randomType < 5) {
            var randomGiftIndex = random(0, Gift.length - 1);
            thisBox.css({ "background": "url('" + Gift[randomGiftIndex].img + "')", "background-size": "contain" });
        } else {
            var randomDangerIndex = random(0, Danger.length - 1);
            thisBox.css({ "background": "url('" + Danger[randomDangerIndex].img + "')", "background-size": "contain" });
        }

        thisBox.data("test", Math.round(Math.random()));
        
        $(".game").append(thisBox);

        setTimeout(function () {
            thisBox.addClass("move");
        }, random(0, 5000));

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
    document.getElementById('success').innerHTML = `${CodeWin.description}.`;
    document.getElementById('coupon').innerHTML = `${CodeWin.code}`;
    $('#resultModal').modal('hide');
    $('#modalSuccess').modal('show');
});



$("#myButton").on("click", function() {

    gameStart();
});
$("#choilai").on("click", function() {
    $('#resultModal').modal('hide');
    refresh();
});

var isMuted = false;
var audios = document.getElementsByTagName('audio');
var videos = document.getElementsByTagName('video');

var muteButton = document.getElementById('muteButton');
muteButton.addEventListener('click', function() {
    if (!isMuted) {
        Array.from(audios).forEach(function(audio) {
            audio.muted = true;
        });
        Array.from(videos).forEach(function(video) {
            video.muted = true;
        });
        isMuted = true;
        speakerIcon.classList.remove('fa-volume-up');
        speakerIcon.classList.add('fa-volume-off');
        // muteButton.innerHTML = 'Unmute Site';
    } else {
        Array.from(audios).forEach(function(audio) {
            audio.muted = false;
        });
        Array.from(videos).forEach(function(video) {
            video.muted = false;
        });
        isMuted = false;
        speakerIcon.classList.remove('fa-volume-off');
        speakerIcon.classList.add('fa-volume-up');
        // muteButton.innerHTML = 'Mute Site';
    }
});



function treasureHunt() {
  var img = document.getElementById("close");
  var lock = document.getElementById("lock");
  var hiddenContainer = document.getElementById("hiddenContainer");

  img.classList.add("rotate");
  lock.innerHTML = "The Treasure Is Opening";

  setTimeout(function() {
    img.style.display = "none";
    lock.innerHTML = "The Treasure Is Open";
    hiddenContainer.style.display = "block";
    showConfetti();
  }, 3000); // 3 seconds for the animation before showing the coupon
}