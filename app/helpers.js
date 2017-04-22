
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

// getIntersectingTile(screenPosition)
//    Returns the tile enclosing the input screen position
// Input:
//    screenPosition = [x,y]
// Output:
//    tilePosition = {row: r, col: c}, if intersecting the board
//    false, if not intersecting the board
var getIntersectingTile = function(screenPosition) {
  if (screenPosition[0] >= gridOrigin[0] && screenPosition[0] <= gridOrigin[0] + BOARDSIZE
    && screenPosition[1] >= gridOrigin[1] && screenPosition[1] <= gridOrigin[1] + BOARDSIZE) {
    var column = Math.floor((screenPosition[0] - gridOrigin[0]) / TILESIZE);
    var row = Math.floor((screenPosition[1] - gridOrigin[1]) / TILESIZE);
    var tile = tiles[row*NUMTILES + column];
    return {row: row, col: column};
  }
  else {
    return false;
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

// unhighlightTiles()
//    Clears all highlighting from the tiles
var unhighlightTiles = function() {
  tiles.forEach(function(tile) {
    tile.setProperties({backgroundColor: Colors.GREY});
  });
};

// highlightTile(position, color)
//    Highlights a tile with a particular color
// Input:
//    position = {row: r, col: c}, tilePosition
//    color = color hex code (see Colors at top of file)
var highlightTile = function(position, color) {
  tiles[position.row*NUMTILES + position.col].setProperties({backgroundColor: color});
};

// unblinkTiles()
//    Clears all blinking from the tiles
var unblinkTiles = function() {
  tileModifiers.forEach(function(modifier) {
    modifier.opacityFrom(1);
  });
};

// blinkTile(position)
//    Causes a tile to blink
// Input: position = {row: r, col: c}, tilePosition
var blinkTile = function(position) {
  var angle = 0;
  tileModifiers[position.row*NUMTILES + position.col].opacityFrom(function() {
    angle += 0.1;
    return Math.cos(angle);
  });
};
