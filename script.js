var score = 0;
var color = "blue";

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

const Gift = [
    {
        id: 1,
        img: 'https://dev.khoavang.vn/resources/uploads/baohanh/MemoryGame/banphim-1697509996.png',
    },
    {
        id: 2,
        img: 'https://dev.khoavang.vn/resources/uploads/baohanh/MemoryGame/laptop3-1697510342.png'
    },
    {
        id: 3,
        img: 'https://dev.khoavang.vn/resources/uploads/baohanh/MemoryGame/laptop2-1697509996.png'
    },
    {
        id: 4,
        img: 'https://dev.khoavang.vn/resources/uploads/baohanh/MemoryGame/loa-1697509996.png'
    },
    {
        id: 5,
        img: 'https://dev.khoavang.vn/resources/uploads/baohanh/MemoryGame/PC-1697509996.png'
    },
    {
        id: 6,
        img: 'https://dev.khoavang.vn/resources/uploads/baohanh/MemoryGame/tainghe2-1697510084.png'
    }
];

const Danger = [
    {
        id: 1,
        img: 'http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Frankenstein-icon.png',
    },
    {
        id: 2,
        img: 'http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/128/Scream-icon.png'
    }
];

function setBG() {
    if (Math.round(Math.random())) {
        return Danger[0].img;
    } else {
        return Danger[1].img;
    }
}

function dropBox() {
    var length = random(100, ($(".game").width() - 100));
    var velocity = random(850, 10000);
    var size = random(50, 150);
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

for (var i = 0; i < 10; i++) {
    dropBox();
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

var runGame;

function startGame() {
    runGame = setInterval(function () {
        for (var i = 0; i < 10; i++) {
            dropBox();
        }
    }, 5000);
    countdown(runGame);
}

function countdown(runGame) {
    var seconds = 60;

    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = (seconds < 10 ? "0" : "") + String(seconds) + "S";
        if (seconds > 0) {
            setTimeout(tick, 1000);
            draw();
            update();
        } else {
            alert("Game over");
            clearInterval(runGame);
        }
    }

    tick();
}
