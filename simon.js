var colors = {
    1: { name: '.green',  sound: 'sounds/green.mp3' },
    2: { name: '.red',    sound: 'sounds/red.mp3' },
    3: { name: '.yellow', sound: 'sounds/yellow.mp3' },
    4: { name: '.blue',   sound: 'sounds/blue.mp3' }
}

var count = 0;
var gameColors = [];
var playerDots = [];

// For testing
// var gameColors = [
//     { name: '.green',  sound: 'sounds/green.mp3' },
//     { name: '.red',    sound: 'sounds/red.mp3' },
//     { name: '.yellow', sound: 'sounds/yellow.mp3' },
//     { name: '.blue',   sound: 'sounds/blue.mp3' }
// ];

updateCount();

$('button').click(function() {
    $(this).addClass('selected');
});

$('#start').click(function() {
    startRound();
});

$('.dot').click(function() {
    playerDots.push(colors[$(this).attr('id')]);
    console.group('Player dots:');console.log(playerDots);console.groupEnd();
    playerBeep($(this).attr('id'));
    compareDots();
})

function updateCount() {
    $('#count-tally').html(count);
}

function startRound() {
    gameColors.push(colors[Math.floor(Math.random() * 4) + 1]);
    console.group('Game colors:');console.log(gameColors);console.groupEnd();
    count++;
    updateCount();
    gameBeep();
}

function playerBeep(id) {
    console.log('Player beep');
    $('#' + id).addClass('selected');
    new Audio(colors[id].sound).play();
    setTimeout(function() {
        $('#' + id).removeClass('selected');
    }, 500); 
}

function gameBeep() {
    console.log('Starting game sequence');
    var i = 0;
    (function beepBeep() {
        $(gameColors[i].name).addClass('selected');
        new Audio(gameColors[i].sound).play();
        setTimeout(function() {
            $(gameColors[i].name).removeClass('selected');
            if (++i < gameColors.length) {
                setTimeout(beepBeep, 500);
            }
        }, 500); 
    })();
}

function compareDots() {
    for (i = 0; i < playerDots.length; i++) {
        if (gameColors[i].name == playerDots[i].name) {
            console.log('Colors are the same!');
        } else {
            console.log('Colors are different');
        }
    }
    startRound();
}

function resetGame() {
    gameColors = [];
    playerDots = [];
    count = 0;
}

