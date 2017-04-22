
// SPEECH SYNTHESIS SETUP
var voicesReady = false;
window.speechSynthesis.onvoiceschanged = function() {
  voicesReady = true;
  // Uncomment to see a list of voices
  //console.log("Choose a voice:\n" + window.speechSynthesis.getVoices().map(function(v,i) { return i + ": " + v.name; }).join("\n"));
};

var generateSpeech = function(message, callback) {
  if (voicesReady) {
    var msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[VOICEINDEX];
    msg.text = message;
    msg.rate = 0.2;
    if (typeof callback !== "undefined")
      msg.onend = callback;
    speechSynthesis.speak(msg);
  }
};

// getIntersectingShipAndOffset(screenPosition)
//    Returns the ship enclosing the input screen position
// Input:
//    screenPosition = [x,y]
// Output:
//    shipInfo = {ship: Ship, offset: [x,y]}, if intersecting ships
//        where ship is a Ship model
//        and offset is the grab offset -- the delta between the screen position and ship origin
//    false, if not intersecting any ships
var getIntersectingShipAndOffset = function(screenPosition) {
  var intersectShip = false;
  playerBoard.get('ships').forEach(function(ship) {
    var shipOrigin = ship.get('screenPosition');
    if (ship.get('isVertical')) {
      var bbox = {
        x1: shipOrigin[0],
        x2: shipOrigin[0] + TILESIZE,
        y1: shipOrigin[1],
        y2: shipOrigin[1] + ship.get('length') * TILESIZE
      };
    } else {
      var bbox = {
        x1: shipOrigin[0],
        x2: shipOrigin[0] + ship.get('length') * TILESIZE,
        y1: shipOrigin[1],
        y2: shipOrigin[1] + TILESIZE
      };
    }
    if (bbox.x1 <= screenPosition[0] && bbox.x2 >= screenPosition[0]
    && bbox.y1 <= screenPosition[1] && bbox.y2 >= screenPosition[1]) {
      intersectShip = ship;
    }
  });

  if (intersectShip) {
    var shipPosition = intersectShip.get('screenPosition');
    var offset = [screenPosition[0] - shipPosition[0],
                  screenPosition[1] - shipPosition[1]];
    return {ship: intersectShip, offset: offset};
  } else {
    return false;
  }
}