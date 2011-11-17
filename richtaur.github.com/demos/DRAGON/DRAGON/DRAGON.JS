//ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»
//º                        ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿                           º
//º                        ³  D R A G O N I E R  ³                           º
//º                        ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ                           º
//º                                                                          º
//º                     - Programming by Matt Hackett -                      º
//º                                                                          º
//º               - Story by Matt Hackett and Jim MacDonald -                º
//º                                                                          º
//º                      - Artwork by Michael Hackett -                      º
//º                                                                          º
//ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼

DEFINT("A-Z")

function Arrow (ax, miny, maxy, aclr) {}
function BattleItems (plib) {}
function ChooseTarget (pt, ttarget) {}
function GetInput$ (gx, gy, length, gerase$) {}
function Joy () {}
function Location (lx, ly) {}
function PM (pmn) {}
function ran (n1, n2) {}
function Surrounding (st) {}
function YesNo (YNText$) {}

function About (a) {}
function Battle () {}
function Box (startx, endx) {}
function Cast (caster, sspell) {}
function CastInv () {}
function center (ctext$, cline, cclr) {}
function CleanUp () {}
function delay (deler) {}
function DoBattle () {}
function DoDamage (forp, whi, ddamage) {}
function DoDeath (ddfp, ddp) {}
function DoFoeMove (f) {}
function DoPlayerMove (p) {}
function DrawBattle () {}
function DrawFile (siz, drf$) {}
function DrawScreen (dweh) {}
function DrawTile (tx, ty, cx, cy) {}
function File (FileType) {}
function Fishery () {}
function FleeBattle () {}
function Flicker (flx, fly, fls) {}
function GameOver () {}
function getch () {}
function GetGraphics () {}
function GetMoves () {}
function GetName (p) {}
function GetPlayer (p) {}
function InitBattle (B) {}
function Init () {}
function Inventory () {}
function LevelUp (p) {}
function LoadMap () {}
function Main () {}
function Message (mes$) {}
function NotEnoughGold () {}
function Options () {}
function Pause () {}
function PlayWave (WFile$) {}
function PrintOut () {}
function QuitGame () {}
function RandTalk () {}
function Search (find) {}
function SellItems (sellclr) {}
function SetStats () {}
function ShopArmor (Available) {}
function ShopChurch () {}
function ShopInn (RoomPrice) {}
function ShopItem (Available) {}
function ShopWeapon (Available) {}
function ShopWhore (shp) {}
function Status () {}
function TestReturn () {}
function TestStep () {}
function ThankYou (tyline) {}
function UseItem (ItemToUse, p) {}
function Warp (warpx, warpy) {}
function Welcome () {}
function WonBattle () {}
function WriteReg (Reg, Value) {}

//@Started programming on May 3rd.

try {
CLEAR(undefined, undefined, 500)
RANDOMIZE(TIMER)

const TRUE = -1
const FALSE = 0
const NUMITEMS = 15
const NUMFILES = 58

const WON = -1
const FLEE = -2
const NONE = -4

const DEATH = -1
const POISON = -2

const GOOD = -1
const BAD = -2

const ATTACK = -3
const RETREAT = -4
const SPECIAL = -5
const NOTING = -6

const BLAST = -7
const HEAL = -8
const BARRIER = -9
const HOLYFIRE = -10
const TREMOR = -11
const NUKE = -12

const UB = 159
const DB = 127
const LB = 158
const RB = 126
const YB = 2
const XB = 6
const AB = 8
const BB = 3
const NORM = 142

var FoeType = TYPE(function () {
	this.hp = new Number()
	this.hp = new Number()
	this.xp = new Number()
	this.gold = new Number()
	this.ap = new Number()
	this.dp = new Number()
	this.dx = new Number()
	this.move = new Number()
	this.action = new Number()
	this.target = new Number()
	this.num = new Number()
	this.x = new Number()
	this.y = new Number()
	this.state = new Number()
	this.size = new Number()
	this.pname = new String()
})

var TileType = TYPE(function () {
	this.x = new Number()
	this.y = new Number()
	this.style = new Number()
})

var YouType = TYPE(function () {
	this.x = new Number()
	this.y = new Number()
	this.across = new Number()
	this.down = new Number()
	this.gold = new Number()
	this.steps = new Number()
	this.leader = new Number()
	this.battles = new Number()
	this.exist = new Number()
	this.mango = new Number()
	this.CanRun = new Number()
	this.pauser = new Number()
})

var PlayerType = TYPE(function () {
	this.hp = new Number()
	this.hpmax = new Number()
	this.mp = new Number()
	this.mpmax = new Number()
	this.lv = new Number()
	this.xp = new Number()
	this.total = new Number()
	this.st = new Number()
	this.dx = new Number()
	this.iq = new Number()
	this.ap = new Number()
	this.dp = new Number()
	this.armor = new Number()
	this.weapon = new Number()
	this.action = new Number()
	this.x = new Number()
	this.y = new Number()
	this.target = new Number()
	this.state = new Number()
	this.pname = new String()
})

var ItemType = TYPE(function () {
	this.cost = new Number()
	this.amount = new Number()
	this.ap = new Number()
	this.dp = new Number()
	this.itemcol = new Number()
	this.label = new String()
})

var SpellType = TYPE(function () {
	this.cost = new Number()
	this.own = new Number()
	this.spellcol = new Number()
	this.spellname = new String()
})

var MapType = TYPE(function () {
	this.monsters = new Number()
	this.level = new Number()
	this.before = new Number()
	this.occurance = new Number()
	this.num = new Number()
	this.across = new Number()
	this.down = new Number()
	this.area = new String()
})

var UKEY$, DKEY$, LKEY$, RKEY$
var ESCAPEKEY$, SPACEKEY$, ENTERKEY$
var GFiles$ = new Array(), Success
var text$ = new Array()
var BattleStatus, Radius = new Number()

//@Start graphics arrays
var back = new Array()

var hero = new Array(), hero2 = new Array(), hero3 = new Array()
var dead = new Array(), dead2 = new Array(), dead3 = new Array()
var ped = new Array(), ped2 = new Array(), ped3 = new Array()
var king = new Array(), merchant = new Array(), folk = new Array(), folk2 = new Array()
var fish = new Array()

var wall = new Array(), wall2 = new Array(), wall3 = new Array(), wall4 = new Array()
var town = new Array(), temple = new Array()

var river = new Array(), ocean = new Array()
var grass = new Array(), forest = new Array()
var candle = new Array(), pot = new Array(), table = new Array(), door = new Array(), chest = new Array()
var floor = new Array(), mount = new Array(), mount2 = new Array(), rock = new Array(), rock2 = new Array()

var jaw = new Array(), drape = new Array(), eagle = new Array()
var widow = new Array(), chair = new Array()

var darklord = new Array()
var beast = new Array(), jack = new Array()
var dragon = new Array(), dragon2 = new Array(), dragon3 = new Array()
var ghost = new Array(), genie = new Array(), goblin = new Array(), skeleton = new Array(), wolf = new Array()
var orc = new Array(), knight = new Array(), knight2 = new Array(), slime = new Array(), ghoul = new Array()

var block = new Array(), brick = new Array(), pad = new Array()
//@End graphic arrays!

var tile = new TileType(50, 50)
var you = new YouType()

var player = new PlayerType(3)
var item = new ItemType(NUMITEMS)
var spell = new SpellType(3, 11)
var map = new MapType()
var foe = new FoeType(4)
var FoeStats = new FoeType(11)

//@Game status variables
var Crown, MasterKey
var TalkExpedition, TNT

var BurgDoorInn, BurgDoorShop
var CdaleDoorInn, CdaleDoorChest, CdaleDoorGate

Init(function () {
	GetGraphics(function () {
		GetName(1, function () {
			LoadMap(function () {
				DrawScreen(TRUE)
				SetStats()
				Main()
			})
		})
	})
})

} catch (ERR) {
	ErrorCatch(ERR)
}

function ErrorCatch(ERR) {
console.log('ErrorCatch: ', ERR);
	BEEP()
	CLS()
	COLOR(14)
	PRINT("Error!")
	getch(function () {
		CLS()
		COLOR(7); PRINT("ERROR "+ ERR)
		switch (ERR) {
			case 6:
				PRINT("There has been an overflow in DRAGON.")
				PRINT("Something is probably wrong")
				PRINT("with some files..."); break
			case 53:
				PRINT("You have a missing file.")
				PRINT("Check README.TXT if you have it")
				PRINT("for all files DRAGON requires."); break
			case 76:
				PRINT("You do not have a DRAGON directory.")
				PRINT("This game should have been copied")
				PRINT("with its installation program."); break
			default:
				PRINT("A miscellaneous error has occured...")
				PRINT("If this error continues, try")
				PRINT("re-installing DRAGON.  Also, if")
				PRINT("you want to keep your character,")
				PRINT("copy DRAGON.SAV into a different")
				PRINT("directory before installation."); break
		}
		PRINT()
		PRINT("DRAGON by Matthew Hackett")
		getch(function () {
			CleanUp()
			SYSTEM()
		})
	})
}

