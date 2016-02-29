"use strict";

function ChessGame(opt) {
    var self = this;

    this.clock1 = opt.clock1;
    this.clock2 = opt.clock2;
    this.resetButton = opt.resetButton;

    this.resetButton.addEventListener("click", function() { self.reset(); });

    //handle starting the other click when a given clock button is pressed
    this.clock1.buttonEl.addEventListener("click",function() {
        self.clock2.startClock();
    });

    this.clock2.buttonEl.addEventListener("click",function() {
        self.clock1.startClock();
    });

    //listen for the zeroTimer event, this means the one clock is at zero, so the other team has won
    this.clock1.el.addEventListener("zeroTimer", function(e){
        alert("team / clock 2 has won");
        e.stopPropagation();
    });

    this.clock2.el.addEventListener("zeroTimer", function(e){
        alert("team / clock 1 has won");
        e.stopPropagation();
    });
}

ChessGame.prototype.reset = function() {
    this.clock1.resetClock();
    this.clock2.resetClock();
};
