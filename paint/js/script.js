var canvas;
var canvasColor;
var ctx;
var ctxColor;
var bMouseDown = false;
var selColorR = 0;
var selColorG = 0;
var selColorB = 0;

var images = [ // predefined array of used images
    'images/pic1.jpg',
    'images/pic2.jpg',
    'images/pic3.jpg',
    'images/pic4.jpg',
    'images/pic5.jpg'
];
var iActiveImage = 0;

$(function(){

    // drawing active image
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }
    image.src = images[iActiveImage];

    // creating canvas objects
    canvas = document.getElementById('panel');
    ctx = canvas.getContext('2d');

    canvasColor = document.getElementById('color');
    ctxColor = canvasColor.getContext('2d');

    drawGradients(ctxColor);

    $('#color').mousemove(function(e) { // mouse move handler
        var canvasOffset = $(canvasColor).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);

        var imageData = ctxColor.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;

        var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
        $('#preview').css('backgroundColor', pixelColor);
    });

    $('#color').click(function(e) { // mouse click handler
        var canvasOffset = $(canvasColor).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);

        var imageData = ctxColor.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;

        $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);

        var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
        $('#pick').css('backgroundColor', pixelColor);

        selColorR = pixel[0];
        selColorG = pixel[1];
        selColorB = pixel[2];
    }); 

    $('#panel').mousedown(function(e) { // mouse down handler
        bMouseDown = true;
    });
    $('#panel').mouseup(function(e) { // mouse up handler
        bMouseDown = false;
    });
    $('#panel').mousemove(function(e) { // mouse move handler
        if (bMouseDown) {
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;
            pixel[0] = selColorR;     // Red       
            pixel[1] = selColorG;   // Green       
            pixel[2] = selColorB;   // Blue       
            pixel[3] = 255; // Alpha channel  

            ctx.putImageData(imageData, canvasX, canvasY); 
        }
    });

    $('#swImage').click(function(e) { // switching images
        iActiveImage++;
        if (iActiveImage >= 10) iActiveImage = 0;
        image.src = images[iActiveImage];
    });
});

function drawGradients() {
    var grad = ctxColor.createLinearGradient(20, 0, canvasColor.width - 20, 0);
    grad.addColorStop(0, 'red');
    grad.addColorStop(1 / 6, 'orange');
    grad.addColorStop(2 / 6, 'yellow');
    grad.addColorStop(3 / 6, 'green')
    grad.addColorStop(4 / 6, 'aqua');
    grad.addColorStop(5 / 6, 'blue');
    grad.addColorStop(1, 'purple');
    ctxColor.fillStyle=grad;
    ctxColor.fillRect(0, 0, canvasColor.width, canvasColor.height);
}