function About (a, callback) {

	CLS()
	COLOR(9)

	PRINT("              DRAGONIER               ")
	PRINT()
	PRINT("    You have ran Dragonier "+ a+ " times.")
	LOCATE(5, 1)
	PRINT("ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT("³                                      ³")
	PRINT("³                                      ³")
	PRINT("³                                      ³")
	PRINT("³                                      ³")
	PRINT("³                                      ³")
	PRINT("³                                      ³")
	PRINT("ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

	var place = 1; PutAbout()

	PlayWave("MATT")

	INKEY$(function (kbhit$) {
		switch (kbhit$) {
			case UKEY$:
				if (place > 1) place = place - 1
				PutAbout(); break
			case DKEY$:
				if (place < 37) place = place + 1
				PutAbout(); break
			//CASE YB, XB, AB, BB: ERASE text$: EXIT SUB
			case SPACEKEY$: case ENTERKEY$: delete text$; EXIT('removing from about ...'); return callback()
		}
	})

	function PutAbout() {
		LOCATE(6, 2)
		for (var i = place; i <= place + 5; i++) {
			LOCATE (undefined, 2); PRINT(text$[i])
		}; return
	}

}

function Arrow (ax, miny, maxy, aclr, callback) {

	var cry = miny
	COLOR(aclr); LOCATE(cry, ax); PRINT(">")

	INKEY$(function (kbhit$) {
		if (kbhit$ != "") {
			COLOR(0); LOCATE(cry, ax); PRINT(">")
			switch (kbhit$) {
				case UKEY$: if (cry > miny) cry = cry - 1; else cry = maxy; break
				case DKEY$: if (cry < maxy) cry = cry + 1; else cry = miny; break
				case ENTERKEY$: case SPACEKEY$: EXIT(); return callback(cry)
				case ESCAPEKEY$: EXIT(); return callback(FALSE)
			}
			COLOR(aclr); LOCATE(cry, ax); PRINT(">")
		}
	})

}

function Battle () {

/*
	DO
		GetMoves
		CLS
		DrawBattle
		DoBattle
	LOOP WHILE BattleStatus = NONE

*/
	switch (BattleStatus) {
		case FLEE: COLOR(15); Message("You fled the scenario!"); Pause(); break
		case WON: WonBattle(); break
	}

	CLS()
	SetStats()
	DrawScreen(TRUE)

}

function BattleItems (plib) {

	COLOR(15)
	LOCATE(4, 1);  Box(11, 23)
	LOCATE(12, 4); PRINT(">INVENTORY")
	LOCATE(22, 4); PRINT(" Exit")
	var ass = 13
	for (var n = 1; n <= NUMITEMS; n++) {
		if (item[n].amount > 0) {
			LOCATE(ass, 5)
			PRINT(item[n].label$ + " " + item[n].amount)
			item[n].itemcol = ass
			ass = ass + 1
		} else {
			item[n].itemcol = 1
		}
	}

	Arrow(4, 13, 22, 9, function (choice) {
		switch (choice) {
			case FALSE: case 22: EXIT(); return FALSE
			default:
				LOCATE(18, 1); COLOR(15)
				for (var m = 1; m <= NUMITEMS; m++) {
					if (choice = item[m].itemcol) {
						if (m > 10) {
							player[plib].action = m
							DrawBattle()
							Message(item[player[plib].action].label$)
							if (ChooseTarget(plib, GOOD) == FALSE) EXIT(); return FALSE
							EXIT(); return TRUE
						} else {
							PlayWave("BEEP")
						}
					}
				}
		}
	})

}

function Box (startx, endx) {
	LOCATE(startx, 1); PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	for (var i = startx + 1; i <= endx - 1; i++) {
		LOCATE(i, 1); PRINT(TAB(3)+ "³                                    ³") }
	LOCATE(endx, 1); PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")
}

function Cast (caster, sspell) {

	COLOR(15)

	player[caster].mp = player[caster].mp - spell[caster, sspell].cost

	switch (sspell) {
		case 1:
			Message("BLAST")
			var i2 = player[caster].y; var ig = 1
			for (var i = player[caster].x; i <= foe[player[caster].target].x; i -= 3) {
				var ass = ran(1, 2); ig = ig + 1
				if (ran(0, 1)) ass = -ass
				CIRCLE(i, i2 + ass, ran(3, 13) + ig, ran(41, 44))
			} // i
			//damage = (ran(@, @)
			if (damage < 0) damage = 0
			DoDamage(BAD, player(caster).target, damage); break

		case 2:
			Message("HEAL")
			for (var index = 1; index <= 3; index++) {
				var ig = 0
				for (var i = start; i <= start - 25; i--) {
					ig = ig + 1
					CIRCLE(ran(0, 25) + (player[player[caster].target].x - 5, ran(0, 25) + (player[player[caster].target].y - 5)), 1, 31)
				}
			} // index
			player[player[caster].target].hp = player[player[caster].target].hp + (ran(0, player[caster].iq - 1) + 10)
			if (player[player[caster].target].hp > player[player[caster].target].hpmax) player[player[caster].target].hp = player[player[caster].target].hpmax
			Pause(); break

		case 3:
			Message("BARRIER")
			player[player[caster].target].state = BARRIER
			Pause(); break

		case 4:
			Message("HOLY FIRE")
			damage = (player[caster].iq * player[caster].lv) - foe[player[caster].target].dp
			foe[player[caster].target].ap = foe[player[caster].target].ap / 2
			if (damage < 0) damage = 0
			DoDamage(BAD, player[caster].target, damage); break

		case 5:
			Message("TREMOR"); break

		case 6:
			Message("N U K E"); break

	}

}

function CastInv () {

}

function center (ctext$, cline, cclr) {
	if (cclr > -1) COLOR(cclr)
	LOCATE(cline, 20 - (LEN(ctext$) / 2)); PRINT(ctext$)
}

function ChooseTarget (pt, ttarget) {
console.log("ChooseTarget()");

/*
 t = 1: ERASE back

 IF ttarget = BAD THEN
  WHILE foe(t).state = DEATH
   t = t + 1
   IF t > map.num THEN t = 1
  WEND
  GET (foe(t).x, foe(t).y)-(foe(t).x + foe(t).size, foe(t).y + foe(t).size), back
  LINE (foe(t).x, foe(t).y)-(foe(t).x + foe(t).size, foe(t).y + foe(t).size), 31
  LINE (foe(t).x, foe(t).y + foe(t).size)-(foe(t).x + foe(t).size, foe(t).y), 31
 ELSE
  WHILE player(t).state = DEATH
   t = t + 1
   IF t > you.exist THEN t = 1
  WEND
  GET (player(t).x, player(t).y)-(player(t).x + foe(t).size, player(t).y + foe(t).size), back
  LINE (player(t).x, player(t).y)-(player(t).x + foe(t).size, player(t).y + foe(t).size), 31
  LINE (player(t).x, player(t).y + foe(t).size)-(player(t).x + foe(t).size, player(t).y), 31
 END IF

 DO
   'Control = Joy
   'IF Control > 0 THEN
   'SELECT CASE Control
   kbhit$ = INKEY$
   IF kbhit$ <> "" THEN
   SELECT CASE kbhit$
    CASE SPACEKEY$: ChooseTarget = TRUE: player(pt).target = t: EXIT DO
    CASE ESCAPEKEY$: ChooseTarget = FALSE: EXIT DO
    CASE ELSE:
     IF ttarget = BAD THEN
      PUT (foe(t).x, foe(t).y), back, PSET
      t = t + 1: IF t > map.num THEN t = 1
      WHILE foe(t).state = DEATH
       t = t + 1
       IF t > map.num THEN t = 1
      WEND
      ERASE back: GET (foe(t).x, foe(t).y)-(foe(t).x + foe(t).size, foe(t).y + foe(t).size), back
      LINE (foe(t).x, foe(t).y)-(foe(t).x + foe(t).size, foe(t).y + foe(t).size), 31
      LINE (foe(t).x, foe(t).y + foe(t).size)-(foe(t).x + foe(t).size, foe(t).y), 31
     ELSE
      PUT (player(t).x, player(t).y), back, PSET
      t = t + 1: IF t > you.exist THEN t = 1
      WHILE player(t).state = DEATH
       t = t + 1
       IF t > you.exist THEN t = 1
      WEND
      ERASE back: GET (player(t).x, player(t).y)-(player(t).x + 15, player(t).y + 15), back
      LINE (player(t).x, player(t).y)-(player(t).x + 15, player(t).y + 15), 31
      LINE (player(t).x, player(t).y + 15)-(player(t).x + 15, player(t).y), 31
     END IF
   END SELECT
   END IF

 LOOP

 IF ttarget = BAD THEN
  PUT (foe(t).x, foe(t).y), back, PSET
 ELSE
  PUT (player(t).x, player(t).y), back, PSET
 END IF

*/
}

function CleanUp () {
	SCREEN(9)
	SCREEN(0)
	delete hero, hero2, hero3, dead, dead2, dead3, ped, ped2, ped3, back
	delete king, merchant, folk, folk2, fish, wall, wall2, wall3, wall4
	delete town, temple, block, brick, pad, river, ocean, grass, forest
	delete candle, pot, table, door, chest, floor, mount, mount2, rock, rock2
	delete jaw, drape, eagle, widow, chair, darklord, beast, jack, ghoul
	delete ghost, genie, goblin, skeleton, wolf, orc, knight, knight2, slime
	delete tile, player, item, spell, foe, FoeStats, dragon, dragon2, dragon3
}

function delay (deler, callback) {
	setTimeout(callback, Math.min(Math.max(deler, 1), 20) * 100)
}

function DoBattle () {

	for (var NextMove = 300; NextMove >= 1; NextMove--) {
		for (var n = 1; n <= you.exist; n++) {
			if (NextMove == player[n].dx) DoPlayerMove(n)
			if (BattleStatus != NONE) return
		}
		for (var n = 1; n <= map.num; n++) {
			if (NextMove == foe[n].dx) DoFoeMove(n)
			if (BattleStatus != NONE) return
		}
	}

}

/*
SUB DoDamage (forp, whi, ddamage)

 ERASE back

 IF forp = BAD THEN
  foe(whi).hp = foe(whi).hp - ddamage
  GET (foe(whi).x, foe(whi).y)-(foe(whi).x + foe(whi).size, foe(whi).y + foe(whi).size), back
  FOR i = 193 TO 250
  delay (100)
  COLOR i: LOCATE (foe(whi).y / 8) + 2, (foe(whi).x / 8): PRINT ddamage
  NEXT: Pause
  PUT (foe(whi).x, foe(whi).y), back, PSET
  IF foe(whi).hp < 1 THEN CALL DoDeath(BAD, whi)
 ELSE
  player(whi).hp = player(whi).hp - ddamage
  GET (player(whi).x, player(whi).y)-(player(whi).x + 15, player(whi).y + 15), back
  IF player(whi).hp < 0 THEN player(whi).hp = 0
  COLOR 15: LOCATE 19 + whi, 18: PRINT USING "####/####"; player(whi).hp; player(1).hpmax
  FOR i = 193 TO 250
  delay (100)
  COLOR i: LOCATE (player(whi).y / 8) + 2, (player(whi).x / 8): PRINT ddamage
  NEXT: Pause
  PUT (player(whi).x, player(whi).y), back, PSET
  IF player(whi).hp < 1 THEN CALL DoDeath(GOOD, whi)
 END IF

END SUB

SUB DoDeath (ddfp, ddp)

 IF ddfp = BAD THEN
  FOR index = 1 TO 10
  FOR a = foe(ddp).x TO foe(ddp).x + foe(ddp).size
  FOR d = foe(ddp).y TO foe(ddp).y + foe(ddp).size
  IF POINT(a, d) > 0 THEN PSET (a, d), ran(193, 255)
  NEXT: NEXT: NEXT: PlayWave "FDEATH"
  DrawBattle
  foe(ddp).state = DEATH
  a = TRUE
  FOR i = 1 TO map.num
   IF foe(i).state <> DEATH THEN a = FALSE
  NEXT: IF a = TRUE THEN BattleStatus = WON
 ELSE
  LOCATE 1, 1: COLOR 4
  SELECT CASE ddp
   CASE 1: PUT (player(1).x, player(1).y), dead, PSET
   CASE 2: PUT (player(2).x, player(2).y), dead2, PSET
   CASE 3: PUT (player(3).x, player(3).y), dead3, PSET
  END SELECT
  a$ = player(ddp).pname$
  DO
  i = i + 1
  LOOP UNTIL RIGHT$(LEFT$(a$, i), 1) = " "
  a$ = LEFT$(a$, i) + "died!"
  FOR i = 193 TO 240
  delay (50)
  COLOR i: Message a$
  NEXT: Pause
  player(ddp).state = DEATH
  DrawBattle
  a = TRUE
  FOR i = 1 TO you.exist
   IF player(i).state <> DEATH THEN a = FALSE
  NEXT: IF a = TRUE THEN GameOver
 END IF

END SUB

SUB DoFoeMove (f)
IF foe(f).state <> DEATH THEN
 DO: foe(f).target = ran(1, you.exist)
 LOOP UNTIL player(foe(f).target).state <> DEATH
 dx = player(foe(f).target).x
 dy = player(foe(f).target).y
 dx2 = dx + 15
 dy2 = dy + 15
 Flicker foe(f).x, foe(f).y, foe(f).size
 SELECT CASE foe(f).action
  CASE NOTHING: Message "...": Pause
  CASE ATTACK
   PlayWave "FATTACK"
   FOR i = 193 TO 255
   delay (100)
   LINE (dx2 + 1, dy - 1)-(dx - 1, dy2 + 1), i
   NEXT
   damage = foe(f).ap + PM(player(foe(f).target).lv * 5)
   damage = damage - player(foe(f).target).dp
   IF damage < 1 THEN damage = 1
   DoDamage GOOD, foe(f).target, damage
  CASE SPECIAL
   SELECT CASE foe(f).num
    CASE 4
     Message "FANG"
     PlayWave "FANG"
     damage = ran(0, player(foe(f).target).hp - 1)
     DoDamage GOOD, foe(f).target, damage
    CASE 6
     Message "ROTTING FLESH!"
     PlayWave "POISON"
     damage = ran(0, 7) + player(foe(f).target).lv
     DoDamage GOOD, foe(f).target, damage
     player(foe(f).target).state = POISON
    CASE 10
     Message "JACKATTACK"
     PlayWave "JATTACK"
     xx = foe(f).x
     yy = foe(f).y
     GET (xx, yy)-(foe(f).size, yy + foe(f).size), back
     DO
      PUT (xx, yy), back, PSET
      ERASE back
      IF xx > 286 THEN EXIT DO
      IF yy > 166 THEN EXIT DO
      IF yy < player(foe(f).target).y THEN yy = yy + 1
      IF yy > player(foe(f).target).y THEN yy = yy - 1
      IF xx < player(foe(f).target).x THEN xx = xx + 1
      GET (xx, yy)-(xx + foe(f).size, yy + foe(f).size), back
      PUT (xx, yy), jack, PSET
      delay (200)
     LOOP UNTIL xx = player(foe(f).target).x
     DrawBattle
     damage = ran(1, 10)
     IF damage < 1 THEN damage = 1
     IF you.mango > 0 THEN you.mango = you.mango - 1
     DoDamage GOOD, foe(f).target, damage
   END SELECT
 END SELECT
END IF
END SUB

SUB DoPlayerMove (p)
IF player(p).state <> DEATH THEN
 COLOR 15
 SELECT CASE player(p).state
  CASE POISON
   Message "The poison does its work...": Pause
   damage = ran(0, 4) + (player(p).hp / 10)
   DoDamage GOOD, p, damage
   DrawBattle
 END SELECT
 '@@FIX this shit!! ...stupid shortcuts...
 dx = foe(player(p).target).x
 dy = foe(player(p).target).y
 dx2 = dx + foe(player(p).target).size
 dy2 = dy + foe(player(p).target).size
 Flicker player(p).x, player(p).y, 16
 SELECT CASE player(p).action
  CASE ATTACK
   WHILE foe(player(p).target).state = DEATH
    player(p).target = player(p).target + 1
    IF player(p).target > map.num THEN player(p).target = 1
   WEND
   FOR it = 193 TO 255
    delay (100)
    LINE (dx2 + 1, dy - 1)-(dx - 1, dy2 + 1), it
   NEXT
   IF p = 1 THEN PlayWave "PATTACK1"
   IF p = 2 THEN PlayWave "PATTACK2"
   IF p = 3 THEN PlayWave "PATTACK3"
   damage = player(p).ap + PM(player(p).lv)
   damage = damage - foe(player(p).target).dp
   IF damage < 0 THEN damage = 0
   DoDamage BAD, player(p).target, damage
  CASE RETREAT
   IF you.CanRun = TRUE THEN
    BattleStatus = FLEE
   ELSE
    Message "Couldn't run!!"
   END IF
  CASE SPECIAL
   SELECT CASE p
    CASE 1:
     Message "PSYCHIC CURRENT!!"
     a = ran(player(p).iq, player(p).lv)
     player(p).st = player(p).st + a
     foe(player(p).target).dx = foe(player(p).target).dx - a
     IF foe(player(p).target).dx < 1 THEN foe(player(p).target).dx = 1
     FOR i = 25 TO 1 STEP -5
      CIRCLE (foe(player(p).target).x + foe(player(p).target).size / 2, foe(player(p).target).y + foe(player(p).target).size / 2), i, 14
     NEXT: PlayWave "PSYCHIC"
    CASE 2
    CASE 3
   END SELECT
  CASE BLAST
  CASE HEAL
  CASE BARRIER
  CASE HOLYFIRE
  CASE TREMOR
  CASE NUKE
  CASE 11 '@Herb
   Message "Using Herb..."
   FOR Radius = -6.28 TO 6.28 STEP .1
    CIRCLE (player(player(p).target).x + 8, player(player(p).target).y + 8), 10, 31, Radius, Radius
   NEXT
   player(player(p).target).hp = player(player(p).target).hp + ran(20, 30)
   IF player(player(p).target).hp > player(player(p).target).hpmax THEN player(player(p).target).hp = player(player(p).target).hpmax
   item(player(p).action).amount = item(player(p).action).amount - 1
 END SELECT
 Pause
 DrawBattle
END IF
END SUB
*/

function DrawBattle () {

	CLS; DrawScreen(FALSE)

	COLOR(15)
	LOCATE(18, 2); PRINT("ÚÄÄÄÄÄÄÄÄÄÄ¿ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿ÚÄÄÄÄÄÄÄÄÄ¿")
	LOCATE(19, 2); PRINT("³          ³³             ³³ ATTACK  ³")
	LOCATE(20, 2); PRINT("³          ³³HP:           ³³ SPECIAL ³")
	LOCATE(21, 2); PRINT("³          ³³HP:           ³³ SPELL   ³")
	LOCATE(22, 2); PRINT("³          ³³HP:           ³³ ITEM    ³")
	LOCATE(23, 2); PRINT("ÀÄÄÄÄÄÄÄÄÄÄÙÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙÀÄÄÄÄÄÄÄÄÄÙ")
	LOCATE(19, 16); PRINT(player[you.leader].pname)
	LOCATE(20, 18); PRINT_USING("####/####", player[1].hp, player[1].hpmax)
	if (you.exist >= 2) { LOCATE(21, 18); PRINT_USING("####/####", player[2].hp, player(2).hpmax) }
	if (you.exist >= 3) { LOCATE(22, 18); PRINT_USING("####/####", player[3].hp, player(3).hpmax) }

	for (var i = 1; i <= you.exist; i++) {
		if (player[i].state != DEATH) {
			if (i == 1) PUT(player[1].x, player[1].y, hero, PSET)
			if (i == 2) PUT(player[2].x, player[2].y, hero2, PSET)
			if (i == 3) PUT(player[3].x, player[3].y, hero3, PSET)
		} else {
			if (i == 1) PUT(player[1].x, player[1].y, dead, PSET)
			if (i == 2) PUT(player[2].x, player[2].y, dead2, PSET)
			if (i == 3) PUT(player[3].x, player[3].y, dead3, PSET)
		}
	}

	for (var i = 1; i <= map.num; i++) {
		if (foe[i].hp > 0) {
			LOCATE(i + 18, 3); PRINT(foe[i].pname)
			switch (foe[i].num) {
				case 1: PUT(foe[i].x, foe[i].y, slime, PSET); break
				case 2: PUT(foe[i].x, foe[i].y, goblin, PSET); break
				case 3: PUT(foe[i].x, foe[i].y, orc, PSET); break
				case 4: PUT(foe[i].x, foe[i].y, wolf, PSET); break
				case 5: PUT(foe[i].x, foe[i].y, skeleton, PSET); break
				case 6: PUT(foe[i].x, foe[i].y, ghoul, PSET); break
				case 10: PUT(foe[i].x, foe[i].y, jack, PSET); break
			}
		}
	}

}

function DrawFile (siz, drf$, callback) {
	var xhr = new XMLHttpRequest()
	xhr.open("GET", "DRAGON/" + drf$, false) // TODO <-- what? make a helper?
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var line = 0
			var lines = xhr.responseText.split("\n")
			for (var a = 1; a <= siz; a++) {
				for (var d = 1; d <= siz; d++) {
					var clr = lines[line++]
					PSET(d, a, clr)
				}
			}
			setTimeout(callback, 1)
		}
	}
	xhr.send()
}

