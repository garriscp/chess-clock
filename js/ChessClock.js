"use strict";

function ChessClock(opt) {
    var self = this;
    this.el = opt.el;
    this.currentCount = 240;
    this.DEFAULT_COUNT = 240;
    this.timerRunning = false;

    //building HTML elements via JS - this keeps the HTML clean (just tell me what div you want the clock to go in, and JS will handle the rest)

    this.containerEl = document.createElement("div");
    this.containerEl.className = "chessclock";
    this.el.appendChild(this.containerEl);

    this.timerEl = document.createElement("div");
    this.timerEl.className = "chessclock__timer";
    this.timerEl.innerHTML = "0:00";
    this.containerEl.appendChild(this.timerEl);

    this.buttonEl = document.createElement("button");
    this.buttonEl.className = "chessclock__button";
    this.buttonEl.innerHTML = "DONE";
    this.containerEl.appendChild(this.buttonEl);

    //update the display from 0:00 to current time based on currentCount above, add click listener for the DONE button

    this.updateDisplay(this.getTimeFromSeconds(this.currentCount));

    this.buttonEl.addEventListener('click', function() {
        if (self.timerRunning) {
            self.stopClock();
        }
    });

}

ChessClock.prototype.getTimeFromSeconds = function(totalSeconds) {

    var seconds = Math.floor( totalSeconds % 60 );
    //to ensure seconds is always two digits
    seconds = ("0" + seconds).slice(-2);
    var minutes = Math.floor( totalSeconds/60 % 60 );
    return {
        'total': totalSeconds,
        'minutes': minutes,
        'seconds': seconds
    };
};

ChessClock.prototype.updateDisplay = function(t) {
    this.timerEl.innerHTML = t.minutes + ":" + t.seconds;
};

ChessClock.prototype.startClock = function() {
    var self = this;
    //if clock is already running, make sure we don't start it again
    //that would cause all sorts of issues
    if (!this.timerRunning) {
        this.timerRunning = true;
        //going to start by subtracting a second, because the interval function will wait 1 second before executing
        //this way there won't be an extra second delay when you click the button
        if (this.currentCount === this.DEFAULT_COUNT) self.currentCount--;
        this.timeInterval = setInterval(function(){
            var t = self.getTimeFromSeconds(self.currentCount);
            self.updateDisplay(t);
            if(t.total<=0){
                //our timer is at or below (hopefully not) zero
                //lets clear the interval
                //and set our timerRunning to false
                clearInterval(self.timeInterval);
                self.timerRunning = false;
                //now dispatch the event so the game obj can alert the winner
                var event = new Event("zeroTimer");
                self.el.dispatchEvent(event);
            } else {
                self.currentCount--;
            }
        },1000);
    }
};

ChessClock.prototype.stopClock = function() {
    //clear interval and set timerRunning to false
    clearInterval(this.timeInterval);
    this.timerRunning = false;
};

ChessClock.prototype.resetClock = function() {
    //stop clock, reset to default count, update display back to default count
    this.stopClock();
    this.currentCount = this.DEFAULT_COUNT;
    this.updateDisplay(this.getTimeFromSeconds(this.currentCount));
};