// UI SETUP
var cursor = new Cursor();
setupUserInterface();

var appWidth = $(window).width();
var appHeight = $(window).height()
var leapXstart = 350;
var leapXend = 950;
var leapYstart = -300;
var leapYend = 50;
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
    // console.log(cursorPosition);

}}).use('screenPosition', {scale: LEAPSCALE});

// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
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
    if (gameState.get('state') == 'setup') {
        // TODO: 4.3, Starting the game with speech
        // Detect the 'start' command, and start the game if it was said
        if (false) {
            gameState.startGame();
            processed = true;
        }
    }

    else if (gameState.get('state') == 'playing') {
        if (gameState.isPlayerTurn()) {
            // TODO: 4.4, Player's turn
            // Detect the 'fire' command, and register the shot if it was said
            if (false) {
                registerPlayerShot();

                processed = true;
            }
        }

        else if (gameState.isCpuTurn() && gameState.waitingForPlayer()) {
            // TODO: 4.5, CPU's turn
            // Detect the player's response to the CPU's shot: hit, miss, you sunk my ..., game over
            // and register the CPU's shot if it was said
            if (false) {
                var response = "playerResponse";
                registerCpuShot(response);

                processed = true;
            }
        }
    }

    return processed;
};