function DrawScreen (dweh) {
console.log('DrawScreen()')
	for (var a = -you.across; a <= you.across; a++) {
		for (var d = -you.down; d <= you.down; d++) {
			if (a == 0 && d == 0 && dweh == TRUE) { } else DrawTile(Number(you.x) + a, Number(you.y) + d, 10 + a, 6 + d)
		}
	}
	if (dweh == TRUE) {
		if (you.leader == 1) PUT(tile[10][6].x, tile[10][6].y, hero, PSET)
		if (you.leader == 2) PUT(tile[10][6].x, tile[10][6].y, hero2, PSET)
		if (you.leader == 3) PUT(tile[10][6].x, tile[10][6].y, hero3, PSET)
	}
}

function DrawTile (tx, ty, cx, cy) {
	var a = tile[cx][cy].x
	var d = tile[cx][cy].y
	if (tx in tile && ty in tile[tx]) {
		switch (tile[tx][ty].style) {
			case 0: LINE(a, d, a + 15, d + 15, 0, BF); break

			case 1: PUT(a, d, grass, PSET); break
			case 2: PUT(a, d, forest, PSET); break
			case 3: PUT(a, d, pot, PSET); break
			case 4: PUT(a, d, brick, PSET); break
			case 5: PUT(a, d, floor, PSET); break
			case 6: PUT(a, d, town, PSET); break
			case 7: PUT(a, d, chest, PSET); break
			case 8: PUT(a, d, block, PSET); break
			case 9: PUT(a, d, pad, PSET); break
			case 10: PUT(a, d, jaw, PSET); break
			case 11: PUT(a, d, chair, PSET); break
			case 12: PUT(a, d, rock2, PSET); break
			case 13: PUT(a, d, temple, PSET); break

			case 21: PUT(a, d, wall, PSET); break
			case 22: PUT(a, d, wall2, PSET); break
			case 23: PUT(a, d, ocean, PSET); break
			case 24: PUT(a, d, river, PSET); break
			case 25: PUT(a, d, table, PSET); break
			case 26: PUT(a, d, candle, PSET); break
			case 27: PUT(a, d, door, PSET); break
			case 28: PUT(a, d, wall3, PSET); break
			case 29: PUT(a, d, eagle, PSET); break
			case 30: PUT(a, d, wall4, PSET); break
			case 31: PUT(a, d, drape, PSET); break
			case 32: PUT(a, d, widow, PSET); break
			case 33: PUT(a, d, mount, PSET); break
			case 34: PUT(a, d, mount2, PSET); break
			case 35: PUT(a, d, rock, PSET); break

			case 41: PUT(a, d, king, PSET); break
			case 42: PUT(a, d, merchant, PSET); break
			case 43: PUT(a, d, folk, PSET); break
			case 44: PUT(a, d, ped, PSET); break
			case 45: PUT(a, d, ped2, PSET); break
			case 46: PUT(a, d, ped3, PSET); break
			case 47: PUT(a, d, hero2, PSET); break
			case 48: PUT(a, d, hero3, PSET); break
			case 49: PUT(a, d, folk2, PSET); break
			case 50: PUT(a, d, fish, PSET); break

		}
	}
}

function File (FileType, callback) {

	var a$ = "DRAGON"
	COLOR(15); LOCATE(4, 1)
	PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT(TAB(3)+ "³>WHICH FILE?                      ³")
	PRINT(TAB(3)+ "³  DRAGON1.SAV                     ³")
	PRINT(TAB(3)+ "³  DRAGON2.SAV                     ³")
	PRINT(TAB(3)+ "³  DRAGON3.SAV                     ³")
	PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

	Arrow(4, 6, 8, 9, function (arrow) {
		switch (arrow) {
			case FALSE: return callback()
			case 6: a$ = a$ + "1"; break
			case 7: a$ = a$ + "2"; break
			case 8: a$ = a$ + "3"; break
		}; a$ = a$ + ".SAV"

		LOCATE(5, 1); COLOR(15)

		if (FileType == 1) {

			PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
			PRINT(TAB(3)+ "³>SAVING                           ³")
			PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

/*
  OPEN a$ FOR OUTPUT AS #1
   PRINT #1, Crown
   PRINT #1, MasterKey
   PRINT #1, BurgDoorInn
   PRINT #1, BurgDoorShop
   PRINT #1, CdaleDoorInn
   PRINT #1, CdaleDoorChest
   PRINT #1, CdaleDoorGate
   PRINT #1, TalkExpedition
   PRINT #1, TNT
   PRINT #1, you.x
   PRINT #1, you.y
   PRINT #1, you.across
   PRINT #1, you.down
   PRINT #1, you.gold
   PRINT #1, you.steps
   PRINT #1, you.battles
   PRINT #1, you.exist
   PRINT #1, you.mango
   PRINT #1, you.pauser
   PRINT #1, map.monsters
   PRINT #1, map.level
   PRINT #1, map.before
   PRINT #1, map.occurance
   PRINT #1, map.num
   PRINT #1, map.area$
   FOR i = 1 TO 3
    PRINT #1, player(i).hp
    PRINT #1, player(i).hpmax
    PRINT #1, player(i).mp
    PRINT #1, player(i).mpmax
    PRINT #1, player(i).lv
    PRINT #1, player(i).xp
    PRINT #1, player(i).total
    PRINT #1, player(i).st
    PRINT #1, player(i).dx
    PRINT #1, player(i).iq
    PRINT #1, player(i).ap
    PRINT #1, player(i).dp
    PRINT #1, player(i).armor
    PRINT #1, player(i).weapon
    PRINT #1, player(i).state
    PRINT #1, player(i).pname$
   NEXT
   FOR p = 1 TO 3
    FOR s = 1 TO 6
     PRINT #1, spell(p, s).own
    NEXT
   NEXT
   FOR i = 1 TO NUMITEMS
    PRINT #1, item(i).amount
   NEXT
   FOR a = 1 TO 50
   FOR d = 1 TO 50
    PRINT #1, tile(a, d).style
   NEXT: NEXT
  CLOSE : LOCATE 6, 1
*/

			PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
			PRINT(TAB(3)+ "³>SAVE                             ³")
			PRINT(TAB(3)+ "³ Finished saving.  Hit any key... ³")
			PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

		}

		if (FileType == 2) {

			PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
			PRINT(TAB(3)+ "³>LOADING                          ³")
			PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

			OPEN(a$, 1, function () {
				Crown = Number(INPUT(1))
				MasterKey = Number(INPUT(1))
				BurgDoorInn = Number(INPUT(1))
				BurgDoorShop = Number(INPUT(1))
				CdaleDoorInn = Number(INPUT(1))
				CdaleDoorChest = Number(INPUT(1))
				CdaleDoorGate = Number(INPUT(1))
				TalkExpedition = Number(INPUT(1))
				TNT = Number(INPUT(1))
				you.x = Number(INPUT(1))
				you.y = Number(INPUT(1))
				you.across = Number(INPUT(1))
				you.down = Number(INPUT(1))
				you.gold = Number(INPUT(1))
				you.steps = Number(INPUT(1))
				you.battles = Number(INPUT(1))
				you.exist = Number(INPUT(1))
				you.mango = Number(INPUT(1))
				you.pauser = Number(INPUT(1))
				map.monsters = Number(INPUT(1))
				map.level = Number(INPUT(1))
				map.before = Number(INPUT(1))
				map.occurance = Number(INPUT(1))
				map.num = Number(INPUT(1))
				map.area$ = INPUT(1)
				for (var i = 1; i <= 3; i++) {
					player[i].hp = Number(INPUT(1))
					player[i].hpmax = Number(INPUT(1))
					player[i].mp = Number(INPUT(1))
					player[i].mpmax = Number(INPUT(1))
					player[i].lv = Number(INPUT(1))
					player[i].xp = Number(INPUT(1))
					player[i].total = Number(INPUT(1))
					player[i].st = Number(INPUT(1))
					player[i].dx = Number(INPUT(1))
					player[i].iq = Number(INPUT(1))
					player[i].ap = Number(INPUT(1))
					player[i].dp = Number(INPUT(1))
					player[i].armor = Number(INPUT(1))
					player[i].weapon = Number(INPUT(1))
					player[i].state = Number(INPUT(1))
					player[i].pname$ = INPUT(1)
				}
				for (var p = 1; p <= 3; p++) {
					for (var s = 1; s <= 6; s++) {
						spell[p][s].own = Number(INPUT(1))
					}
				}
				for (var i = 1; i <= NUMITEMS; i++) {
					item[i].amount = Number(INPUT(1))
				}
				for (var a = 1; a <= 50; a++) {
					for (var d = 1; d <= 50; d++) {
						tile[a][d].style = Number(INPUT(1))
				}; }
			}) ;  LOCATE(6, 1)

			PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
			PRINT(TAB(3)+ "³>LOAD                             ³")
			PRINT(TAB(3)+ "³ Finished loading.  Hit any key...³")
			PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

		}
		getch(function () {
			DrawScreen(TRUE)
			callback()
		})
	})
}

function Fishery () {
	COLOR(9)
	Message("Welcome to my Fishery, youngin!"); getch(function () {
		YesNo("Would you like to buy a fish for 50? <Y/N>", function (result) {
			if (result == TRUE) {
				if (you.gold >= 50) {
					you.gold = you.gold - 50
					item[14].amount = item[14].amount + 1
					ThankYou(4, done)
				} else {
					PlayWave("BEEP")
					done()
				}
			}
			function done () {
				if (ran(0, 24) == 0) {
					Message("Well here's a fish anyway!")
					PlayWave("TUNE")
					item[14].amount = item[14].amount + 1
				} else {
					Message("Oh well...")
				}
				Pause(function () {
					CLS()
					DrawScreen(TRUE)
				})
			}
		})
	})
}

// TODO: connect callbacks
function Flicker (flx, fly, fls, callback) {

	delete back
	back = GET(flx, fly, flx + fls, fly + fls)

	for (var i = 1; i <= 3; ++i) {
		LINE(flx, fly, flx + fls, fly + fls, 31, B)
		delay(1000, function () {
			PUT(flx, fly, back, PSET)
			delay(1000)
		})
	}

}

