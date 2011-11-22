// inner variables
var canvas, ctx;
var backgroundImage;
var iBgShiftX = 100;
var dragon;
var dragonW = 75; // dragon width
var dragonH = 70; // dragon height
var iSprPos = 0; // initial sprite frame
var iSprDir = 4; // initial dragon direction
var dragonSound; // dragon sound
var wingsSound; // wings sound
var bMouseDown = false; // mouse down state
var iLastMouseX = 0;
var iLastMouseY = 0;
// -------------------------------------------------------------

// objects :
function Dragon(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.bDrag = false;
}
// -------------------------------------------------------------

// draw functions :
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    // draw background
    iBgShiftX -= 4;
    if (iBgShiftX <= 0) {
        iBgShiftX = 1045;
    }
    ctx.drawImage(backgroundImage, 0 + iBgShiftX, 0, 1000, 940, 0, 0, 1000, 600);

    // update sprite positions
    iSprPos++;
    if (iSprPos >= 9) {
        iSprPos = 0;
    }

    // in case of mouse down - move dragon more close to our mouse
    if (bMouseDown) {
        if (iLastMouseX > dragon.x) {
            dragon.x += 5;
        }
        if (iLastMouseY > dragon.y) {
            dragon.y += 5;
        }
        if (iLastMouseX < dragon.x) {
            dragon.x -= 5;
        }
        if (iLastMouseY < dragon.y) {
            dragon.y -= 5;
        }
    }

    // draw dragon
    ctx.drawImage(dragon.image, iSprPos*dragon.w, iSprDir*dragon.h, dragon.w, dragon.h, dragon.x - dragon.w/2, dragon.y - dragon.h/2, dragon.w, dragon.h);
}

// -------------------------------------------------------------

// initialization
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    // load background image
    backgroundImage = new Image();
    backgroundImage.src = 'images/hell.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }

    // 'Dragon' music init
    dragonSound = new Audio('media/dragon.wav');
    dragonSound.volume = 0.9;

    // 'Wings' music init
    wingsSound = new Audio('media/wings.wav');
    wingsSound.volume = 0.9;
    wingsSound.addEventListener('ended', function() { // looping wings sound
        this.currentTime = 0;
        this.play();
    }, false);
    wingsSound.play();

    // initialization of dragon
    var oDragonImage = new Image();
    oDragonImage.src = 'images/dragon.gif';
    oDragonImage.onload = function() {
    }
    dragon = new Dragon(400, 300, dragonW, dragonH, oDragonImage);

    $('#scene').mousedown(function(e) { // binding mousedown event (for dragging)
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) { // changes for jquery 1.7
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        bMouseDown = true;

        if (mouseX > dragon.x- dragon.w/2 && mouseX < dragon.x- dragon.w/2 +dragon.w &&
            mouseY > dragon.y- dragon.h/2 && mouseY < dragon.y-dragon.h/2 +dragon.h) {

            dragon.bDrag = true;
            dragon.x = mouseX;
            dragon.y = mouseY;
        }
    });

    $('#scene').mousemove(function(e) { // binding mousemove event
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) { // changes for jquery 1.7
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        // saving last coordinates
        iLastMouseX = mouseX;
        iLastMouseY = mouseY;

        // perform dragon dragging
        if (dragon.bDrag) {
            dragon.x = mouseX;
            dragon.y = mouseY;
        }

        // change direction of dragon (depends on mouse position)
        if (mouseX > dragon.x && Math.abs(mouseY-dragon.y) < dragon.w/2) {
            iSprDir = 0;
        } else if (mouseX < dragon.x && Math.abs(mouseY-dragon.y) < dragon.w/2) {
            iSprDir = 4;
        } else if (mouseY > dragon.y && Math.abs(mouseX-dragon.x) < dragon.h/2) {
            iSprDir = 2;
        } else if (mouseY < dragon.y && Math.abs(mouseX-dragon.x) < dragon.h/2) {
            iSprDir = 6;
        } else if (mouseY < dragon.y && mouseX < dragon.x) {
            iSprDir = 5;
        } else if (mouseY < dragon.y && mouseX > dragon.x) {
            iSprDir = 7;
        } else if (mouseY > dragon.y && mouseX < dragon.x) {
            iSprDir = 3;
        } else if (mouseY > dragon.y && mouseX > dragon.x) {
            iSprDir = 1;
        }
    });

    $('#scene').mouseup(function(e) { // binding mouseup event
        dragon.bDrag = false;
        bMouseDown = false;

        // play dragon sound
        dragonSound.currentTime = 0;
        dragonSound.play();
    });

    setInterval(drawScene, 30); // loop drawScene
});