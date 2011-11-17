(function () {

var DEFAULT = 1
var TEXT_SIZE = 12

var canvas
var context
var canvasWidth
var canvasHeight
var dir = ""
var fileLines = new Array()
var filePointers = new Array()
var INKEY$Queue = new Array()
var textColor = 15
var textColorBackground = 0
var textX = DEFAULT
var textY = DEFAULT

var Palette = {
	0: "RGB(0, 0, 0)",
	// guesses
	1: "RGB(0, 0, 255)",
	2: "RGB(0, 255, 0)",
	3: "RGB(0, 255, 255)",
	4: "RGB(255, 0, 0)",
	5: "RGB(255, 0, 255)",
	// /guesses
	6: "RGB(170, 85, 0)",
	9: "RGB(85, 85, 255)",
	10: "RGB(85, 255, 85)",
	12: "RGB(255, 85, 85)",
	14: "RGB(255, 255, 0)",
	15: "RGB(255, 255, 255)",
	16: "RGB(113, 56, 0)",
	17: "RGB(20, 20, 20)",
	18: "RGB(32, 32, 32)",
	19: "RGB(44, 44, 44)",
	20: "RGB(56, 56, 56)",
	21: "RGB(69, 69, 69)",
	22: "RGB(81, 81, 81)",
	23: "RGB(97, 97, 97)",
	24: "RGB(113, 113, 113)",
	25: "RGB(130, 130, 130)",
	26: "RGB(146, 146, 146)",
	27: "RGB(162, 162, 162)",
	28: "RGB(182, 182, 182)",
	29: "RGB(203, 203, 203)",
	30: "RGB(227, 227, 227)",
	31: "RGB(255, 255, 255)",
	32: "RGB(0, 0, 255)",
	34: "RGB(125, 0, 255)",
	35: "RGB(190, 0, 255)",
	36: "RGB(255, 0, 255)",
	37: "RGB(255, 0, 190)",
	39: "RGB(255, 0, 65)",
	40: "RGB(255, 0, 0)",
	41: "RGB(255, 65, 0)",
	42: "RGB(255, 125, 0)",
	43: "RGB(255, 190, 0)",
	44: "RGB(255, 255, 0)",
	45: "RGB(190, 255, 0)",
	46: "RGB(125, 255, 0)",
	48: "RGB(0, 255, 0)",
	51: "RGB(0, 255, 190)",
	52: "RGB(0, 255, 255)",
	53: "RGB(0, 190, 255)",
	54: "RGB(0, 125, 255)",
	55: "RGB(0, 65, 255)",
	56: "RGB(125, 125, 255)",
	57: "RGB(158, 125, 255)",
	64: "RGB(255, 125, 125)",
	65: "RGB(255, 158, 125)",
	66: "RGB(255, 190, 125)",
	67: "RGB(255, 223, 125)",
	88: "RGB(255, 182, 182)",
	89: "RGB(255, 199, 182)",
	90: "RGB(255, 219, 182)",
	106: "RGB(56, 0, 113)",
	107: "RGB(85, 0, 113)",
	108: "RGB(113, 0, 113)",
	112: "RGB(113, 0, 0)",
	113: "RGB(113, 28, 0)",
	114: "RGB(113, 56, 0)",
	115: "RGB(113, 85, 0)",
	116: "RGB(113, 113, 0)",
	118: "RGB(56, 113, 0)",
	119: "RGB(28, 113, 0)",
	120: "RGB(0, 113, 0)",
	121: "RGB(0, 113, 28)",
	127: "RGB(0, 28, 113)",
	138: "RGB(113, 85, 56)",
	139: "RGB(113, 97, 56)",
	162: "RGB(113, 97, 81)",
	177: "RGB(16, 0, 65)",
	179: "RGB(48, 0, 65)",
	180: "RGB(65, 0, 65)",
	183: "RGB(65, 0, 16)",
	184: "RGB(65, 0, 0)",
	185: "RGB(65, 16, 0)",
	186: "RGB(65, 32, 0)",
	187: "RGB(65, 48, 0)",
	188: "RGB(65, 65, 0)",
	189: "RGB(48, 65, 0)",
	190: "RGB(32, 65, 0)",
	191: "RGB(16, 65, 0)",
	192: "RGB(0, 65, 0)"
}

onkeydown = function (e) {
	var keyCode = e.keyCode;
	if ([8].indexOf(keyCode) > -1) {
		e.preventDefault()
	}
	if (INKEY$Queue.length) {
		INKEY$Queue[INKEY$Queue.length - 1](keyCode);
	}
}

function error () {
	console.log.apply(console, arguments)
	alert("Illegal function call")
}

// This is "Box Fill", which is included in LINE calls. Just needs to be set so undefined errors don't get thrown.
this.BF = "BF"
this.TIMER = undefined

this.BEEP = function () {
	alert("BEEP!")
}

this.CHDIR = function (chdir) {
	// Below regex removes stuff like C:\ or D:\ at the beginning
	dir = chdir.replace(/^.:\\/g, "")
	if (dir.match(/\/$/) === null) dir += "/"
}

this.CHR$ = function (keyCode) {
	return Number(keyCode)
}

this.CLEAR = function () {
}

this.CLS = function () {
	textX = DEFAULT
	textY = DEFAULT
	if (context) {
		context.save()
		context.fillStyle = Palette[0]
		context.fillRect(0, 0, canvasWidth, canvasHeight)
		context.restore()
	}
}

this.COLOR = function (color) {
	if (color in Palette) {
		textColor = color
	} else {
		error("Unknown color: ", color)
	}
}

this.DEFINT = function () {
}

this.EXIT = function (msg) {
	INKEY$Queue.pop()
}

this.GET = function (x, y, width, height) {
//console.log("GET()", arguments);
	return context.getImageData(x, y, width, height)
}

this.EOF = function (index) {
	return Boolean(fileLines[index].length)
}

this.INKEY$ = function (callback) {
	INKEY$Queue.push(callback)
}

this.INP = function (address) {
	// WTF is this supposed to do
}

this.OUT = function (address, value) {
	// WTF is this supposed to do
}

this.INPUT = function (index) {
	return fileLines[index][filePointers[index]++]
}

this.INT = function (num) {
	return parseInt(num)
}

this.LEFT$ = function (str, len) {
	return str.substr(0, len)
}

this.RIGHT$ = function (str, len) {
	return str.substr(str.length - 1 - len, str.length - 1)
}

this.LEN = function (msg) {
	return msg && msg.length || 0
}

this.LINE = function (x1, y1, x2, y2, color, type) {
	if (!context) return
	context.save()
	switch (type) {
		case this.BF:
			context.fillStyle = Palette[color]
			//context.fillRect(x1, y1, x2 - x1, y2 - y1)
			context.fillRect(x1 - 1, y1 - 1, x2 - x1 - 1, y2 - y1 - 1)
			break
	}
	context.restore()
}

this.LINE_INPUT = function (index) {
	return this.INPUT(index)
}

this.LOCATE = function (y, x) {
	if (x !== undefined) textX = x
	if (y !== undefined) textY = y
}

this.OPEN = function (file, index, callback) {

	var xhr = new XMLHttpRequest()
	xhr.open("GET", dir + file, false)
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			fileLines[index] = xhr.responseText.split("\n")
			filePointers[index] = 0
			callback()
		}
	}
	xhr.send()

}