/*
SUB GameOver

 CLS

 FOR i = 193 TO 243
  delay (200)
  CALL center("You have failed...", 11, i)
 NEXT: delay (10000)
 FOR i = 233 TO 193 STEP -1
  delay (200)
  CALL center("You have failed...", 11, i)
 NEXT

 Pause

 FOR i = 193 TO 243
  delay (50)
  CALL center("ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿", 9, i)
  CALL center("³>DRAGONIER                        ³", 10, i)
  CALL center("³ May 1996 by Matthew Hackett      ³", 11, i)
  CALL center("ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ", 12, i)
 NEXT
 FOR i = 233 TO 193 STEP -1
  delay (50)
  CALL center("ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿", 9, i)
  CALL center("³>DRAGONIER                        ³", 10, i)
  CALL center("³ May 1996 by Matthew Hackett      ³", 11, i)
  CALL center("ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ", 12, i)
 NEXT: QuitGame

END SUB
*/

function getch (callback) {
	INKEY$(function () {
		EXIT()
		callback()
	})
}

function GetGraphics (callback) {

	CLS() ; center("Initializing graphics...", 11, 15)

	var i = 0

	function fetch () {

		i++

		if (i <= 52) {
			var size = 16;
		} else if (i == 58) {
			var size = 64;
		} else {
			var size = 32;
		}

/*
TODO
file = "DARKLORD.HUG"
DrawFile(64, file, function () {
});
return;
*/

		DrawFile(size, GFiles$[i], function () {

			switch (i) {
				case 1: hero = GET(1, 1, 16, 16); break
				case 2: hero2 = GET(1, 1, 16, 16); break
				case 3: hero3 = GET(1, 1, 16, 16); break
				case 4: dead = GET(1, 1, 16, 16); break
				case 5: dead2 = GET(1, 1, 16, 16); break
				case 6: dead3 = GET(1, 1, 16, 16); break
				case 7: king = GET(1, 1, 16, 16); break
				case 8: merchant = GET(1, 1, 16, 16); break
				case 9: folk = GET(1, 1, 16, 16); break
				case 10: ped = GET(1, 1, 16, 16); break
				case 11: ped2 = GET(1, 1, 16, 16); break
				case 12: ped3 = GET(1, 1, 16, 16); break
				case 13: ghost = GET(1, 1, 16, 16); break
				case 14: skeleton = GET(1, 1, 16, 16); break
				case 15: goblin = GET(1, 1, 16, 16); break
				case 16: wolf = GET(1, 1, 16, 16); break
				case 17: genie = GET(1, 1, 16, 16); break
				case 18: orc = GET(1, 1, 16, 16); break
				case 19: knight = GET(1, 1, 16, 16); break
				case 20: knight2 = GET(1, 1, 16, 16); break
				case 21: slime = GET(1, 1, 16, 16); break
				case 22: grass = GET(1, 1, 16, 16); break
				case 23: forest = GET(1, 1, 16, 16); break
				case 24: pot = GET(1, 1, 16, 16); break
				case 25: brick = GET(1, 1, 16, 16); break
				case 26: floor = GET(1, 1, 16, 16); break
				case 27: town = GET(1, 1, 16, 16); break
				case 28: chest = GET(1, 1, 16, 16); break
				case 29: block = GET(1, 1, 16, 16); break
				case 30: pad = GET(1, 1, 16, 16); break
				case 31: wall = GET(1, 1, 16, 16); break
				case 32: wall2 = GET(1, 1, 16, 16); break
				case 33: wall3 = GET(1, 1, 16, 16); break
				case 34: ocean = GET(1, 1, 16, 16); break
				case 35: river = GET(1, 1, 16, 16); break
				case 36: table = GET(1, 1, 16, 16); break
				case 37: candle = GET(1, 1, 16, 16); break
				case 38: door = GET(1, 1, 16, 16); break
				case 39: jaw = GET(1, 1, 16, 16); break
				case 40: eagle = GET(1, 1, 16, 16); break
				case 41: drape = GET(1, 1, 16, 16); break
				case 42: wall4 = GET(1, 1, 16, 16); break
				case 43: widow = GET(1, 1, 16, 16); break
				case 44: chair = GET(1, 1, 16, 16); break
				case 45: mount = GET(1, 1, 16, 16); break
				case 46: mount2 = GET(1, 1, 16, 16); break
				case 47: rock = GET(1, 1, 16, 16); break
				case 48: rock2 = GET(1, 1, 16, 16); break
				case 49: folk2 = GET(1, 1, 16, 16); break
				case 50: fish = GET(1, 1, 16, 16); break
				case 51: template = GET(1, 1, 16, 16); break
				case 52: ghoul = GET(1, 1, 16, 16); break
				case 53: beast = GET(1, 1, 32, 32); break
				case 54: jack = GET(1, 1, 32, 32); break
				case 55: dragon = GET(1, 1, 32, 32); break
				case 56: dragon2 = GET(1, 1, 32, 32); break
				case 57: dragon3 = GET(1, 1, 32, 32); break
				case 58: darklord = GET(1, 1, 64, 64); break
			}

			if (i < NUMFILES) {
				fetch()
			} else if (i == NUMFILES) {
				callback()
			}

		})

	}

	fetch()

}

function GetInput$ (gx, gy, length, gerase$, callback) {

	LOCATE(gx, gy); PRINT(STRING$(length, gerase$))

	var a$ = ""

	INKEY$(function (kbhit$) {

		if (kbhit$ != "") {
			switch (kbhit$) {
				case 13: EXIT(); return callback(a$)
				case 8:
					if (LEN(a$) > 0) { a$ = LEFT$(a$, LEN(a$) - 1); LOCATE(gx, gy + LEN(a$)); PRINT(gerase$) }; break
				case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74: case 75: case 76: case 77: case 78: case 79: case 80: case 81: case 82: case 83: case 84: case 85: case 86: case 87: case 88: case 89: case 90: case 97: case 98: case 99: case 100: case 101: case 102: case 103: case 104: case 105: case 106: case 107: case 108: case 109: case 110: case 111: case 112: case 113: case 114: case 115: case 116: case 117: case 118: case 119: case 120: case 121: case 122:
					if (LEN(a$) < 10) a$ += String.fromCharCode(kbhit$).toUpperCase(); break
			}; LOCATE(gx, gy); PRINT(a$)
		}
	})

}

function GetMoves () {
	console.log('GetMoves()');
	COLOR(15)
/*
FOR g = 1 TO you.exist
 IF player(g).state <> DEATH THEN
restart:
 DrawBattle
 LINE (player(g).x, player(g).y)-(player(g).x + 15, player(g).y + 15), 31, B

 SELECT CASE Arrow(31, 19, 22, 9)
  CASE FALSE: player(g).action = RETREAT
  CASE 19
   player(g).action = ATTACK
   IF ChooseTarget(g, BAD) <> TRUE THEN GOTO restart
  CASE 20
   player(g).action = SPECIAL
   Message "PSYCHENESIS:"
   IF ChooseTarget(g, BAD) <> TRUE THEN GOTO restart
  CASE 21
   CastInv
   COLOR 15
   IF BattleItems(g) <> TRUE THEN GOTO restart
  CASE 22
   COLOR 15
   IF BattleItems(g) <> TRUE THEN GOTO restart
 END SELECT

 END IF
NEXT

FOR t = 1 TO map.num
 IF foe(t).hp > 0 THEN
  SELECT CASE foe(t).move
   CASE 1: foe(t).action = ATTACK
   CASE 2
    r = ran(1, 2)
    IF r = 1 THEN foe(t).action = ATTACK
    IF r = 2 THEN foe(t).action = SPECIAL
   CASE 3
    r = ran(0, 2)
    IF r = 0 THEN foe(t).action = NOTHING
    IF r = 1 THEN foe(t).action = ATTACK
    IF r = 2 THEN foe(t).action = SPECIAL
  END SELECT
 END IF
NEXT
*/
}

