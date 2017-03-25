var colors = [
    { name: '#green',  sound: 'sounds/green.mp3' },
    { name: '#red',    sound: 'sounds/red.mp3' },
    { name: '#yellow', sound: 'sounds/yellow.mp3' },
    { name: '#blue',   sound: 'sounds/blue.mp3' }
]

var count = 0;
// var sequence = [];

// For testing
var sequence = [
    { name: '#green',  sound: 'sounds/green.mp3' },
    { name: '#red',    sound: 'sounds/red.mp3' },
    { name: '#yellow', sound: 'sounds/yellow.mp3' },
    { name: '#blue',   sound: 'sounds/blue.mp3' }
];

updateCount();

$('button').click(function() {
    $(this).addClass('selected');
});

$('#start').click(function() {
    startGame();
});

function updateCount() {
    $('#count-tally').html(count);
}

function startGame() {
    // sequence.push(colors[Math.floor(Math.random() * 4)]);
    console.log(sequence);
    count++;
    updateCount();
    makeItBeep(sequence);
}

function makeItBeep(colors) {
    var i = 0;
    (function beepBeep() {
        $(colors[i].name).addClass('selected');
        new Audio(colors[i].sound).play();
        setTimeout(function() {
            $(colors[i].name).removeClass('selected');
            if (++i < colors.length) {
                setTimeout(beepBeep, 1000);
            }
        }, 1000); 
    })();
}

