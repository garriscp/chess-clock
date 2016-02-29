"use strict";

window.onload = function() {
    var leftClock = new ChessClock({
        "el":document.getElementById("left-clock")
    });

    var rightClock = new ChessClock({
        "el":document.getElementById("right-clock")
    });

    var myChessGame = new ChessGame({
        "clock1": leftClock,
        "clock2": rightClock,
        "resetButton": document.getElementById("reset-button")
    });
};