function GetName (index, callback) {

	CLS() ; COLOR(15)
	PRINT()
	PRINT()
	PRINT("ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT("³          WHAT SHALL YOU BE          ³")
	PRINT("³          MARKED AS IN THE           ³")
	PRINT("³          BOOK OF LEGENDS?           ³")
	PRINT("ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

	if (index == 1) PUT(152, 0, hero, PSET)
	if (index == 2) PUT(152, 0, hero2, PSET)
	if (index == 3) PUT(152, 0, hero3, PSET)

	GetInput$(8, 15, 10, "_", function (givem$) {
		if (LEN(givem$) < 1) {
			if (index == 1) givem$ = "RICHTER"
			if (index == 2) givem$ = "NATHIA"
			if (index == 3) givem$ = "THOEUS"
		}

		player[index].pname$ = givem$
		callback()

	})

}

function GetPlayer (p) {
	COLOR(15)
	switch (p) {
/*
case 2:
 a$ = "Greetings, " + player(1).pname$
 Message a$: Pause
 Message "I have heard of you and your  exploits...": Pause
 Message "So you are searching for King Ronan?": Pause
 Message "The last I heard of him he was going on an expedition": Pause
 Message "to the West Cave in search of a magic passage to Undo.": Pause
 Message "It is a land that is nearly   impossible to reach due to": Pause
 Message "its nasty weather and rocky   cliffs.  It is drenched with": Pause
 Message "golds and valable stones...   however also covered with": Pause
 Message "some of the most fearsome     creatures ever known to the   world!": Pause
 Message "Still interested?(Y/N)"
 FOR i = 1 TO 3
  DO
   Control = Joy
   IF Control > 0 THEN
    IF Control = YB THEN
     Message "Well then let's go!": Pause
     GOSUB ExitGetP
    END IF
    IF Control = BB THEN EXIT DO
   END IF
  LOOP
  Message "Oh now I thought you were     brave and courageous...": Pause
  Message "Won't you reconsider?(Y/N)"
 NEXT
 Message "Well I'm joining you anyway   and making you go.": Pause
 Message "This land is in trouble and   its good king missing is": Pause
 Message "hurting it greatly.  It needs a hero like you!": Pause
 Message "Here I'll even give you this:": Pause
 COLOR 14
 Message "You recieved 100!"
 you.gold = you.gold + 100
 PlayWave "TUNE"
 COLOR 15
 Message "Now let's head toward Burg - I know someone there who": Pause
 Message "has explosives to break the   West Cave barrier!": Pause
 GetName (p)
CASE 3
*/
}
/*
ExitGetP:
 IF p = 2 THEN tile(39, 10).style = 1
 '@IF p = 3 THEN
 player(p).state = 0
 you.exist = p
 you.mango = you.mango + 10
 PlayWave "TUNE"
 CLS
 DrawScreen (TRUE)
*/
}

function Init (callback) {

	try {

	CHDIR("C:\\DRAGON")

	PRINT("ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»")
	PRINT("º                        ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿                           º")
	PRINT("º                        ³  D R A G O N I E R  ³                           º")
	PRINT("º                        ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ                           º")
	PRINT("º                                                                          º")
	PRINT("º                     - Programming by Matt Hackett -                      º")
	PRINT("º                                                                          º")
	PRINT("º               - Story by Matt Hackett and Jim MacDonald -                º")
	PRINT("º                                                                          º")
	PRINT("º                      - Artwork by Michael Hackett -                      º")
	PRINT("º                                                                          º")
	PRINT("ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼")
	PRINT("Initialiizing...")
	PRINT("Checking sound card...")
/*
blarg = STICK(0)
CALL WriteReg(&H4, &H60)
CALL WriteReg(&H4, &H80)
B = INP(&H388)
CALL WriteReg(&H2, &HFF)
CALL WriteReg(&H4, &H21)
FOR x = 0 TO 130
a = INP(&H388)
NEXT x
C = INP(&H388)
CALL WriteReg(&H4, &H60)
CALL WriteReg(&H4, &H80)
*/
	Success = FALSE
/*
IF (B AND &HE0) = &H0 THEN
IF (C AND &HE0) = &HC0 THEN
Success = TRUE
END IF
END IF
IF Success <> TRUE THEN
BEEP: COLOR 4: PRINT "Sound card not detected...": getch
ELSE
PRINT "Detected sound card."
FOR Q = 1 TO &HF5
CALL WriteReg(Q, 0)
NEXT Q
END IF
*/

	for (var a = 1; a <= 19; a++) {
		for (var d = 1; d <= 11; d++) {
			tile[a][d].x = 16 * a
			tile[a][d].y = 16 * d
		}
	}

	UKEY$ = CHR$(38)
	DKEY$ = CHR$(40)
	LKEY$ = CHR$(37)
	RKEY$ = CHR$(39)
	ESCAPEKEY$ = CHR$(27)
	ENTERKEY$ = CHR$(13)
	SPACEKEY$ = CHR$(32)

	OPEN("DRAGON.TXT", 1, function () {
		for (var i = 1; i <= 42; i++) {
			text$[i] = LINE_INPUT(1)
		}
		NumPlays = Number(INPUT(1))
		NumPlays = NumPlays + 1

		OPEN("DRAGON.INI", 1, function() {
			for (var i = 1; i <= 11; i++) {
				var cst = Number(INPUT(1))
				var snm$ = INPUT(1)
				for (var n = 1; n <= 3; n++) {
					spell[n][i].cost = cst
					spell[n][i].spellname$ = snm$
				}
			}
			for (var i = 0; i <= NUMITEMS; i++) {
				item[i].label$ = INPUT(1)
				item[i].cost = Number(INPUT(1))
				item[i].ap = Number(INPUT(1))
				item[i].dp = Number(INPUT(1))
			}
			for (var i = 1; i <= NUMFILES; i++) {
				GFiles$[i] = INPUT(1)
			}
		})

	})

	OPEN("FOE.DAT", 1, function () {
		for (var i = 0; i <= 11; i++) {
			FoeStats[i].pname$ = INPUT(1)
			FoeStats[i].hp = Number(INPUT(1))
			FoeStats[i].xp = Number(INPUT(1))
			FoeStats[i].gold = Number(INPUT(1))
			FoeStats[i].ap = Number(INPUT(1))
			FoeStats[i].dp = Number(INPUT(1))
			FoeStats[i].dx = Number(INPUT(1))
			FoeStats[i].move = Number(INPUT(1))
			FoeStats[i].size = Number(INPUT(1))
		}
	})

	//@Set default data (handy for play testing)
	//@ Add player 2+3's stats...
	map.level = 1
	you.gold = 100
	you.leader = 1
	you.pauser = 2
	you.exist = 1

	player[1].hp = 50
	player[1].mp = 0
	player[1].lv = 1
	player[1].xp = 50
	player[1].total = 0
	player[1].st = 9
	player[1].dx = 8
	player[1].iq = 7
	item[1].amount = 1
	item[11].amount = 1
	player[2].hp = 30
	player[2].mp = 20
	player[2].lv = 2
	player[2].xp = 80
	player[2].total = 50
	player[2].st = 2
	player[2].dx = 5
	player[2].iq = 8
	player[3].hp = 50
	player[3].mp = 20
	player[3].lv = 13
	player[3].xp = 800
	player[3].total = 120
	player[3].st = 34
	player[3].dx = 13
	player[3].iq = 28
	for (var i = 1; i <= 3; i++) {
		player[i].hpmax = player[i].hp
		player[i].mpmax = player[i].mp
		player[1].weapon = 0
		player[1].armor = 0
		player[1].target = 1
	}
	spell[2][1].own = TRUE
	spell[3][2].own = TRUE

	SCREEN(13)

	for (var i = 1; i <= 63; i++) {
		PALETTE(i + 192, i)
	}

	CLS() ; COLOR(9)

	for (var i = 193; i <= 230; i += 2) {
		COLOR(i)
		LOCATE(1)
		PRINT()
		PRINT()
		PRINT()
		PRINT("ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»")
		PRINT("º       ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿        º")
		PRINT("º       ³  D R A G O N I E R  ³        º")
		PRINT("º       ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ        º")
		PRINT("º                                      º")
		PRINT("º           By Matt Hackett            º")
		PRINT("º                                      º")
		PRINT("º       All Artwork Provided By        º")
		PRINT("º           Michael Hackett            º")
		PRINT("º                                      º")
		PRINT("º       ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿        º")
		PRINT("º       ³   Hit A for About   ³        º")
		PRINT("º       ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ        º")
		PRINT("ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼")
	}

	PlayWave("DRAGON")

	INKEY$(function (kbhit$) {
		if (kbhit$ != "") {
			EXIT()
			About(NumPlays, callback)
		}
	})

} catch (ERR) {
	ErrorCatch(ERR)
}

}

function InitBattle (B) {
console.log('InitBattle()', arguments)

	SetStats()

	PlayWave("BATTLE")

	BattleStatus = NONE
	you.CanRun = TRUE
	you.battles = you.battles + 1

	if (B == 0) {
		map.num = ran(1, 4)

		for (var n = 1; n <= 4; n++) {
			if (map.monsters == 1) {
				var ass = ran(0, 7)
				if (ass == 0) var RandM = 1
				if (ass == 1) var RandM = 1
				if (ass == 2) var RandM = 1
				if (ass == 3) var RandM = 2
				if (ass == 4) var RandM = 2
				if (ass == 5) var RandM = 3
				if (ass == 6) var RandM = 3
				if (ass == 7) var RandM = 4
				if (n > map.num) var RandM = 0
			}
			if (map.monsters == 2) {
				RandM = ran(5, 7)
			}
			foe[n].hp = FoeStats[RandM].hp
			foe[n].xp = FoeStats[RandM].xp
			foe[n].gold = FoeStats[RandM].gold
			foe[n].ap = FoeStats[RandM].ap
			foe[n].dp = FoeStats[RandM].dp
			foe[n].dx = FoeStats[RandM].dx
			foe[n].move = FoeStats[RandM].move
			foe[n].size = FoeStats[RandM].size
			foe[n].pname$ = FoeStats[RandM].pname$
			foe[n].num = RandM
			foe[n].state = 0
			foe[n].target = 1
		}
	} else {
		you.CanRun = FALSE
		map.num = 1
		switch (B) {
			case 1: var Foette = 10
		}
		foe[1].hp = FoeStats[Foette].hp
		foe[1].xp = FoeStats[Foette].xp
		foe[1].gold = FoeStats[Foette].gold
		foe[1].ap = FoeStats[Foette].ap
		foe[1].dp = FoeStats[Foette].dp
		foe[1].dx = FoeStats[Foette].dx
		foe[1].move = FoeStats[Foette].move
		foe[1].size = FoeStats[Foette].size
		foe[1].pname$ = FoeStats[Foette].pname$
		foe[1].num = Foette
		foe[1].state = 0
		foe[1].target = 1
	}

	foe[1].x = ran(16, 31); foe[1].y = ran(50, 60)
	foe[2].x = ran(74, 100); foe[2].y = ran(50, 60)
	foe[3].x = ran(16, 31); foe[3].y = ran(97, 103)
	foe[4].x = ran(74, 100); foe[4].y = ran(97, 103)

	for (var i = 1; i <= 3; i++) {
		player[i].x = ran(260, 300)
	}
	player[1].y = ran(60, 70)
	player[2].y = ran(80, 90)
	player[3].y = ran(110, 120)
	if (you.exist == 1) player[1].y = ran(80, 90)

	Battle()

}

function Inventory (callback) {
console.log('Inventory()');

	COLOR(15); LOCATE(3, 1)

	PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT(TAB(3)+ "³>INVENTORY                        ³")
	PRINT(TAB(3)+ "³  Use                             ³")
	PRINT(TAB(3)+ "³  Equip                           ³")
	PRINT(TAB(3)+ "³  Drop                            ³")
	PRINT(TAB(3)+ "³  Exit                            ³")
	PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

	Arrow(4, 5, 8, 9, function (arrow) {
		switch (arrow) {
			case FALSE: ExitInventory(); break
			case 5: UseItems(); break
			case 6: EquipItem(); break
			case 7: DropItem(); break
			case 8: ExitInventory(); break
		}
	})

/*
PutInv:

 LOCATE 4, 1: COLOR 15

 CALL Box(4, 17)
 LOCATE 5, 4: PRINT "INVENTORY"
 LOCATE 16, 4: PRINT " Exit"

 ass = 6

 FOR i = 1 TO NUMITEMS
  IF item(i).amount > 0 THEN
   LOCATE ass, 5
   PRINT item(i).label$; item(i).amount
   item(i).itemcol = ass
   ass = ass + 1
  ELSE
   item(i).itemcol = 1
  END IF
 NEXT

 RETURN

UseItems:
 GOSUB PutInv

 cry = 6
 COLOR 9: LOCATE cry, 4: PRINT ""

 pp = 1
 PUT (152, 0), hero, PSET

 DO
  Control = Joy
  IF Control > 0 THEN
   COLOR 0: LOCATE cry, 4: PRINT ""
   SELECT CASE Control
    CASE LB: IF pp < you.exist THEN pp = pp + 1 ELSE pp = 1
    CASE RB: IF pp > 1 THEN pp = pp - 1 ELSE pp = you.exist
    CASE UB: IF cry > 6 THEN cry = cry - 1 ELSE cry = 16
    CASE DB: IF cry < 16 THEN cry = cry + 1 ELSE cry = 6
    CASE YB
     LOCATE 18, 1: COLOR 15
     IF cry = 16 THEN GOTO ExitInventory
     FOR it = 1 TO NUMITEMS
      IF cry = item(it).itemcol THEN
       IF it > 10 THEN
        CALL UseItem(it, pp)
        GOTO ExitInventory
       ELSE
        PlayWave "BEEP"
        Message "Nothing happens..."
       END IF
      END IF
     NEXT
   END SELECT
   COLOR 9: LOCATE cry, 4: PRINT ""
   IF pp = 1 THEN PUT (152, 0), hero, PSET
   IF pp = 2 THEN PUT (152, 0), hero2, PSET
   IF pp = 3 THEN PUT (152, 0), hero3, PSET
  END IF
 LOOP

EquipItem:

 GOSUB PutInv
 cry = 6
 COLOR 9: LOCATE cry, 4: PRINT ""
 pp = 1
 PUT (152, 0), hero, PSET
 DO
   Control = Joy
   IF Control > 0 THEN
   COLOR 0: LOCATE cry, 4: PRINT ""
   SELECT CASE Control
    CASE LB: IF pp < you.exist THEN pp = pp + 1 ELSE pp = 1
    CASE RB: IF pp > 1 THEN pp = pp - 1 ELSE pp = you.exist
    CASE UB: IF cry > 6 THEN cry = cry - 1 ELSE cry = 16
    CASE DB: IF cry < 16 THEN cry = cry + 1 ELSE cry = 6
    CASE YB
     LOCATE 18, 1: COLOR 15
     IF cry = 16 THEN GOTO ExitInventory
     FOR it = 1 TO NUMITEMS
      IF cry = item(it).itemcol THEN
       IF it < 6 THEN
        IF player(pp).weapon > 0 THEN item(player(pp).weapon).amount = item(player(pp).weapon).amount + 1
        player(pp).weapon = it
        item(it).amount = item(it).amount - 1
        GOTO ExitInventory
       ELSEIF it > 10 THEN
        PlayWave "BEEP"
       ELSE
        IF player(pp).armor > 0 THEN item(player(pp).weapon).amount = item(player(pp).weapon).amount + 1
        player(pp).armor = it
        item(it).amount = item(it).amount - 1
        GOTO ExitInventory
       END IF
      END IF
     NEXT
   END SELECT
   COLOR 9: LOCATE cry, 4: PRINT ""
   IF pp = 1 THEN PUT (152, 0), hero, PSET
   IF pp = 2 THEN PUT (152, 0), hero2, PSET
   IF pp = 3 THEN PUT (152, 0), hero3, PSET
   END IF
 LOOP
*/

	function DropItem () {

		PutInv()

		Arrow(4, 6, 16, 9, function (arrow) {
			switch (arrow) {
				case FALSE: ExitInventory(); break
				case 16: ExitInventory(); break
				default:
					for (var it = 1; it <= NUMITEMS; it++) {
						if (cry == item[it].itemcol) {
							item[it].amount = item[it].amount - 1
							Message("Oops!")
						}
					}
			}
		})
	}

	function ExitInventory () {
		DrawScreen(TRUE)
		callback()
	}
}

/*
FUNCTION Joy
it = STICK(0)
IF it <> NORM THEN Joy = it: EXIT FUNCTION
it = STICK(1)
IF it <> NORM THEN Joy = it + 1: EXIT FUNCTION
IF STRIG(0) = TRUE THEN Joy = YB: EXIT FUNCTION
IF STRIG(4) = TRUE THEN Joy = XB: EXIT FUNCTION
IF STRIG(6) = TRUE THEN Joy = AB: EXIT FUNCTION
IF STRIG(2) = TRUE THEN Joy = BB: EXIT FUNCTION
END FUNCTION

SUB LevelUp (p)

CLS
DIM pix(80, 8)

COLOR 14: PRINT "LEVEL UP!!"
FOR a = 0 TO 80
FOR d = 0 TO 8
pix(a, d) = POINT(a, d)
PSET (a, d), 0
NEXT: NEXT

FOR a = 0 TO 80
FOR d = 0 TO 8
LINE (a * 4 + 1, d * 4 + 1)-(a * 4 + 3, d * 4 + 3), pix(a, d), BF
NEXT: NEXT: PlayWave "LEVELUP"

player(p).lv = player(p).lv + 1
points = ran(5, player(p).lv) + (player(p).lv * 4)
maxpoints = points

wh = 1
GOSUB PutLVstats
COLOR 4: LOCATE 4, 8: PRINT ""
DO
Control = Joy
IF Control > 0 THEN
COLOR 0
IF wh = 1 THEN LOCATE 4, 8
IF wh = 2 THEN LOCATE 4, 13
IF wh = 3 THEN LOCATE 4, 17
PRINT ""
SELECT CASE Control
CASE UB
 IF points < maxpoints THEN
  PlayWave "DOT"
  IF wh = 1 THEN IF lvst > 0 THEN lvst = lvst - 1: points = points + 1:  ELSE PlayWave "BEEP"
  IF wh = 2 THEN IF lvdx > 0 THEN lvdx = lvdx - 1: points = points + 1:  ELSE PlayWave "BEEP"
  IF wh = 3 THEN IF lviq > 0 THEN lviq = lviq - 1: points = points + 1:  ELSE PlayWave "BEEP"
  GOSUB PutLVstats
 ELSE
  PlayWave "BEEP"
 END IF
CASE DB
 IF points > 0 THEN
  points = points - 1
  PlayWave "DOT"
  IF wh = 1 THEN lvst = lvst + 1
  IF wh = 2 THEN lvdx = lvdx + 1
  IF wh = 3 THEN lviq = lviq + 1
  GOSUB PutLVstats
 ELSE
  PlayWave "BEEP"
 END IF
CASE LB: PlayWave "DOT": wh = wh - 1: IF wh < 1 THEN wh = 3
CASE RB: PlayWave "DOT": wh = wh + 1: IF wh > 3 THEN wh = 1
CASE ELSE
IF points > 0 THEN
 COLOR 15
 Message "You have unspent points!"
 PlayWave "BEEP"
 getch
 GOSUB PutLVstats
ELSE
 GOSUB GiveLVbonus
END IF
END SELECT
COLOR 4
IF wh = 1 THEN LOCATE 4, 8
IF wh = 2 THEN LOCATE 4, 13
IF wh = 3 THEN LOCATE 4, 17
PRINT ""
END IF
LOOP

PutLVstats:
 CLS
 COLOR 9
 PRINT TAB(20); "DX="; player(p).dx
 PRINT TAB(20); "ST="; player(p).st
 PRINT TAB(20); "IQ="; player(p).iq
 LOCATE 10, 30: COLOR 14
 PRINT TAB(20); "POINTS:"; points; "/"; maxpoints
 LOCATE 1, 1: COLOR 15
 PRINT "       ST  DX  IQ"
 COLOR 9
 LOCATE 2, 8: PRINT player(p).st + lvst
 LOCATE 2, 12: PRINT player(p).dx + lvdx
 LOCATE 2, 16: PRINT player(p).iq + lviq
 COLOR 14
 LOCATE 3, 7: PRINT "+"; lvst
 LOCATE 3, 11: PRINT "+"; lvdx
 LOCATE 3, 15: PRINT "+"; lviq
 LOCATE 1, 30: PRINT player(p).pname$
 LINE (0, 190)-(0, 40), 9
 FOR i = 10 TO 170 STEP 10
  PSET (0, 190 - i), 0
 NEXT
 LINE (53, 191)-(74, 40), 15, B
 LINE (86, 191)-(107, 40), 15, B
 LINE (117, 191)-(138, 40), 15, B
 LINE (54, 190)-(73, 190 - player(p).st), 4, BF
 LINE (87, 190)-(106, 190 - player(p).dx), 4, BF
 LINE (118, 190)-(137, 190 - player(p).iq), 4, BF
 IF lvst > 0 THEN LINE (54, 190 - player(p).st - 1)-(73, 190 - player(p).st - lvst), 14, BF
 IF lvdx > 0 THEN LINE (87, 190 - player(p).dx - 1)-(106, 190 - player(p).dx - lvdx), 14, BF
 IF lviq > 0 THEN LINE (118, 190 - player(p).iq - 1)-(137, 190 - player(p).iq - lviq), 14, BF
 IF p = 1 THEN PUT (0, 0), hero, PSET
 IF p = 2 THEN PUT (0, 0), hero2, PSET
 IF p = 3 THEN PUT (0, 0), hero3, PSET
RETURN

GiveLVbonus:
 player(p).st = player(p).st + lvst
 player(p).dx = player(p).dx + lvdx
 player(p).iq = player(p).iq + lviq
 player(p).xp = (player(p).total * 2) + player(p).lv
 SELECT CASE lv
  CASE 3: IF p = 2 THEN spell(p, 3).own = TRUE
  CASE 4: IF p = 3 THEN spell(p, 1).own = TRUE
  CASE 5: IF p = 1 THEN spell(p, 1).own = TRUE
  CASE 6: IF p = 3 THEN spell(p, 2).own = TRUE
  CASE 7: IF p = 2 THEN spell(p, 4).own = TRUE
  CASE 8: IF p = 1 THEN spell(p, 2).own = TRUE
  CASE 9: IF p = 3 THEN spell(p, 3).own = TRUE
  CASE 10: IF p = 1 THEN spell(p, 3).own = TRUE
  CASE 13: IF p = 3 THEN spell(p, 4).own = TRUE
  CASE 14: IF p = 2 THEN spell(p, 5).own = TRUE
  CASE 17: IF p = 1 THEN spell(p, 4).own = TRUE
  CASE 18: IF p = 3 THEN spell(3, 5).own = TRUE
 END SELECT
 SELECT CASE p
  CASE 1
   player(p).dx = player(p).dx + ran(0, 2)
   lvhp = ran(player(p).lv * 4 + 5, player(p).st * 2 + 10)
   lvmp = ran(0, player(p).iq - 1)
  CASE 2
   player(p).iq = player(p).iq + ran(0, 2)
   lvhp = ran(player(p).lv * 3 + 2, player(p).dx * 2 + 5)
   lvmp = ran(player(p).iq, player(p).iq * 2 + 3)
  CASE 3
   player(p).st = player(p).st + ran(0, 2)
   lvhp = ran(player(p).lv * 4 + 10, player(p).st * 3 + 2)
   lvmp = ran(player(p).lv, player(p).mp)
 END SELECT
 player(p).hp = player(p).hp + lvhp
 player(p).mp = player(p).mp + lvmp
 player(p).hpmax = player(p).hpmax + lvhp
 player(p).mpmax = player(p).mpmax + lvmp
 ERASE pix

END SUB
*/

function LoadMap (callback) {

	CLS() ; center("Loading...", 12, 15)

	switch (map.level) {
		case 1: a$ = "BURG"; break
		case 2: a$ = "WORLD"; break
		case 3: a$ = "CDALE"; break
		case 4: a$ = "WCAVE"; break
		case 5: a$ = "ZYRLA"; break
		case 6: a$ = "BRINTON"; break
	}; map.area$ = a$

	var xhr = new XMLHttpRequest()
	xhr.open("GET", "DRAGON/" + a$ + ".MAP", false) // TODO
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var line = 0
			var lines = xhr.responseText.split("\n")
			you.x = Number(lines[line++])
			you.y = Number(lines[line++])
			map.occurance = lines[line++]
			map.monsters = lines[line++]
			map.across = lines[line++]
			map.down = lines[line++]
			for (var d = 1; d <= 50; d++) {
				for (var a = 1; a <= 50; a++) {
					tile[a][d].style = Number(lines[line++])
				}
			}

			switch (map.level) {
				case 1:
					if (BurgDoorInn == 2) tile[15][29].style = 4
					if (BurgDoorShop == 2) tile[31][12].style = 4
					break
				case 2:
					if (map.before == 1) { you.x = 19; you.y = 19 }
					if (map.before == 3) { you.x = 10; you.y = 38 }
					if (map.before == 4) { you.x = 9; you.y = 16 }
					break
				case 3:
					if (CdaleDoorInn == 2) tile[12][23].style = 4
					if (CdaleDoorChest == 2) tile[24][27].style = 4
					if (CdaleDoorGate == 2) tile[26][14].style = 4
					if (you.exist > 1) tile[39][10].style = 1
					break
				case 4:
					if (map.before == 5) { you.x = 37; you.y = 44 }
					if (TalkExpedition == TRUE && CdaleDoorGate == 0) {
						tile[31][40].style = 49
					}
					if (TNT == 2) {
						tile[36][43].style = 12
						tile[37][43].style = 12
					}
					break
				case 5:
					if (map.before == 4) { you.x = 40; you.y = 45 }
					if (map.before == 6) { you.x = 11; you.y = 43 }
					break
				case 6:
			}
			you.across = map.across
			you.down = map.down

			callback()
		}
	}
	xhr.send()

}

