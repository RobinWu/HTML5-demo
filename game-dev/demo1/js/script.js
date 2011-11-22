var canvas, ctx;
var circles = [];
var selectedCircle;
var hoveredCircle;

// -------------------------------------------------------------

// objects :

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

// -------------------------------------------------------------

// draw functions :

function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawCircle(ctx, x, y, radius) { // draw circle function
    ctx.fillStyle = 'rgba(255, 35, 55, 1.0)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    ctx.beginPath(); // custom shape begin
    ctx.fillStyle = 'rgba(255, 110, 110, 0.5)';
    ctx.moveTo(circles[0].x, circles[0].y);
    for (var i=0; i<circles.length; i++) {
        ctx.lineTo(circles[i].x, circles[i].y);
    }
    ctx.closePath(); // custom shape end
    ctx.fill(); // fill custom shape

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.stroke(); // draw border

    for (var i=0; i<circles.length; i++) { // display all our circles
        drawCircle(ctx, circles[i].x, circles[i].y, (hoveredCircle == i) ? 25 : 15);
    }
}

// -------------------------------------------------------------

// initialization

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var circleRadius = 15;
    var width = canvas.width;
    var height = canvas.height;

    var circlesCount = 7; // we will draw 7 circles randomly
    for (var i=0; i<circlesCount; i++) {
        var x = Math.random()*width;
        var y = Math.random()*height;
        circles.push(new Circle(x,y,circleRadius));
    }

    // binding mousedown event (for dragging)
    $('#scene').mousedown(function(e) {
        var canvasPosition = $(this).offset();
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        for (var i=0; i<circles.length; i++) { // checking through all circles - are mouse down inside circle or not
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var radius = circles[i].radius;
            if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                selectedCircle = i;
                break;
            }
        }
    });

    $('#scene').mousemove(function(e) { // binding mousemove event for dragging selected circle
            var mouseX = e.layerX || 0;
            var mouseY = e.layerY || 0;
        if (selectedCircle != undefined) {
            var canvasPosition = $(this).offset();

            var radius = circles[selectedCircle].radius;
            circles[selectedCircle] = new Circle(mouseX, mouseY,radius); // changing position of selected circle
        }

        hoveredCircle = undefined;
        for (var i=0; i<circles.length; i++) { // checking through all circles - are mouse down inside circle or not
            var circleX = circles[i].x;
            var circleY = circles[i].y;
            var radius = circles[i].radius;
            if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                hoveredCircle = i;
                break;
            }
        }
    });

    $('#scene').mouseup(function(e) { // on mouseup - cleaning selectedCircle
        selectedCircle = undefined;
    });

    setInterval(drawScene, 30); // loop drawScene
});