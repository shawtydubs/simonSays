var colors = {
    1: { name: '.green',  sound: 'sounds/green.mp3' },
    2: { name: '.red',    sound: 'sounds/red.mp3' },
    3: { name: '.yellow', sound: 'sounds/yellow.mp3' },
    4: { name: '.blue',   sound: 'sounds/blue.mp3' }
}

var count = 0;
var strictMode = false;
var gameColors = [];
var playerDots = [];

$('button').click(function() {
    $(this).addClass('selected').addClass('no-click');
});

$('#start').click(function() {
    $('.dot').removeClass('no-click');
    $('#strict').addClass('no-click');
    startRound();
});

$('#strict').click(function() {
    toggleStrict();
})

$('#reset').click(function() {
    resetGame();
});

$('.dot').click(function() {
    playerDots.push(colors[$(this).attr('id')]);
    playerBeep($(this).attr('id'));
    compareDots();
});

function updateCount() {
    $('#count-tally').html(count);
}

function startRound() {
    gameColors.push(colors[Math.floor(Math.random() * 4) + 1]);
    count++;
    updateCount();
    gameBeep();
}

function playerBeep(id) {
    $('#' + id).addClass('selected');
    new Audio(colors[id].sound).play();
    setTimeout(function() {
        $('#' + id).removeClass('selected');
    }, 500); 
}

function gameBeep() {
    pauseDots();
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
    playerDots = [];
}

function compareDots() {
    var i = playerDots.length - 1;

    // Correct selection
    if (gameColors[i].name == playerDots[i].name) {
        console.log('Colors are the same!');

        if (playerDots.length == gameColors.length && count < 5) {
            setTimeout(startRound, 1500);
        } else if (playerDots.length == gameColors.length && count == 5) {
            endGame();
        }
    
    // Wrong selection - not strict mode
    } else if (gameColors[i].name != playerDots[i].name && !strictMode) {
        setTimeout(function() {
            $('#wrong-no-strict').removeClass('hidden');
            new Audio('sounds/wrong_selection.mp3').play()
        }, 500);
        setTimeout(function() {
            $('#wrong-no-strict').addClass('hidden');
        }, 2000);
        console.log('Colors are different, replaying');
        setTimeout(gameBeep, 2500);
    
    // Wrong selection - strict mode
    } else {
        setTimeout(function() {
            $('#wrong-strict').removeClass('hidden');
            new Audio('sounds/end_game.mp3').play();
        }, 500);
        setTimeout(function() {
            $('#wrong-strict').addClass('hidden');
        }, 2000);
        console.log('Colors are different, restarting');
        setTimeout(function() {
            resetGame();
            startRound();
        }, 3000);
    }
}

function toggleStrict() {
    strictMode = strictMode ? false : true;
}

function pauseDots() {
    $('.dot').addClass('no-click');
}

function resumeDots() {
    $('.dot').removeClass('no-click');
}

function endGame() {
    $('#winner').removeClass('hidden');
    pauseDots();
    setTimeout(resetGame, 3000);
}

function resetGame() {
    console.log('Resetting game');
    gameColors = [];
    playerDots = [];
    count = 0;
    updateCount();
    $('button').removeClass('selected').removeClass('no-click');
    $('.notification').addClass('hidden');
}