function Location (lx, ly) {
	if (you.x == lx && you.y == ly) return TRUE
	return FALSE
}

function Main () {
	INKEY$(function (key) {

		switch (key) {
			case ESCAPEKEY$:
				COLOR(15)
				YesNo("Quit Game? <Y/N>", function (result) {
					if (result == TRUE) QuitGame()
					CLS()
					DrawScreen(TRUE)
				}); break
			case ENTERKEY$: Options(); break
			case SPACEKEY$: TestReturn(); break
			case UKEY$:
				switch (tile[you.x][you.y - 1].style) {
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
						you.y = you.y - 1
						you.steps = you.steps + 1
						DrawScreen(TRUE); TestStep()
				}; break
			case DKEY$:
				switch (tile[you.x][you.y + 1].style) {
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
						you.y = you.y + 1
						you.steps = you.steps + 1
						DrawScreen(TRUE); TestStep()
				}; break
			case LKEY$:
				switch (tile[you.x - 1][you.y].style) {
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
						you.x = you.x - 1
						you.steps = you.steps + 1
						DrawScreen(TRUE); TestStep()
				}; break
			case RKEY$:
				switch (tile[you.x + 1][you.y].style) {
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12:
						you.x = you.x + 1
						you.steps = you.steps + 1
						DrawScreen(TRUE); TestStep()
				}; break
		}

	})
}

function Message (mes$) {
	if (LEN(mes$) > 30) {
		var llen = 1
		mes2$ = RIGHT$(mes$, LEN(mes$) - 30)
		if (LEN(mes$) > 60) {
			llen = 2
			mes2$ = RIGHT$(LEFT$(mes$, 60), 30)
			mes3$ = RIGHT$(mes$, LEN(mes$) - 60)
		}
		mes$ = LEFT$(mes$, 30)
	}
	LOCATE(3, 1)
	PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT(TAB(3)+ "³                                 ³")
	for (var i = 1; i <= llen; i++) {
		PRINT(TAB(3)+ "³                                  ³")
	}
	PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")
	center(mes$, 4, -1)
	if (llen >= 1) center(mes2$, 5, -1)
	if (llen == 2) center(mes3$, 6, -1)
}

function NotEnoughGold () {
/*
PlayWave "BEEP"
COLOR 4: rn = ran(1, 5)
a$ = "NOT ENOUGH GOLD !             "
SELECT CASE rn
 CASE 1: B$ = "You are short on gold..."
 CASE 2: B$ = "Better check your pouch!"
 CASE 3: B$ = "You don't have enough..."
 CASE 4: B$ = "Sorry."
 CASE 5: B$ = "Ha ha sucker."
END SELECT
a$ = a$ + B$
COLOR 4: Message a$
Pause
*/
}

function Options () {

	SetStats()

	LOCATE(3); COLOR(15)

	PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT(TAB(3)+ "³  STATUS     ³")
	PRINT(TAB(3)+ "³  INVENTORY  ³")
	PRINT(TAB(3)+ "³  MAGIC      ³")
	PRINT(TAB(3)+ "³  SEARCH     ³")
	PRINT(TAB(3)+ "³             ³")
	PRINT(TAB(3)+ "³  SAVE       ³")
	PRINT(TAB(3)+ "³  LOAD       ³")
	PRINT(TAB(3)+ "³             ³")
	PRINT(TAB(3)+ "³  EXIT       ³")
	PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

	LOCATE(8, 6); PRINT(player[you.leader].pname$)
	LOCATE(11, 6)
	switch (you.pauser) {
		case 0: PRINT("BLOCK"); break
		case 1: PRINT("SLOW"); break
		case 2: PRINT("MEDIUM"); break
		case 3: PRINT("FAST"); break
	}

	Arrow(4, 4, 12, 9, function (arrow) {
		switch (arrow) {
			case 4: Status(); break
			case 5: Inventory(done); break
			case 6: CastInv(); break
			case 7: TestReturn(); break
			case 8:
				you.leader = you.leader + 1
				if (you.leader > you.exist) you.leader = 1
				COLOR(15); LOCATE(8, 6); PRINT(player[you.leader].pname$)
			case 9: File(1); break
			case 10: File(2); break
			case 11:
				you.pauser = you.pauser + 1
				if (you.pauser > 3) you.pauser = 0
				LOCATE(11, 6)
				switch (you.pauser) {
					case 0: PRINT("BLOCK"); break
					case 1: PRINT("SLOW"); break
					case 2: PRINT("MEDIUM"); break
					case 3: PRINT("FAST"); break
				}; break
		}
		function done () {
			CLS()
			DrawScreen(TRUE)
		}
	})

}

function Pause (callback) {
	switch (you.pauser) {
		case 0: getch(callback); break
		case 1: delay(50000, callback); break
		case 2: delay(10000, callback); break
		case 3: delay(50, callback); break
	}
}

function PlayWave (WFile$) {
console.log('PlayWave()', arguments);

	if (Success == TRUE) {

/*
DIM wav AS STRING * 2

WFile$ = WFile$ + ".VOC"
DataPort = &H220 + 12
WAIT DataPort, &H80, &HFF
OUT DataPort, &HD1

OPEN WFile$ FOR BINARY AS #1
DO
GET #1, , wav$
C$ = wav$
DEF SEG = VARSEG(C$)
WAIT DataPort, &H80, &HFF
OUT DataPort, &H10
WAIT DataPort, &H80, &HFF
OUT DataPort, PEEK(SADD(C$))
LOOP UNTIL EOF(1)
CLOSE
*/

	}

}

function PM (pmn) {
	var au = ran(1, pmn)
	var rt = ran(0, 1)
	if (rt == 0) au = -au
	return au
}

function QuitGame () {
	CleanUp()
	COLOR(9)
	/*
	OPEN "TITLE.DAT" FOR INPUT AS #2
	DO
		INPUT #2, title$
		PRINT title$
	LOOP UNTIL EOF(2): CLOSE
	*/
	COLOR(7)
	PlayWave("DRAGON")
	SYSTEM()
}

function ran (n1, n2) {
	return INT(RND() * (n2 - (n1 - 1))) + n1
}

function RandTalk () {
	var t = ran(1, 10); LOCATE(3, 1); COLOR(15)
	switch (t) {
		case 1: var a$ = "Good day, warrior."
		case 2: var a$ = "Be sure to stay away from the West Cave!"; break
		case 3: var a$ = "I saw a shining light come    from the west.  It scared us.."; break
		case 4: var a$ = "The wind in the North is gett ing too powerful..."; break
		case 5: var a$ = "Go away -- you smell like my  dog."; break
		case 6: var a$ = "Are you a man or a woman?  I  can't tell."; break
		case 7: var a$ = "The reflex is a lonely child  just waiting by the park."; break
		case 8: var a$ = "I have nothing to say to filth like yourself, scum."; break
		case 9: var a$ = "Boy am I glad to see you!"; break
		case 10: var a$ = "I really like your sword.  It gives me cramps."; break
	}
	COLOR(15); Message(a$)
}

