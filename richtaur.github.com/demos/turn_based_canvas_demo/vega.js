(function () {

const WIDTH = 480;
const HEIGHT = 320;

const BAR_HEIGHT = 8;
const TILE_SIZE = 32;

const STATE_ALIVE = "alive";
const STATE_DEAD = "dead";
const TEAM_MOB = "mob";
const TEAM_PLAYER = "player";

var actorIndex = 0;
var actors = {};
var assets = [
	"sheet_characters.png",
	"sheet_objects.png"
];
var canvas;
var ctx;
var game = {
	actorTurnId: 0
};
var images = {};

function init () {
	initCanvas();

	loadBattle(function () {
		initEvents();
		drawScreen();
		nextTurn();
	});
};

function initCanvas () {
	canvas = document.createElement("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
};

function initEvents () {
	addEventListener("click", function (e) {
		click(e.pageX, e.pageY);
	});
	addEventListener("touchstart", function (e) {
		click(e.touches[0].pageX, e.touches[0].pageY);
	});
};

function Actor (conf) {
	for (var key in conf) {
		this[key] = conf[key];
	}

	if (conf.spriteSheet) {
		this.image = images[conf.spriteSheet];
	}

	if (conf.hpMax) this.hp = conf.hpMax;

	this.state = STATE_ALIVE;
	actors["a_" + actorIndex] = this;

	actorIndex++;
};

Actor.prototype.attack = function (target) {
	var damage = this.getDamage();

	target.hp -= damage;
	if (target.hp < 0) {
		target.hp = 0;
		target.showHP = false;
		target.state = STATE_DEAD;
	}

	drawScreen();
};

Actor.prototype.getDamage = function () {
	var damage = this.attackPower;
	var mod = (rand(0, 25) / 100);

	if (rand(1, 2) == 1) {
		damage += (damage * mod);
	} else {
		damage -= (damage * mod);
	}

	if (rand(1, 20) == 1) {
		console.log("Critical hit!");
		damage *= 2;
	}

	return Math.round(damage);
};

Actor.prototype.getNearbyTarget = function () {

	var closestDistance = 99;
	var closestTarget;

	for (var id in actors) {
		var target = actors[id];
		if (target.isAlive() && !target.sameTeam(this)) {
			if (target.isAdjacent()) return target;

			var distanceX = Math.abs(this.tileX - target.tileX);
			var distanceY = Math.abs(this.tileY - target.tileY);
			var distance = (distanceX + distanceY);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestTarget = target;
			}
		}
	}

	return closestTarget;

};

Actor.prototype.isAdjacent = function () {

	if (typeof arguments[0] == "number") {
		var x = arguments[0];
		var y = arguments[1];
	} else if (arguments[0] instanceof Actor) {
		var x = arguments[0].tileX;
		var y = arguments[0].tileY;
	}

	return (
		(
			(Math.abs(this.tileX - x) == 1)
			&& (Math.abs(this.tileY - y) == 0)
		)
		|| (
			(Math.abs(this.tileX - x) == 0)
			&& (Math.abs(this.tileY - y) == 1)
		)
	);

};

Actor.prototype.isAlive = function () {
	return (this.state == STATE_ALIVE);
};

Actor.prototype.sameTeam = function (target) {
	return (this.team == target.team);
};

function click (x, y) {
	var tileX = Math.floor(x / TILE_SIZE);
	var tileY = Math.floor(y / TILE_SIZE);

	var actor = actors[game.actorTurnId];

	if (!actor) return;

	if (actor.team == TEAM_PLAYER) {
		if (actor.isAdjacent(tileX, tileY)) {
			var clickedActor = getActorAt(tileX, tileY);
			if (clickedActor) {
				if (actor.sameTeam(clickedActor)) {
					console.log("That space is already occupied by one of your units.");
				} else {
					actor.attack(clickedActor);
					nextTurn();
				}
			} else {
				actor.tileX = tileX;
				actor.tileY = tileY;
				nextTurn();
			}
		}
	} else {
		console.log("It's not your turn!");
	}

	drawScreen();
};

function doMobTurn (actor) {

	var target = actor.getNearbyTarget();
	if (!target) return;

	if (actor.isAdjacent(target)) {
		actor.attack(target);
	} else {
		var tileX = actor.tileX;
		var tileY = actor.tileY;

		if (tileX < target.tileX) {
			if (!getActorAt(tileX + 1, tileY)) tileX++;
		} else if (tileX > target.tileX) {
			if (!getActorAt(tileX - 1, tileY)) tileX--;
		}
		
		if (actor.tileX == tileX) {
			if (tileY < target.tileY) {
				if (!getActorAt(tileX, tileY + 1)) tileY++;
			} else if (tileY > target.tileY) {
				if (!getActorAt(tileX, tileY - 1)) tileY--;
			}
		}

		actor.tileX = tileX;
		actor.tileY = tileY;
	}

	nextTurn();
};

function drawScreen () {
	ctx.save();
	ctx.fillStyle = "rgb(231, 212, 181)";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	drawTiles();
	drawUI();
	drawActors();
	ctx.restore();
};

function drawActor (actor) {
	if (!actor.visible) return;

	var x = (actor.tileX * TILE_SIZE);
	var y = (actor.tileY * TILE_SIZE);

	if (actor.isAlive()) {
		ctx.drawImage(
			actor.image,
			actor.spriteX, actor.spriteY,
			TILE_SIZE, TILE_SIZE,
			x, y,
			TILE_SIZE, TILE_SIZE
		);
	} else {
	/*
		ctx.save();

		if (actor.team == TEAM_PLAYER) {
			ctx.globalAlpha = 0.5;
			var spriteX = 32;
			var spriteY = 64;
		} else {
			ctx.globalAlpha = 0.25;
			var spriteX = 0;
			var spriteY = 32;
		}

		ctx.drawImage(
			images["sheet_objects.png"],
			spriteX, spriteY,
			TILE_SIZE, TILE_SIZE,
			x, y,
			TILE_SIZE, TILE_SIZE
		);
		ctx.restore();
		*/
	}

	if (actor.showHP) {

		var mod = (actor.hp / actor.hpMax);

		ctx.save();
		ctx.translate(x, y);
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, (TILE_SIZE - BAR_HEIGHT), TILE_SIZE, BAR_HEIGHT);

		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(1, (TILE_SIZE - BAR_HEIGHT + 1), (TILE_SIZE - 2), (BAR_HEIGHT - 2));

		ctx.fillStyle = getBarColor(mod);
		ctx.fillRect(1, (TILE_SIZE - BAR_HEIGHT + 1), (mod * (TILE_SIZE - 2)), (BAR_HEIGHT - 2));
		ctx.restore();
	}
};

function drawActors () {
	for (var id in actors) {
		var actor = actors[id];
		if (!actor.isAlive()) drawActor(actors[id]);
	};

	for (var id in actors) {
		var actor = actors[id];
		if (actor.isAlive()) drawActor(actors[id]);
	};
};

function drawTiles () {
	var draw;

	for (var y = 0; y < (HEIGHT / TILE_SIZE); y++) {
		for (var x = 0; x < (WIDTH / TILE_SIZE); x++) {
			draw = !draw;
			if (!draw) continue;
			ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
			ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
		}
	}

};

function drawUI () {
	var actor = actors[game.actorTurnId];

	if (!actor) return;

	if (actor.team == TEAM_PLAYER) {
		ctx.save();
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.translate((actor.tileX * TILE_SIZE), (actor.tileY * TILE_SIZE));

		ctx.fillRect(-TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
		ctx.fillRect(TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
		ctx.fillRect(0, -TILE_SIZE, TILE_SIZE, TILE_SIZE);
		ctx.fillRect(0, TILE_SIZE, TILE_SIZE, TILE_SIZE);
		ctx.restore();
	}
};

function getActorAt (x, y) {
	for (var id in actors) {
		var actor = actors[id];
		if (actor.isAlive() && (actor.tileX == x) && (actor.tileY == y)) return actor;
	};
	return null;
};

function getActorIdByNextTurn () {
	for (var id in actors) {
		var actor = actors[id];
		if (actor.isAlive() && !actor.went) {
			return id;
		}
	};

	// We're all out of turns! Must reset and run again
	for (var id in actors) {
		var actor = actors[id];
		if (actor.isAlive()) actor.went = false;
	}
	return arguments.callee();
};

function getBarColor (mod) {
	if (mod > 0.5) {
		return "rgb(80, 184, 72)";
	} else if (mod > 0.25) {
		return "rgb(243, 111, 33)";
	}
	return "rgb(215, 25, 32)";
};

function load (callback) {
	var assetsLeft = assets.length;
	for (var i = 0, len = assets.length; i < len; i++) {
		var image = new Image();
		var src = assets[i];
		image.onload = function () {
			assetsLeft--;
			if (assetsLeft == 0) callback();
		};
		image.src = src;
		images[src] = image;
	}
};

function loadBattle (callback) {

	// Player units
	for (var i = 0; i < 4; i++) {
		new Actor({
			attackPower: 10,
			hpMax: 100,
			showHP: true,
			spriteSheet: "sheet_characters.png",
			spriteX: 256,
			spriteY: 0,
			team: TEAM_PLAYER,
			tileX: 8 + i,
			tileY: 8,
			visible: true
		});
	}

	// Enemy units
	new Actor({
		attackPower: 5,
		hpMax: 50,
		showHP: true,
		spriteSheet: "sheet_characters.png",
		spriteX: 256,
		spriteY: 160,
		team: TEAM_MOB,
		tileX: 1,
		tileY: 1,
		visible: true
	});

	new Actor({
		attackPower: 5,
		hpMax: 50,
		showHP: true,
		spriteSheet: "sheet_characters.png",
		spriteX: 256,
		spriteY: 160,
		team: TEAM_MOB,
		tileX: 2,
		tileY: 1,
		visible: true
	});

	new Actor({
		attackPower: 10,
		hpMax: 150,
		showHP: true,
		spriteSheet: "sheet_characters.png",
		spriteX: 256,
		spriteY: 192,
		team: TEAM_MOB,
		tileX: 1,
		tileY: 2,
		visible: true
	});

	new Actor({
		attackPower: 25,
		hpMax: 50,
		showHP: true,
		spriteSheet: "sheet_characters.png",
		spriteX: 0,
		spriteY: 64,
		team: TEAM_MOB,
		tileX: 2,
		tileY: 2,
		visible: true
	});

	for (var i = 0; i < 10; i++) {
		new Actor({
			attackPower: 5,
			hpMax: 20,
			showHP: true,
			spriteSheet: "sheet_characters.png",
			spriteX: 0,
			spriteY: 576 + 64,
			team: TEAM_MOB,
			tileX: i,
			tileY: 0,
			visible: true
		});
	}

	callback();

};

function nextTurn () {
	var actor = actors[game.actorTurnId];
	if (actor) actor.went = true;

	game.actorTurnId = getActorIdByNextTurn();
	actor = actors[game.actorTurnId];

	if (actor.team == TEAM_MOB) {
		doMobTurn(actor);
	}

	drawScreen();
};

function rand (min, max) {
	return (Math.round(Math.random() * (max - min)) + min);
};

load(init);

}());
