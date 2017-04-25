// UI SETUP
var cursor = new Cursor();
setupUserInterface();

var appWidth = $(window).width();
var appHeight = $(window).height();
$(window).resize(function() {
    appWidth = $(window).width();
    appHeight = $(window).height();
});

var leapXstart = 200;
var leapXend = 800;
var leapYstart = 50;
var leapYend = 400;
var getCursorPosition = function(pos) {
    var leapX = pos[0];
    var leapY = pos[1];
    var appX = (leapX - leapXstart) * appWidth / (leapXend - leapXstart);
    var appY = (leapY - leapYstart) * appHeight / (leapYend - leapYstart);
    return [appX, appY];
}

// MAIN GAME LOOP
// Called every time the Leap provides a new frame of data
Leap.loop({ hand: function(hand) {
    var cursorPosition = getCursorPosition(hand.screenPosition());
    cursor.setScreenPosition(cursorPosition);
    // console.log(hand.screenPosition()[0]);

}, enableGestures: true}, function(frame) {
    if (frame.valid && frame.gestures.length > 0) {
        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            switch (gesture.type) {
                case "keyTap":
                    console.log("Key Tap Gesture");
                    break;
                case "swipe":
                    console.log("Swipe Gesture");
                    // Classify swipe as either horizontal or vertical
                    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                    // Classify as right-left or up-down
                    if (isHorizontal) {
                        if(gesture.direction[0] > 0) {
                            swipeDirection = "right";
                            history.back();
                        } else {
                            swipeDirection = "left";
                            history.forward();
                        }
                    } else { // vertical
                        if(gesture.direction[1] > 0) {
                            swipeDirection = "up";
                        } else {
                            swipeDirection = "down";
                        }                  
                    }
                    console.log(swipeDirection)
                    break;
            }
        }
    }
}).use('screenPosition', {scale: LEAPSCALE});

// processSpeech(transcript)
// Is called anytime speech is recognized by the Web Speech API
// Input: 
//    transcript, a string of possibly multiple words that were recognized
// Output: 
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript) {
    // Helper function to detect if any commands appear in a string
    var userSaid = function(str, commands) {
        for (var i = 0; i < commands.length; i++) {
            if (str.indexOf(commands[i]) > -1)
                return true;
        }
        return false;
    };

    var processed = false;
    if (false) {
        processed = true;
    }

    return processed;
};