/*
SUB Search (find)
 LOCATE 3, 1: COLOR 15
 SELECT CASE find
   CASE 10
    IF Crown = FALSE THEN
     PlayWave "TUNE"
     Message "You found the Royal Crown!"
     Crown = TRUE
    ELSE
     Found = FALSE
    END IF
   CASE ELSE:
    Found = FALSE
 END SELECT
 IF Found = FALSE THEN
  PlayWave "BEEP"
  Message "You find nothing..."
 END IF
 Pause
 CLS : DrawScreen (TRUE)
END SUB

SUB SellItems (sellclr)

 COLOR sellclr

 CALL Box(5, 15)
 LOCATE 6, 4: PRINT "<SELL> "
 LOCATE 14, 5: PRINT "EXIT"
 LOCATE 6, 12: PRINT you.gold

 ass = 7

 FOR i = 1 TO NUMITEMS
  IF item(i).amount > 0 THEN
   LOCATE ass, 5
   PRINT item(i).label$; item(i).amount; USING "   ######"; item(i).cost / 2
   item(i).itemcol = ass
   ass = ass + 1
  ELSE
   item(i).itemcol = 1
  END IF
 NEXT

 choice = Arrow(4, 7, 14, 14)
 SELECT CASE choice
  CASE IS <> FALSE
   LOCATE 18, 1: COLOR 15
   FOR it = 1 TO NUMITEMS
    IF choice = item(it).itemcol THEN
     IF item(it).cost > 0 THEN
      item(it).amount = item(it).amount - 1
      you.gold = you.gold + item(it).cost / 2
      ThankYou (6)
     ELSE
      PlayWave "BEEP"
      Message "You can't sell this...": Pause
     END IF
    END IF
   NEXT
 END SELECT

END SUB
*/

function SetStats () {
	for (var t = 1; t <= you.exist; t++) {
		if (player[t].mp < 0) player[t].mp = 0
		if (player[t].hp > player[t].hpmax) player[t].hp = player[t].hpmax
		if (player[t].mp > player[t].mpmax) player[t].mp = player[t].mpmax
		player[t].ap = player[t].st + item[player[t].weapon].ap
		player[t].dp = player[t].dx + item[player[t].armor].dp
	}
	if (you.steps > 999999) you.steps = 999999
	if (player[1].state == DEATH && player[2].state == DEATH && player[3].state == DEATH) GameOver()
	while (player[you.leader].state == DEATH) {
		you.leader = you.leader + 1
		if (you.leader > 3) you.leader = 1
	}
}

/*
SUB ShopArmor (Available)

 Available = Available + 6
 COLOR 9: LOCATE 3

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³ARMOR MERCHANT                   ³"
 PRINT TAB(3); "³ Well hello!  Looking for some    ³"
 PRINT TAB(3); "³ armor today, are we?             ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 4: getch

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³  BUY  ³"
 PRINT TAB(3); "³  SELL ³"
 PRINT TAB(3); "³  EXIT ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÙ"

 SELECT CASE Arrow(4, 5, 7, 14)
  CASE FALSE: GOTO ExitArmor
  CASE 5: GOTO BuyArmor
  CASE 6: SellItems (9): GOTO ExitArmor
  CASE 7: GOTO ExitArmor
 END SELECT

BuyArmor:

 COLOR 9

 CALL Box(5, 15)
 LOCATE 6, 4: PRINT "<BUY> "
 LOCATE 14, 4: PRINT " EXIT"
 LOCATE 6, 11: PRINT you.gold

 FOR a = 7 TO 10
  IF Available >= a THEN
   LOCATE a + 1, 6
   PRINT item(a).label$; ""; item(a).cost
  END IF
 NEXT

 choice = Arrow(4, 8, 14, 14)
 SELECT CASE choice
  CASE FALSE: GOTO ExitArmor
  CASE ELSE
   var = choice - 1
   IF choice = 14 THEN GOTO ExitArmor
    IF Available >= var THEN
     IF you.gold >= item(var).cost THEN
      you.gold = you.gold - item(var).cost
      item(var).amount = item(var).amount + 1
      ThankYou (6)
     ELSE
      NotEnoughGold
    END IF
    GOTO ExitArmor
   ELSE
    PlayWave "BEEP"
   END IF
 END SELECT

ExitArmor:
DrawScreen (TRUE)
END SUB

SUB ShopChurch
COLOR 7
Message "Welcome my son to my humble   Temple.": getch
a = 0
FOR i = 1 TO you.exist
 IF player(i).state = DEATH THEN a = a + 1
NEXT
IF a = 0 THEN GOTO ExitChurch
IF a > 0 THEN
 Message "Oh my!  I see you have fallen comrades!": Pause
 Message "A small donation of 25 is    required for me to help you...   (Y/N)"
 DO
  Control = Joy
  IF Control > 0 THEN
   IF Control = YB THEN
     IF you.gold >= 25 THEN
       you.gold = you.gold - 25
       FOR i = 1 TO you.exist
        IF player(i).state = DEATH THEN player(i).hp = 1
        player(i).state = 0
       NEXT
       PlayWave "TUNE"
       Message "Your comrades have all been placed under the light of Cypress.  Bless you on your journeys."
       Pause
       GOSUB ExitChurch
     ELSE
       PlayWave "BEEP"
       Message "I am sorry but I cannot perform miracles without something in return in such a harsh world as this..."
       Pause
       GOSUB ExitChurch
     END IF
   ELSE
     Message "I'm sorry I could not be of assistance..."
     GOSUB ExitChurch
   END IF
  END IF
 LOOP
END IF
ExitChurch:
 Message "May you be blessed by our lord..."
 huh = ran(1, 20)
 IF huh = 1 THEN you.mango = you.mango + 1: PlayWave "TUNE"
 IF huh = 2 THEN you.mango = you.mango + ran(1, 5): PlayWave "TUNE"
 Pause
 CLS
 DrawScreen (TRUE)
END SUB

SUB ShopInn (RoomPrice)

 COLOR 10: LOCATE 3

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³INN KEEPER                       ³"
 PRINT TAB(3); "³ Good day to you!                 ³"
 PRINT TAB(3); "³ You look like you could use      ³"
 PRINT TAB(3); "³ some rest.                       ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 4: getch

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³               ³"
 PRINT TAB(3); "³  SLEEP        ³"
 PRINT TAB(3); "³  EXIT          ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 5, 8: PRINT you.gold
 LOCATE 6, 15: PRINT RoomPrice

 SELECT CASE Arrow(4, 6, 7, 14)
  CASE 6
   IF you.gold < RoomPrice THEN
    NotEnoughGold
   ELSE
    ThankYou (5)
    FOR i = 1 TO you.exist
     IF player(i).state <> DEATH THEN player(i).hp = player(i).hpmax: player(i).mp = player(i).mpmax
    NEXT
    you.gold = you.gold - RoomPrice
   END IF
 END SELECT

DrawScreen (TRUE)
END SUB

SUB ShopItem (Available)

 COLOR 12: LOCATE 3

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³ITEM SHOP OWNER                  ³"
 PRINT TAB(3); "³ Good day to ya!  Fine time to be ³"
 PRINT TAB(3); "³ buyin' from me, yes indeed!      ³"
 PRINT TAB(3); "³                                  ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 4: getch

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³  BUY  ³"
 PRINT TAB(3); "³  SELL ³"
 PRINT TAB(3); "³  EXIT ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÙ"

 SELECT CASE Arrow(4, 5, 7, 14)
  CASE FALSE: GOTO ExitItems
  CASE 5: GOTO BuyItems
  CASE 6: SellItems (12): GOTO ExitItems
  CASE 7: GOTO ExitItems
 END SELECT

BuyItems:

 COLOR 12: LOCATE 5

 CALL Box(5, 15)
 LOCATE 6, 4: PRINT "<BUY> "
 LOCATE 14, 4: PRINT " EXIT"
 LOCATE 6, 11: PRINT you.gold

 FOR a = 1 TO 6
  IF Available >= a THEN
   LOCATE a + 7, 6
   PRINT item(a + 10).label$; ""; item(a + 10).cost
  END IF
 NEXT

 choice = Arrow(4, 8, 14, 14)
 SELECT CASE choice
  CASE IS <> FALSE
   var = choice - 7
   IF var = 7 THEN GOTO ExitItems
    IF Available >= var THEN
     IF you.gold >= item(var + 10).cost THEN
      you.gold = you.gold - item(var + 10).cost
      item(var + 10).amount = item(var + 10).amount + 1
      ThankYou (6)
     ELSE
      NotEnoughGold
     END IF
    GOTO ExitItems
   ELSE
    PlayWave "BEEP"
   END IF
 END SELECT

ExitItems:
DrawScreen (TRUE)
END SUB

SUB ShopWeapon (Available)

 COLOR 9: LOCATE 3

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³WEAPON MERCHANT                  ³"
 PRINT TAB(3); "³ Greetings, warrior!  How may I be³"
 PRINT TAB(3); "³ of service today?                ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 4: getch

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³  BUY  ³"
 PRINT TAB(3); "³  SELL ³"
 PRINT TAB(3); "³  EXIT ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÙ"

 SELECT CASE Arrow(4, 5, 7, 14)
  CASE FALSE: GOTO ExitWeapons
  CASE 5: GOTO BuyWeapons
  CASE 6: SellItems (9): GOTO ExitWeapons
  CASE 7: GOTO ExitWeapons
 END SELECT

BuyWeapons:

 COLOR 9

 CALL Box(5, 15)
 LOCATE 6, 4: PRINT "<BUY> "
 LOCATE 14, 4: PRINT " EXIT"
 LOCATE 6, 11: PRINT you.gold

 FOR a = 1 TO 6
  IF Available >= a THEN
   LOCATE a + 7, 6
   PRINT item(a).label$; ""; item(a).cost
  END IF
 NEXT

 choice = Arrow(4, 8, 14, 14)
 var = choice - 7
 SELECT CASE choice
  CASE FALSE: GOTO ExitWeapons
  CASE ELSE
   IF Available >= var THEN
    IF you.gold >= item(var).cost THEN
     you.gold = you.gold - item(var).cost
     item(var).amount = item(var).amount + 1
     ThankYou (6)
     GOTO ExitWeapons
    ELSE
     NotEnoughGold
     GOTO ExitWeapons
    END IF
   ELSE
    PlayWave "BEEP"
   END IF
 END SELECT

ExitWeapons:
DrawScreen (TRUE)
END SUB

SUB ShopWhore (shp)
COLOR 12
LOCATE 1, 3
IF you.leader = 1 THEN
 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³Hey big boy!  Lookin' for a good ³"
 PRINT TAB(3); "³time?  Well you've come to the   ³"
 PRINT TAB(3); "³right place! How about          ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
 LOCATE 4, 29: PRINT shp
 DO
  Control = Joy
  IF Control > 0 THEN
   IF Control = YB THEN
    IF you.gold >= shp THEN
     you.gold = you.gold - shp
     CLS
     PlayWave "TUNE"
     SLEEP 5
     DrawScreen (TRUE)
     PlayWave "TUNE"
     Message "I see you enjoyed yourself?  Hope to see ya again real soon!": Pause
     player(1).st = player(1).st + ran(0, 2)
     GOTO ExitWhore
    ELSE
     PlayWave "BEEP"
     Message "THIS ISN'T ENOUGH!!  WHAT KINDA GIRL DO YOU THINK I AM??": Pause
     GOTO ExitWhore
    END IF
   ELSE
    Message "See ya around..."
    GOTO ExitWhore
   END IF
  END IF
 LOOP
ELSE
 PlayWave "BEEP"
 Message "YOU NASTY LITTLE...!": Pause
 Message "GET OUTTA HERE RIGHT NOW!!"
 Pause
END IF
ExitWhore:
CLS
DrawScreen (TRUE)
END SUB
*/