this.PALETTE = function (index, r, g, b) {
	r = r || 0
	g = g || 0
	b = b || 0
	Palette[index] = "RGB(" + r + ", " + g + ", " + b + ")"
}

this.PSET = function (x, y, color) {
//console.log("PSET()", arguments);
	if (!context) return
	context.save()
	color = Number(color)
	if (color in Palette) {
		context.fillStyle = Palette[color]
	} else {
		context.fillStyle = Palette[0]
console.log("### couldn't find:", color)
	}
	context.fillRect(x, y, 1, 1)
	context.restore()
}

this.PUT = function (x, y, image) {
//console.log("PUT()", arguments);
	if (context) context.putImageData(image, x, y)
}

this.PRINT = function (msg) {
//console.log("PRINT()", arguments);

	if (msg) {
		if (!context) {
			SCREEN(9)
		}
		context.save()
		context.fillStyle = textColorBackground
		context.fillRect(textX * TEXT_SIZE - TEXT_SIZE, textY * TEXT_SIZE - TEXT_SIZE, (LEN(msg) - 1) * TEXT_SIZE, TEXT_SIZE)
		context.restore()

		context.save()
		context.fillStyle = Palette[textColor]
		context.font = TEXT_SIZE + "px Courier"
		context.textAlign = "left"
		context.fillText(msg, textX * TEXT_SIZE - TEXT_SIZE, textY * TEXT_SIZE)
		context.restore()
	}
	textX = 1
	textY++
}

this.PRINT_USING = function () {

	this.PRINT(arguments[0]);

	/*
	for (var i = 0; i < arguments.length; ++i) {
	}
	*/

}

this.RANDOMIZE = function () {
	// Not supported
}

this.RND = function () {
	return Math.random()
}

this.SCREEN = function (screen) {
	if (canvas === undefined) {
		canvas = document.createElement("canvas")
		document.body.appendChild(canvas)
		context = canvas.getContext("2d")
	}

	switch (screen) {
		case 0:
			if (canvas) {
				document.body.removeChild(canvas)
				canvas = undefined
				context = undefined
			}
			break
		case 9:
			canvasWidth = 640
			canvasHeight = 480
			break
		case 13:
			canvasWidth = 320
			canvasHeight = 200
			break
	}

	if (canvas) {
		canvas.width = canvasWidth
		canvas.height = canvasHeight
		if (screen == 13) { // TODO: remove
			canvas.style.width = canvasWidth * 2 + "px"
			canvas.style.height = canvasHeight * 2 + "px"
		}
	}
	this.CLS()
}

this.STRING$ = function (len, chr) {
	var msg = []
	for (var i = 0; i < len; i++) {
		msg.push(chr)
	}
	return msg.join("")
}

this.SYSTEM = function () {
	onkeydown = function () {}
	SCREEN(0)
}

this.TAB = function (num) {
	return STRING$(num, "\t")
}

this.TYPE = function (Type) {
	return function (count, matrix) {
		if (count) {
			var items = new Array()
			for (var i = 0; i <= count; i++) {
				if (matrix) {
					var subItems = new Array()
					for (var n = 0; n <= matrix; n++) {
						subItems[n] = new Type()
					}
					items[i] = subItems
				} else {
					items[i] = new Type()
				}
			}
			return items
		}
		return new Type()
	}
}

}())