function Status () {

	for (var p = 1; p <= you.exist; p++) {

		CLS() ; COLOR(15)
		if (player[p].state == DEATH) COLOR(4)
		LOCATE(3)

		if (p == 1) PUT(152, 0, hero, PSET)
		if (p == 2) PUT(152, 0, hero2, PSET)
		if (p == 3) PUT(152, 0, hero3, PSET)

		PRINT(TAB(3)+" "+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
		PRINT(TAB(3)+" "+ "³"+" "+ player[p].pname$)
		PRINT(TAB(3)+" "+ "³")
		PRINT_USING("  ³ HP ####/####", player[p].hp," ", player[p].hpmax)
		PRINT_USING("  ³ MP ####/####", player[p].mp," ", player[p].mpmax)
		PRINT_USING("  ³ LV ####"," ", player[p].lv)
		PRINT(TAB(3)+" "+ "³")
		PRINT_USING("  ³ XP ####/####", player[p].total, player[p].xp)
		PRINT_USING("  ³   #########", you.gold)
		PRINT(TAB(3)+" "+ "³")
		PRINT(TAB(3)+" "+ "³ ST "+" "+ player[p].st)
		PRINT(TAB(3)+" "+ "³ DX "+" "+ player[p].dx)
		PRINT(TAB(3)+" "+ "³ IQ "+" "+ player[p].iq)
		PRINT(TAB(3)+" "+ "³")
		PRINT(TAB(3)+" "+ "³ AP "+" "+ player[p].ap)
		PRINT(TAB(3)+" "+ "³ DP "+" "+ player[p].dp)
		PRINT(TAB(3)+" "+ "³")
		PRINT(TAB(3)+" "+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

		for (var i = 4; i <= 19; i++) {
			LOCATE(i, 40); PRINT("³")
		};  LOCATE(4)

		LINE(100, 96, 300, 102, 15, B)
		LINE(100, 104, 300, 110, 15, B)
		LINE(100, 112, 300, 118, 15, B)
		LINE(101, 97, 101 + player[p].st, 101, 4, BF)
		LINE(101, 105, 101 + player[p].dx, 109, 4, BF)
		LINE(101, 113, 101 + player[p].iq, 117, 4, BF)

		LINE(100, 128, 300, 134, 15, B)
		LINE(100, 136, 300, 142, 15, B)
		LINE(101, 129, 101 + player[p].ap, 133, 4, BF)
		LINE(101, 137, 101 + player[p].dp, 141, 4, BF)
		getch()

		Box(4, 21); LOCATE(5, 4); PRINT("INVENTORY"); var ass = 7

		for (var it = 1; it <= NUMITEMS; it++) {
			if (item[it].amount > 0) {
				LOCATE(ass, 5)
				PRINT(item[it].label$+" "+ item[it].amount)
				ass = ass + 1
			}
		}

		getch()

		Box(5, 21)
		LOCATE(6, 4); PRINT("MAGIC"); ass = 8

		for (var i = 1; i <= 6; i++) {
			if (spell[p][i].own == TRUE) {
				LOCATE(ass, 5)
				PRINT(spell[p][i].spellname+" "+ spell[p][i].cost)
				ass = ass + 1
			}
		}

		LOCATE(6); getch(function () {

			PRINT(TAB(3)+" "+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
			PRINT(TAB(3)+" "+ "³STATISTICS                         ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Weapon:                            ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Armor :                            ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Total Experience:                  ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Til Next Level  :                  ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Battles:                           ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Steps  :                           ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "³ Mango  :                           ³")
			PRINT(TAB(3)+" "+ "³                                    ³")
			PRINT(TAB(3)+" "+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

			LOCATE(9, 13); PRINT(item[player[p].weapon].label$)
			LOCATE(11, 13); PRINT(item[player[p].armor].label$)
			LOCATE(13, 23); PRINT(player[p].total)
			LOCATE(15, 23); PRINT(player[p].xp)
			LOCATE(17, 14); PRINT(you.battles)
			LOCATE(19, 14); PRINT(you.steps)
			LOCATE(21, 14); PRINT(you.mango)
		})

		getch()

	}

	CLS() ; DrawScreen(TRUE)

}

function Surrounding (st) {
	if (tile[you.x - 1][you.y].style == st) return TRUE
	if (tile[you.x + 1][you.y].style == st) return TRUE
	if (tile[you.x][you.y - 1].style == st) return TRUE
	if (tile[you.x][you.y + 1].style == st) return TRUE
	return FALSE
}

function TestReturn () {

	COLOR(15)

	switch (map.level) {
		case 1:
			if (Location(15, 12) == TRUE) ShopWeapon(2)
			if (Location(18, 27) == TRUE) ShopInn(5)
			if (Location(34, 29) == TRUE) ShopItem(1)
			if (Location(30, 18) == TRUE) ShopArmor(2)
			if (Location(34, 18) == TRUE) ShopChurch()
			if (Location(32, 32) == TRUE) Search(0)
			if (Location(16, 29) == TRUE) {
				if (BurgDoorInn == 1) {
					Message("You opened the door!"); Pause(function () {
					BurgDoorInn = 2
					tile[15][29].style = 4
					DrawScreen(TRUE) })
				}
			}
			if (Location(31, 13) == TRUE) {
				if (BurgDoorShop == 1) {
					//Message "You opened the door!": Pause
					BurgDoorShop = 2
					tile[31][12].style = 4
					DrawScreen(TRUE)
				}
			}
			if (Surrounding(43) == TRUE) Welcome()
			if (Surrounding(44) == TRUE) {
				if (TalkExpedition == TRUE && TNT == 0) {
					Message("Howdy!  Yes Sorceress, I got  your message and I have your   TNT...")
					Pause(function () {
						Message("Here you are be happy!")
						PlayWave("TUNE")
						TNT = 1
					})
				} else {
					Message("Yeah go away.")
				}
			}
			if (Surrounding(45) == TRUE) RandTalk(); break
		case 3:
			if (Location(12, 24) == TRUE) {
				if (CdaleDoorInn == 1) {
					Message("You opened the door!"); Pause(function () {
						CdaleDoorInn = 2
						tile[12][23].style = 4
						DrawScreen(TRUE)
					})
				}
			}
			if (Location(25, 27) == TRUE) {
				if (CdaleDoorChest == 1) {
					Message("You opened the door!"); Pause(function () {
						CdaleDoorChest = 2
						tile[24][27].style = 4
						DrawScreen(TRUE)
					})
				}
			}
			if (Location(26, 15) == TRUE) {
				if (CdaleDoorGate == 1) {
					Message("You opened the door!"); Pause(function () {
						CdaleDoorGate = 2
						tile[26][14].style = 4
						DrawScreen(TRUE)
					})
				}
			}
			if (Location(20, 16) == TRUE) ShopItem (3)
			if (Location(30, 27) == TRUE) ShopWhore (50)
			if (Surrounding(47) == TRUE) {
				if (you.exist == 1) GetPlayer(2)
			}
			if (Surrounding(45) == TRUE) RandTalk()
			if (Surrounding(50) == TRUE) COLOR(9); Message("Yes I AM a fish, you!")
			if (Surrounding(44) == TRUE) {
				var i = ran(0, 2)
				if (i == 0) Message("Hey baby - lookin' for a good time?")
				if (i == 1) Message("Want your cock sucked?")
				if (i == 2) Message("Ooh!  You lookin' fine, baby!")
			}
			if (Surrounding(49) == TRUE) {
				if (TalkExpedition == FALSE) {
					Message("Yep, last I hear the king went on an expedition lookin' for some"); Pause(function () {
						Message("gold or somethin' near that   cave up there...")
						PlayWave("TUNE")
						TalkExpedition = TRUE
					})
				} else {
					Welcome()
				}
			}
			if (Surrounding(46) == TRUE) Fishery(); break
		case 4:
			if (Location(36, 32) == TRUE) Search(10)
			if (Surrounding(49) == TRUE) {
				COLOR(14)
				Message("Please help me!!"); Pause(function () {
					InitBattle(1)
					COLOR(15)
					Message("JACK ran away!")
					PlayWave("TUNE")
					Pause(function () {
						Message("You receive a key."); Pause(function () {
							CdaleDoorGate = 1
							item[15].amount = item[15].amount + 1
							PlayWave("TUNE")
							Message("Thank you for rescuing me!"); Pause(function () {
								Message("My name is Randall and I am King"); Pause(function () {
									Message("Rowan's personal servant."); Pause(function () {
										Message("He went through the passage first"); Pause(function () {
											Message("and then the rest of us were"); Pause(function () {
												Message("ambushed by that creature."); Pause(function () {
													Message("I am the only survivor..."); Pause(function () {
														Message("Well anyway come to the castle and"); Pause(function () {
															Message("I will reward you.  Thanks again!"); Pause(function () {
																tile[31][40].style = 12
																CLS()
																DrawScreen(TRUE)
															})
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				})
			}
			if (Location(36, 42) == TRUE && TNT == 1) {
				TNT = 2
				tile[36][43].style = 12
				tile[37][43].style = 12
				Message("YOU LAY THE BOMB!"); Pause(function () {
					for (var i = 1; i <= 300; i++) {
						CIRCLE(160, 100, i, ran(193, 255))
					}; CLS() ; DrawScreen(TRUE)
					Message("Whoa...that was close!"); Pause(function () { CLS() ; DrawScreen(TRUE) });
				})
			}; break
	}
}

function TestStep () {

	switch (map.level) {
		case 1:
			if ((you.x == 9 && you.y >= 19 && you.y <= 22) || (you.x >= 23 && you.x <= 26 && you.y == 5) || (you.x == 40 && you.y >= 19 && you.y <= 23)) {
				map.level = 2
				map.before = 1
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(11, 7) == TRUE) {
				Warp(17, 31)
			} else if (Location(17, 31) == TRUE) {
				Warp(11, 7)
			}; break
		case 2:
			if (Location(19, 19) == TRUE) {
				map.level = 1
				map.before = 2
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(10, 38) == TRUE) {
				map.level = 3
				map.before = 2
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(9, 16) == TRUE) {
				map.level = 4
				map.before = 2
				LoadMap(function () {
					DrawScreen(TRUE) })
			}; break
		case 3:
			if (you.x >= 25 && you.x <= 27 && you.y == 45) {
				map.level = 2
				map.before = 3
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(20, 9) == TRUE) {
				Warp(11, 9)
			} else if (Location(11, 9) == TRUE) {
				Warp(20, 9)
			}; break
		case 4:
			if (Location(41, 25) == TRUE) {
				map.level = 2
				map.before = 4
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(37, 44) == TRUE) {
				map.level = 5
				map.before = 4
				LoadMap(function () {
					DrawScreen(TRUE) })
			}; break
		case 5:
			if (Location(11, 43) == TRUE) {
				map.level = 6
				map.before = 5
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(40, 45) == TRUE) {
				map.level = 4
				map.before = 5
				LoadMap(function () {
					DrawScreen(TRUE) })
			}; break
		case 6:
			if (you.x > 40) {
				map.level = 5
				map.before = 6
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
		case 69:
			if (Location(10, 6) == TRUE) {
				map.level = 2
				map.before = 4
				LoadMap(function () {
					DrawScreen(TRUE) })
			}
			if (Location(12, 36) == TRUE) {
				Warp(26, 20)
			} else if (Location(26, 20) == TRUE) {
				Warp(29, 39)
			} else if (Location(29, 39) == TRUE) {
				Warp(24, 33)
			} else if (Location(27, 25) == TRUE) {
				Warp(32, 22)
			} else if (Location(32, 22) == TRUE) {
				Warp(10, 6)
			}; break
	}

  if (map.occurance > 0) if (ran(0, map.occurance - 1) == 0) InitBattle(0)

}

function ThankYou (tyline, callback) {

	COLOR(14); LOCATE(tyline); var rp = ran(1, 5)

	PRINT(TAB(3)+ "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿")
	PRINT(TAB(3)+ "³> YOU MADE A PURCHASE !           ³")
	PRINT(TAB(3)+ "³                                  ³")
	PRINT(TAB(3)+ "³                                  ³")
	PRINT(TAB(3)+ "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ")

	LOCATE(tyline + 2, 5)

	switch (rp) {
		case 1: PRINT("Thank you!"); break
		case 2: PRINT("Please come again!"); break
		case 3: PRINT("Yeah thanks alot, scum."); break
		case 4: PRINT("Many thanks."); break
		case 5: PRINT("Heh heh."); break
	}

	PlayWave("THANK")
	Pause(callback)

}

function UseItem (ItemToUse, p) {

	COLOR(15)

	switch (ItemToUse) {
		case 11: //@Herb
			Message("You used an Herb!")
			player[p].hp = player[p].hp + ran(20, 30)
			if (player[p].hp > player[p].hpmax) player[p].hp = player[p].hpmax
			item[ItemToUse].amount = item[ItemToUse].amount - 1
			Pause()
		case 12: //@Wyvern Wing
			Message("You feel air swooping by you!")
			//@ PlayWave "WING"
			item[ItemToUse].amount = item[ItemToUse].amount - 1
			Pause()
			map.level = 1
			LoadMap(); break
		case 13: //@Vial
			Message("You regain some energy!")
			player[p].mp = player[p].mp + ran(10, 15)
			if (player[p].mp > player[p].mpmax) player[p].mp = player[p].mpmax
			item[ItemToUse].amount = item[ItemToUse].amount - 1
			getch(); break
		case 14: //@Fish, etch
			PlayWave("BEEP")
			Message("This is unusable here...")
			getch(); break
	}

}

function Warp (warpx, warpy) {
	PlayWave("WARP")
	you.x = warpx
	you.y = warpy
	DrawScreen(TRUE)
}

function Welcome () {

	var w$ = "Welcome to "
	w$ = w$ + map.area$
/* i = 12
 DO
  i = i + 1
 LOOP WHILE RIGHT$(LEFT$(w$, i), 1) <> " "
 w$ = LEFT$(w$, i - 1)*/
	if (you.leader == 1) w$ = w$ + ", warrior!"
	if (you.leader == 2) w$ = w$ + ", sorceress!"
	if (you.leader == 3) w$ = w$ + ", dragon!"
	COLOR(15); Message(w$)

}

/*
SUB WonBattle

PlayWave "VICTORY"

FOR n = 1 TO map.num
 goldup = goldup + foe(n).gold
 FOR p = 1 TO you.exist
  xpup = xpup + foe(n).xp
 NEXT
NEXT
you.gold = you.gold + goldup
you.mango = you.mango + map.num

CALL center("                     ", 9, 14)
CALL center(" You won the Battle! ", 10, 14)
CALL center("                     ", 11, 14)
CALL center(" Experience:         ", 12, 14)
CALL center("       Gold:         ", 13, 14)
CALL center("                     ", 14, 14)
LOCATE 12, 22: PRINT xpup
LOCATE 13, 22: PRINT goldup

Pause

FOR i = 1 TO you.exist
 player(i).total = player(i).total + xpup
 IF player(i).total >= player(i).xp THEN LevelUp (i)
NEXT

END SUB
*/

function WriteReg (Reg, Value) {

	OUT("&H388", Reg)    // 388h = address/status port, 389h = data port
	for (var i = 0; i <= 5; i++) {    // This tells the SB what register we want to write to
		var a = INP("&H388")    // After we write to the address port we must wait 3.3ms
	}

	OUT("&H389", Value)  // Send the value for the register to 389h
	for (var i = 0; i <= 34; i++) {   // Here we must also wait, this time 23ms
		var a = INP("&H388")
	}

}

function YesNo (YNText$, callback) {
	Message(YNText$)
	INKEY$(function (kbhit$) {
		if (kbhit$ != "") {
			EXIT()
			if (kbhit$ == ESCAPEKEY$) return callback(FALSE); else return callback(TRUE)
		}
	})
}
