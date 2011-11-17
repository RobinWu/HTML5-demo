'ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»
'º                        ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿                           º
'º                        ³  D R A G O N I E R  ³                           º
'º                        ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ                           º
'º                                                                          º
'º                     - Programming by Matt Hackett -                      º
'º                                                                          º
'º               - Story by Matt Hackett and Jim MacDonald -                º
'º                                                                          º
'º                      - Artwork by Michael Hackett -                      º
'º                                                                          º
'ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼

DEFINT A-Z

DECLARE FUNCTION Arrow (ax, miny, maxy, aclr)
DECLARE FUNCTION BattleItems (plib)
DECLARE FUNCTION ChooseTarget (pt, ttarget)
DECLARE FUNCTION GetInput$ (gx, gy, length, gerase$)
DECLARE FUNCTION Joy ()
DECLARE FUNCTION Location (lx, ly)
DECLARE FUNCTION PM (pmn)
DECLARE FUNCTION ran (n1, n2)
DECLARE FUNCTION Surrounding (st)
DECLARE FUNCTION YesNo (YNText$)

DECLARE SUB About (a)
DECLARE SUB Battle ()
DECLARE SUB Box (startx, endx)
DECLARE SUB Cast (caster, sspell)
DECLARE SUB CastInv ()
DECLARE SUB center (ctext$, cline, cclr)
DECLARE SUB CleanUp ()
DECLARE SUB delay (deler&)
DECLARE SUB DoBattle ()
DECLARE SUB DoDamage (forp, whi, ddamage)
DECLARE SUB DoDeath (ddfp, ddp)
DECLARE SUB DoFoeMove (f)
DECLARE SUB DoPlayerMove (p)
DECLARE SUB DrawBattle ()
DECLARE SUB DrawFile (siz, drf$)
DECLARE SUB DrawScreen (dweh)
DECLARE SUB DrawTile (tx, ty, cx, cy)
DECLARE SUB File (FileType)
DECLARE SUB Fishery ()
DECLARE SUB FleeBattle ()
DECLARE SUB Flicker (flx, fly, fls)
DECLARE SUB GameOver ()
DECLARE SUB getch ()
DECLARE SUB GetGraphics ()
DECLARE SUB GetMoves ()
DECLARE SUB GetName (p)
DECLARE SUB GetPlayer (p)
DECLARE SUB InitBattle (B)
DECLARE SUB Init ()
DECLARE SUB Inventory ()
DECLARE SUB LevelUp (p)
DECLARE SUB LoadMap ()
DECLARE SUB Main ()
DECLARE SUB Message (mes$)
DECLARE SUB NotEnoughGold ()
DECLARE SUB Options ()
DECLARE SUB Pause ()
DECLARE SUB PlayWave (WFile$)
DECLARE SUB PrintOut ()
DECLARE SUB QuitGame ()
DECLARE SUB RandTalk ()
DECLARE SUB Search (find)
DECLARE SUB SellItems (sellclr)
DECLARE SUB SetStats ()
DECLARE SUB ShopArmor (Available)
DECLARE SUB ShopChurch ()
DECLARE SUB ShopInn (RoomPrice)
DECLARE SUB ShopItem (Available)
DECLARE SUB ShopWeapon (Available)
DECLARE SUB ShopWhore (shp)
DECLARE SUB Status ()
DECLARE SUB TestReturn ()
DECLARE SUB TestStep ()
DECLARE SUB ThankYou (tyline)
DECLARE SUB UseItem (ItemToUse, p)
DECLARE SUB Warp (warpx, warpy)
DECLARE SUB Welcome ()
DECLARE SUB WonBattle ()
DECLARE SUB WriteReg (Reg, Value)

'@Started programming on May 3rd.

ON ERROR GOTO ErrorCatch
CLEAR , , 500
RANDOMIZE TIMER

CONST TRUE% = -1
CONST FALSE% = 0
CONST NUMITEMS% = 15
CONST NUMFILES% = 58

CONST WON% = -1
CONST FLEE% = -2
CONST NONE% = -4

CONST DEATH% = -1
CONST POISON% = -2

CONST GOOD% = -1
CONST BAD% = -2

CONST ATTACK% = -3
CONST RETREAT% = -4
CONST SPECIAL% = -5
CONST NOTING% = -6

CONST BLAST% = -7
CONST HEAL% = -8
CONST BARRIER% = -9
CONST HOLYFIRE% = -10
CONST TREMOR% = -11
CONST NUKE% = -12

CONST UB% = 159
CONST DB% = 127
CONST LB% = 158
CONST RB% = 126
CONST YB% = 2
CONST XB% = 6
CONST AB% = 8
CONST BB% = 3
CONST NORM% = 142

TYPE FoeType
 hp AS INTEGER
 xp AS INTEGER
 gold AS INTEGER
 ap AS INTEGER
 dp AS INTEGER
 dx AS INTEGER
 move AS INTEGER
 action AS INTEGER
 target AS INTEGER
 num AS INTEGER
 x AS INTEGER
 y AS INTEGER
 state AS INTEGER
 size AS INTEGER
 pname AS STRING * 10
END TYPE

TYPE TileType
 x AS INTEGER
 y AS INTEGER
 style AS INTEGER
END TYPE

TYPE YouType
 x AS INTEGER
 y AS INTEGER
 across AS INTEGER
 down AS INTEGER
 gold AS INTEGER
 steps AS LONG
 leader AS INTEGER
 battles AS INTEGER
 exist AS INTEGER
 mango AS INTEGER
 CanRun AS INTEGER
 pauser AS INTEGER
END TYPE

TYPE PlayerType
 hp AS INTEGER
 hpmax AS INTEGER
 mp AS INTEGER
 mpmax AS INTEGER
 lv AS INTEGER
 xp AS INTEGER
 total AS INTEGER
 st AS INTEGER
 dx AS INTEGER
 iq AS INTEGER
 ap AS INTEGER
 dp AS INTEGER
 armor AS INTEGER
 weapon AS INTEGER
 action AS INTEGER
 x AS INTEGER
 y AS INTEGER
 target AS INTEGER
 state AS INTEGER
 pname AS STRING * 10
END TYPE

TYPE ItemType
 cost AS INTEGER
 amount AS INTEGER
 ap AS INTEGER
 dp AS INTEGER
 itemcol AS INTEGER
 label AS STRING * 20
END TYPE

TYPE SpellType
 cost AS INTEGER
 own AS INTEGER
 spellcol AS INTEGER
 spellname AS STRING * 10
END TYPE

TYPE MapType
 monsters AS INTEGER
 level AS INTEGER
 before AS INTEGER
 occurance AS INTEGER
 num AS INTEGER
 across AS INTEGER
 down AS INTEGER
 area AS STRING * 10
END TYPE

DIM SHARED UKEY$, DKEY$, LKEY$, RKEY$
DIM SHARED ESCAPEKEY$, SPACEKEY$, ENTERKEY$
DIM SHARED GFiles$(NUMFILES), Success
DIM SHARED text(42) AS STRING * 38
DIM SHARED BattleStatus, Radius AS SINGLE

'@Start graphics arrays
DIM SHARED back(2049)

DIM SHARED hero(129), hero2(129), hero3(129)
DIM SHARED dead(129), dead2(129), dead3(129)
DIM SHARED ped(129), ped2(129), ped3(129)
DIM SHARED king(129), merchant(129), folk(129), folk2(129)
DIM SHARED fish(129)

DIM SHARED wall(129), wall2(129), wall3(129), wall4(129)
DIM SHARED town(129), temple(129)
DIM SHARED block(129), brick(129), pad(129)
DIM SHARED river(129), ocean(129)
DIM SHARED grass(129), forest(129)
DIM SHARED candle(129), pot(129), table(129), door(129), chest(129)
DIM SHARED floor(129), mount(129), mount2(129), rock(129), rock2(129)

DIM SHARED jaw(129), drape(129), eagle(129)
DIM SHARED widow(129), chair(129)

DIM SHARED darklord(2049)
DIM SHARED beast(513), jack(513)
DIM SHARED dragon(513), dragon2(513), dragon3(513)
DIM SHARED ghost(129), genie(129), goblin(129), skeleton(129), wolf(129)
DIM SHARED orc(129), knight(129), knight2(129), slime(129), ghoul(129)
'@End graphic arrays!

DIM SHARED tile(50, 50) AS TileType
DIM SHARED you AS YouType
DIM SHARED player(3) AS PlayerType
DIM SHARED item(NUMITEMS) AS ItemType
DIM SHARED spell(3, 11) AS SpellType
DIM SHARED map AS MapType
DIM SHARED foe(4) AS FoeType
DIM SHARED FoeStats(11) AS FoeType

'@Game status variables
DIM SHARED Crown, MasterKey
DIM SHARED TalkExpedition, TNT

DIM SHARED BurgDoorInn, BurgDoorShop
DIM SHARED CdaleDoorInn, CdaleDoorChest, CdaleDoorGate

Init
GetGraphics
GetName (1)
LoadMap
DrawScreen (TRUE)
SetStats
Main

ErrorCatch:
BEEP
CLS
COLOR 14
PRINT "Error!"
getch
CLS
COLOR 7: PRINT "ERROR"; ERR
SELECT CASE ERR
CASE 6
PRINT "There has been an overflow in DRAGON."
PRINT "Something is probably wrong"
PRINT "with some files..."
CASE 53
PRINT "You have a missing file."
PRINT "Check README.TXT if you have it"
PRINT "for all files DRAGON requires."
CASE 76
PRINT "You do not have a DRAGON directory."
PRINT "This game should have been copied"
PRINT "with its installation program."
CASE ELSE
PRINT "A miscellaneous error has occured..."
PRINT "If this error continues, try"
PRINT "re-installing DRAGON.  Also, if"
PRINT "you want to keep your character,"
PRINT "copy DRAGON.SAV into a different"
PRINT "directory before installation."
END SELECT
PRINT
PRINT "DRAGON by Matthew Hackett"
'getch
CleanUp
SYSTEM

SUB About (a)

 CLS
 COLOR 9

 PRINT "              DRAGONIER               "
 PRINT
 PRINT "    You have ran Dragonier"; a; "times."
 LOCATE 5, 1
 PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 place = 1: GOSUB PutAbout

 PlayWave "MATT"

 DO
 SELECT CASE INKEY$
 CASE UKEY$
 IF place > 1 THEN place = place - 1
 GOSUB PutAbout
 CASE DKEY$
 IF place < 37 THEN place = place + 1
 GOSUB PutAbout
 'CASE YB, XB, AB, BB: ERASE text$: EXIT SUB
 CASE SPACEKEY$, ENTERKEY$: ERASE text$: EXIT SUB
 END SELECT
 LOOP

PutAbout:
 LOCATE 6, 2
 FOR i = place TO place + 5
 LOCATE , 2: PRINT text$(i)
 NEXT: RETURN

END SUB

FUNCTION Arrow (ax, miny, maxy, aclr)

 cry = miny
 COLOR aclr: LOCATE cry, ax: PRINT ""

 DO
'  Control = Joy
'  IF Control > 0 THEN
'  COLOR 0: LOCATE cry, ax: PRINT ""
'  SELECT CASE Control
'   CASE UB: IF cry > miny THEN cry = cry - 1 ELSE cry = maxy
'   CASE DB: IF cry < maxy THEN cry = cry + 1 ELSE cry = miny
'   CASE YB: Arrow = cry: EXIT FUNCTION
'   CASE BB: Arrow = FALSE: EXIT FUNCTION
'  END SELECT
'  COLOR aclr: LOCATE cry, ax: PRINT ""
'  END IF
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
  COLOR 0: LOCATE cry, ax: PRINT ""
  SELECT CASE kbhit$
   CASE UKEY$: IF cry > miny THEN cry = cry - 1 ELSE cry = maxy
   CASE DKEY$: IF cry < maxy THEN cry = cry + 1 ELSE cry = miny
   CASE ENTERKEY$, SPACEKEY$: Arrow = cry: EXIT FUNCTION
   CASE ESCAPEKEY$: Arrow = FALSE: EXIT FUNCTION
  END SELECT
  COLOR aclr: LOCATE cry, ax: PRINT ""
  END IF

 LOOP

END FUNCTION

SUB Battle
 
 DO
  GetMoves
  CLS
  DrawBattle
  DoBattle
 LOOP WHILE BattleStatus = NONE

 SELECT CASE BattleStatus
  CASE FLEE: COLOR 15: Message "You fled the scenario!": Pause
  CASE WON: WonBattle
 END SELECT

 CLS
 SetStats
 DrawScreen (TRUE)

END SUB

FUNCTION BattleItems (plib)
      
 COLOR 15
 LOCATE 4, 1:  CALL Box(11, 23)
 LOCATE 12, 4: PRINT "INVENTORY"
 LOCATE 22, 4: PRINT " Exit"
 ass = 13
 FOR n = 1 TO NUMITEMS
 IF item(n).amount > 0 THEN
 LOCATE ass, 5
 PRINT item(n).label$; item(n).amount
 item(n).itemcol = ass
 ass = ass + 1
 ELSE
 item(n).itemcol = 1
 END IF
 NEXT

 choice = Arrow(4, 13, 22, 9)
 SELECT CASE choice
  CASE FALSE, 22: BattleItems = FALSE: EXIT FUNCTION
  CASE ELSE
   LOCATE 18, 1: COLOR 15
   FOR m = 1 TO NUMITEMS
    IF choice = item(m).itemcol THEN
     IF m > 10 THEN
      player(plib).action = m
      DrawBattle
      Message item(player(plib).action).label$
      IF ChooseTarget(plib, GOOD) = FALSE THEN BattleItems = FALSE: EXIT FUNCTION
      BattleItems = TRUE: EXIT FUNCTION
     ELSE
      PlayWave "BEEP"
     END IF
    END IF
   NEXT
 END SELECT

END FUNCTION

SUB Box (startx, endx)
LOCATE startx, 1: PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
FOR i = startx + 1 TO endx - 1
LOCATE i, 1: PRINT TAB(3); "³                                    ³": NEXT
LOCATE endx, 1: PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
END SUB

SUB Cast (caster, sspell)

 COLOR 15

 player(caster).mp = player(caster).mp - spell(caster, sspell).cost

 SELECT CASE sspell
  CASE 1
   Message "BLAST"
   i2 = player(caster).y: ig = 1
   FOR i = player(caster).x TO foe(player(caster).target).x STEP -3
    ass = ran(1, 2): ig = ig + 1
    IF ran(0, 1) THEN ass = -ass
    CIRCLE (i, i2 + ass), ran(3, 13) + ig, ran(41, 44)
   NEXT i
   'damage = (ran(@, @)
   IF damage < 0 THEN damage = 0
   CALL DoDamage(BAD, player(caster).target, damage)

  CASE 2
   Message "HEAL"
   FOR index = 1 TO 3
    ig = 0
    FOR i = start TO start - 25 STEP -1
     ig = ig + 1
     CIRCLE (ran(0, 25) + (player(player(caster).target).x - 5), ran(0, 25) + (player(player(caster).target).y - 5)), 1, 31
    NEXT
   NEXT index
   player(player(caster).target).hp = player(player(caster).target).hp + (ran(0, player(caster).iq - 1) + 10)
   IF player(player(caster).target).hp > player(player(caster).target).hpmax THEN player(player(caster).target).hp = player(player(caster).target).hpmax
   Pause

  CASE 3
   Message "BARRIER"
   player(player(caster).target).state = BARRIER
   Pause

  CASE 4
   Message "HOLY FIRE"
   damage = (player(caster).iq * player(caster).lv) - foe(player(caster).target).dp
   foe(player(caster).target).ap = foe(player(caster).target).ap / 2
   IF damage < 0 THEN damage = 0
   CALL DoDamage(BAD, player(caster).target, damage)

  CASE 5
   Message "TREMOR"

  CASE 6
   Message "N U K E"

 END SELECT

END SUB

SUB CastInv

END SUB

SUB center (ctext$, cline, cclr)
IF cclr > -1 THEN COLOR cclr
LOCATE cline, 20 - (LEN(ctext$) / 2): PRINT ctext$
END SUB

FUNCTION ChooseTarget (pt, ttarget)

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

END FUNCTION

SUB CleanUp
SCREEN 9
SCREEN 0
ERASE hero, hero2, hero3, dead, dead2, dead3, ped, ped2, ped3, back
ERASE king, merchant, folk, folk2, fish, wall, wall2, wall3, wall4
ERASE town, temple, block, brick, pad, river, ocean, grass, forest
ERASE candle, pot, table, door, chest, floor, mount, mount2, rock, rock2
ERASE jaw, drape, eagle, widow, chair, darklord, beast, jack, ghoul
ERASE ghost, genie, goblin, skeleton, wolf, orc, knight, knight2, slime
ERASE tile, player, item, spell, foe, FoeStats, dragon, dragon2, dragon3
END SUB

SUB delay (deler&)
FOR delayee& = 1 TO deler& * 10: NEXT delayee&
END SUB

SUB DoBattle

 FOR NextMove = 300 TO 1 STEP -1
  FOR n = 1 TO you.exist
   IF NextMove = player(n).dx THEN DoPlayerMove (n)
   IF BattleStatus <> NONE THEN EXIT SUB
  NEXT
  FOR n = 1 TO map.num
   IF NextMove = foe(n).dx THEN DoFoeMove (n)
   IF BattleStatus <> NONE THEN EXIT SUB
  NEXT
 NEXT

END SUB

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

SUB DrawBattle

 CLS : DrawScreen (FALSE)

 COLOR 15
 LOCATE 18, 2: PRINT "ÚÄÄÄÄÄÄÄÄÄÄ¿ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿ÚÄÄÄÄÄÄÄÄÄ¿"
 LOCATE 19, 2: PRINT "³          ³³             ³³ ATTACK  ³"
 LOCATE 20, 2: PRINT "³          ³³HP:           ³³ SPECIAL ³"
 LOCATE 21, 2: PRINT "³          ³³HP:           ³³ SPELL   ³"
 LOCATE 22, 2: PRINT "³          ³³HP:           ³³ ITEM    ³"
 LOCATE 23, 2: PRINT "ÀÄÄÄÄÄÄÄÄÄÄÙÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙÀÄÄÄÄÄÄÄÄÄÙ"
 LOCATE 19, 16: PRINT player(you.leader).pname
 LOCATE 20, 18: PRINT USING "####/####"; player(1).hp; player(1).hpmax
 IF you.exist >= 2 THEN LOCATE 21, 18: PRINT USING "####/####"; player(2).hp; player(2).hpmax
 IF you.exist >= 3 THEN LOCATE 22, 18: PRINT USING "####/####"; player(3).hp; player(3).hpmax

 FOR i = 1 TO you.exist
  IF player(i).state <> DEATH THEN
   IF i = 1 THEN PUT (player(1).x, player(1).y), hero, PSET
   IF i = 2 THEN PUT (player(2).x, player(2).y), hero2, PSET
   IF i = 3 THEN PUT (player(3).x, player(3).y), hero3, PSET
  ELSE
   IF i = 1 THEN PUT (player(1).x, player(1).y), dead, PSET
   IF i = 2 THEN PUT (player(2).x, player(2).y), dead2, PSET
   IF i = 3 THEN PUT (player(3).x, player(3).y), dead3, PSET
  END IF
 NEXT

 FOR i = 1 TO map.num
  IF foe(i).hp > 0 THEN
   LOCATE i + 18, 3: PRINT foe(i).pname
   SELECT CASE foe(i).num
    CASE 1: PUT (foe(i).x, foe(i).y), slime, PSET
    CASE 2: PUT (foe(i).x, foe(i).y), goblin, PSET
    CASE 3: PUT (foe(i).x, foe(i).y), orc, PSET
    CASE 4: PUT (foe(i).x, foe(i).y), wolf, PSET
    CASE 5: PUT (foe(i).x, foe(i).y), skeleton, PSET
    CASE 6: PUT (foe(i).x, foe(i).y), ghoul, PSET
    CASE 10: PUT (foe(i).x, foe(i).y), jack, PSET
   END SELECT
  END IF
 NEXT

END SUB

SUB DrawFile (siz, drf$)
OPEN drf$ FOR INPUT AS #1
FOR a = 1 TO siz
FOR d = 1 TO siz
INPUT #1, clr
PSET (d, a), clr
NEXT: NEXT: CLOSE
END SUB

SUB DrawScreen (dweh)
FOR a = -you.across TO you.across
FOR d = -you.down TO you.down
IF a = 0 AND d = 0 AND dweh = TRUE THEN :  ELSE CALL DrawTile(you.x + a, you.y + d, 10 + a, 6 + d)
NEXT
NEXT
IF dweh = TRUE THEN
IF you.leader = 1 THEN PUT (tile(10, 6).x, tile(10, 6).y), hero, PSET
IF you.leader = 2 THEN PUT (tile(10, 6).x, tile(10, 6).y), hero2, PSET
IF you.leader = 3 THEN PUT (tile(10, 6).x, tile(10, 6).y), hero3, PSET
END IF
END SUB

SUB DrawTile (tx, ty, cx, cy)
 a = tile(cx, cy).x
 d = tile(cx, cy).y
 SELECT CASE tile(tx, ty).style
  CASE 0: LINE (a, d)-(a + 15, d + 15), 0, BF
 
  CASE 1: PUT (a, d), grass, PSET
  CASE 2: PUT (a, d), forest, PSET
  CASE 3: PUT (a, d), pot, PSET
  CASE 4: PUT (a, d), brick, PSET
  CASE 5: PUT (a, d), floor, PSET
  CASE 6: PUT (a, d), town, PSET
  CASE 7: PUT (a, d), chest, PSET
  CASE 8: PUT (a, d), block, PSET
  CASE 9: PUT (a, d), pad, PSET
  CASE 10: PUT (a, d), jaw, PSET
  CASE 11: PUT (a, d), chair, PSET
  CASE 12: PUT (a, d), rock2, PSET
  CASE 13: PUT (a, d), temple, PSET

  CASE 21: PUT (a, d), wall, PSET
  CASE 22: PUT (a, d), wall2, PSET
  CASE 23: PUT (a, d), ocean, PSET
  CASE 24: PUT (a, d), river, PSET
  CASE 25: PUT (a, d), table, PSET
  CASE 26: PUT (a, d), candle, PSET
  CASE 27: PUT (a, d), door, PSET
  CASE 28: PUT (a, d), wall3, PSET
  CASE 29: PUT (a, d), eagle, PSET
  CASE 30: PUT (a, d), wall4, PSET
  CASE 31: PUT (a, d), drape, PSET
  CASE 32: PUT (a, d), widow, PSET
  CASE 33: PUT (a, d), mount, PSET
  CASE 34: PUT (a, d), mount2, PSET
  CASE 35: PUT (a, d), rock, PSET

  CASE 41: PUT (a, d), king, PSET
  CASE 42: PUT (a, d), merchant, PSET
  CASE 43: PUT (a, d), folk, PSET
  CASE 44: PUT (a, d), ped, PSET
  CASE 45: PUT (a, d), ped2, PSET
  CASE 46: PUT (a, d), ped3, PSET
  CASE 47: PUT (a, d), hero2, PSET
  CASE 48: PUT (a, d), hero3, PSET
  CASE 49: PUT (a, d), folk2, PSET
  CASE 50: PUT (a, d), fish, PSET

  END SELECT
END SUB

SUB File (FileType)

 a$ = "DRAGON"
 COLOR 15: LOCATE 4, 1
 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³WHICH FILE?                      ³"
 PRINT TAB(3); "³  DRAGON1.SAV                     ³"
 PRINT TAB(3); "³  DRAGON2.SAV                     ³"
 PRINT TAB(3); "³  DRAGON3.SAV                     ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 SELECT CASE Arrow(4, 6, 8, 9)
  CASE FALSE: EXIT SUB
  CASE 6: a$ = a$ + "1"
  CASE 7: a$ = a$ + "2"
  CASE 8: a$ = a$ + "3"
 END SELECT: a$ = a$ + ".SAV"

 LOCATE 5, 1: COLOR 15

 IF FileType = 1 THEN
 
  PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
  PRINT TAB(3); "³SAVING                           ³"
  PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
 
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
 
  PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
  PRINT TAB(3); "³SAVE                             ³"
  PRINT TAB(3); "³ Finished saving.  Hit any key... ³"
  PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 END IF

 IF FileType = 2 THEN
 
  PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
  PRINT TAB(3); "³LOADING                          ³"
  PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
 
  OPEN a$ FOR INPUT AS #1
   INPUT #1, Crown
   INPUT #1, MasterKey
   INPUT #1, BurgDoorInn
   INPUT #1, BurgDoorShop
   INPUT #1, CdaleDoorInn
   INPUT #1, CdaleDoorChest
   INPUT #1, CdaleDoorGate
   INPUT #1, TalkExpedition
   INPUT #1, TNT
   INPUT #1, you.x
   INPUT #1, you.y
   INPUT #1, you.across
   INPUT #1, you.down
   INPUT #1, you.gold
   INPUT #1, you.steps
   INPUT #1, you.battles
   INPUT #1, you.exist
   INPUT #1, you.mango
   INPUT #1, you.pauser
   INPUT #1, map.monsters
   INPUT #1, map.level
   INPUT #1, map.before
   INPUT #1, map.occurance
   INPUT #1, map.num
   INPUT #1, map.area$
   FOR i = 1 TO 3
    INPUT #1, player(i).hp
    INPUT #1, player(i).hpmax
    INPUT #1, player(i).mp
    INPUT #1, player(i).mpmax
    INPUT #1, player(i).lv
    INPUT #1, player(i).xp
    INPUT #1, player(i).total
    INPUT #1, player(i).st
    INPUT #1, player(i).dx
    INPUT #1, player(i).iq
    INPUT #1, player(i).ap
    INPUT #1, player(i).dp
    INPUT #1, player(i).armor
    INPUT #1, player(i).weapon
    INPUT #1, player(i).state
    INPUT #1, player(i).pname$
   NEXT
   FOR p = 1 TO 3
    FOR s = 1 TO 6
     INPUT #1, spell(p, s).own
    NEXT
   NEXT
   FOR i = 1 TO NUMITEMS
    INPUT #1, item(i).amount
   NEXT
   FOR a = 1 TO 50
   FOR d = 1 TO 50
    INPUT #1, tile(a, d).style
   NEXT: NEXT
  CLOSE :  LOCATE 6, 1
 
  PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
  PRINT TAB(3); "³LOAD                             ³"
  PRINT TAB(3); "³ Finished loading.  Hit any key...³"
  PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 END IF
getch
DrawScreen (TRUE)
END SUB

SUB Fishery
COLOR 9
Message "Welcome to my Fishery, youngin!": getch
IF YesNo("Would you like to buy a fish for 50? <Y/N>") = TRUE THEN
 IF you.gold >= 50 THEN
  you.gold = you.gold - 50
  item(14).amount = item(14).amount + 1
  ThankYou (4)
 ELSE
  PlayWave "BEEP"
 END IF
END IF
IF ran(0, 24) = 0 THEN
 Message "Well here's a fish anyway!"
 PlayWave "TUNE"
 item(14).amount = item(14).amount + 1
ELSE
 Message "Oh well..."
END IF
Pause
CLS
DrawScreen (TRUE)
END SUB

SUB Flicker (flx, fly, fls)

 ERASE back
 GET (flx, fly)-(flx + fls, fly + fls), back

 FOR i = 1 TO 3
  LINE (flx, fly)-(flx + fls, fly + fls), 31, B
  delay (1000)
  PUT (flx, fly), back, PSET
  delay (1000)
 NEXT

END SUB

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
  CALL center("³DRAGONIER                        ³", 10, i)
  CALL center("³ May 1996 by Matthew Hackett      ³", 11, i)
  CALL center("ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ", 12, i)
 NEXT
 FOR i = 233 TO 193 STEP -1
  delay (50)
  CALL center("ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿", 9, i)
  CALL center("³DRAGONIER                        ³", 10, i)
  CALL center("³ May 1996 by Matthew Hackett      ³", 11, i)
  CALL center("ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ", 12, i)
 NEXT: QuitGame

END SUB

SUB getch
DO
LOOP WHILE INKEY$ = ""
END SUB

SUB GetGraphics

CLS : CALL center("Initializing graphics...", 11, 15)

FOR i = 1 TO NUMFILES
IF i <= 52 THEN
 DrawFile 16, GFiles$(i)
ELSEIF i = 58 THEN
 DrawFile 64, GFiles$(i)
ELSE
 DrawFile 32, GFiles$(i)
END IF
SELECT CASE i
CASE 1: GET (1, 1)-(16, 16), hero
CASE 2: GET (1, 1)-(16, 16), hero2
CASE 3: GET (1, 1)-(16, 16), hero3
CASE 4: GET (1, 1)-(16, 16), dead
CASE 5: GET (1, 1)-(16, 16), dead2
CASE 6: GET (1, 1)-(16, 16), dead3
CASE 7: GET (1, 1)-(16, 16), king
CASE 8: GET (1, 1)-(16, 16), merchant
CASE 9: GET (1, 1)-(16, 16), folk
CASE 10: GET (1, 1)-(16, 16), ped
CASE 11: GET (1, 1)-(16, 16), ped2
CASE 12: GET (1, 1)-(16, 16), ped3
CASE 13: GET (1, 1)-(16, 16), ghost
CASE 14: GET (1, 1)-(16, 16), skeleton
CASE 15: GET (1, 1)-(16, 16), goblin
CASE 16: GET (1, 1)-(16, 16), wolf
CASE 17: GET (1, 1)-(16, 16), genie
CASE 18: GET (1, 1)-(16, 16), orc
CASE 19: GET (1, 1)-(16, 16), knight
CASE 20: GET (1, 1)-(16, 16), knight2
CASE 21: GET (1, 1)-(16, 16), slime
CASE 22: GET (1, 1)-(16, 16), grass
CASE 23: GET (1, 1)-(16, 16), forest
CASE 24: GET (1, 1)-(16, 16), pot
CASE 25: GET (1, 1)-(16, 16), brick
CASE 26: GET (1, 1)-(16, 16), floor
CASE 27: GET (1, 1)-(16, 16), town
CASE 28: GET (1, 1)-(16, 16), chest
CASE 29: GET (1, 1)-(16, 16), block
CASE 30: GET (1, 1)-(16, 16), pad
CASE 31: GET (1, 1)-(16, 16), wall
CASE 32: GET (1, 1)-(16, 16), wall2
CASE 33: GET (1, 1)-(16, 16), wall3
CASE 34: GET (1, 1)-(16, 16), ocean
CASE 35: GET (1, 1)-(16, 16), river
CASE 36: GET (1, 1)-(16, 16), table
CASE 37: GET (1, 1)-(16, 16), candle
CASE 38: GET (1, 1)-(16, 16), door
CASE 39: GET (1, 1)-(16, 16), jaw
CASE 40: GET (1, 1)-(16, 16), eagle
CASE 41: GET (1, 1)-(16, 16), drape
CASE 42: GET (1, 1)-(16, 16), wall4
CASE 43: GET (1, 1)-(16, 16), widow
CASE 44: GET (1, 1)-(16, 16), chair
CASE 45: GET (1, 1)-(16, 16), mount
CASE 46: GET (1, 1)-(16, 16), mount2
CASE 47: GET (1, 1)-(16, 16), rock
CASE 48: GET (1, 1)-(16, 16), rock2
CASE 49: GET (1, 1)-(16, 16), folk2
CASE 50: GET (1, 1)-(16, 16), fish
CASE 51: GET (1, 1)-(16, 16), temple
CASE 52: GET (1, 1)-(16, 16), ghoul
CASE 53: GET (1, 1)-(32, 32), beast
CASE 54: GET (1, 1)-(32, 32), jack
CASE 55: GET (1, 1)-(32, 32), dragon
CASE 56: GET (1, 1)-(32, 32), dragon2
CASE 57: GET (1, 1)-(32, 32), dragon3
CASE 58: GET (1, 1)-(64, 64), darklord
END SELECT
NEXT

END SUB

FUNCTION GetInput$ (gx, gy, length, gerase$)

 LOCATE gx, gy: PRINT STRING$(length, gerase$)

 DO
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
   SELECT CASE ASC(kbhit$)
    CASE 13: EXIT DO
    CASE 8
     IF r = 8 THEN
      IF LEN(a$) > 0 THEN a$ = LEFT$(a$, LEN(a$) - 1): LOCATE gx, gy + LEN(a$): PRINT gerase$
     END IF
    CASE 65 TO 90, 97 TO 122
     IF LEN(a$) < 10 THEN a$ = a$ + UCASE$(kbhit$)
   END SELECT: LOCATE gx, gy: PRINT a$
  END IF
 LOOP

 GetInput$ = a$

END FUNCTION

SUB GetMoves
COLOR 15
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
END SUB

SUB GetName (p)

 CLS : COLOR 15
 PRINT
 PRINT
 PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT "³          WHAT SHALL YOU BE          ³"
 PRINT "³          MARKED AS IN THE           ³"
 PRINT "³          BOOK OF LEGENDS?           ³"
 PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 IF p = 1 THEN PUT (152, 0), hero, PSET
 IF p = 2 THEN PUT (152, 0), hero2, PSET
 IF p = 3 THEN PUT (152, 0), hero3, PSET

 givem$ = GetInput(8, 15, 10, "_")
 IF LEN(givem$) < 1 THEN
  IF p = 1 THEN givem$ = "RICHTER"
  IF p = 2 THEN givem$ = "NATHIA"
  IF p = 3 THEN givem$ = "THOEUS"
 END IF

 player(p).pname$ = givem$

END SUB

SUB GetPlayer (p)
COLOR 15
SELECT CASE p
CASE 2
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
END SELECT
ExitGetP:
 IF p = 2 THEN tile(39, 10).style = 1
 '@IF p = 3 THEN
 player(p).state = 0
 you.exist = p
 you.mango = you.mango + 10
 PlayWave "TUNE"
 CLS
 DrawScreen (TRUE)
END SUB

SUB Init

ON ERROR GOTO ErrorCatch

CHDIR "C:\DRAGON"

PRINT "ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»"
PRINT "º                        ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿                           º"
PRINT "º                        ³  D R A G O N I E R  ³                           º"
PRINT "º                        ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ                           º"
PRINT "º                                                                          º"
PRINT "º                     - Programming by Matt Hackett -                      º"
PRINT "º                                                                          º"
PRINT "º               - Story by Matt Hackett and Jim MacDonald -                º"
PRINT "º                                                                          º"
PRINT "º                      - Artwork by Michael Hackett -                      º"
PRINT "º                                                                          º"
PRINT "ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼"
PRINT "Initialiizing..."
PRINT "Checking sound card..."
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
Success = FALSE
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

FOR a = 1 TO 19
FOR d = 1 TO 11
tile(a, d).x = 16 * a
tile(a, d).y = 16 * d
NEXT
NEXT

UKEY$ = CHR$(0) + "H"
DKEY$ = CHR$(0) + "P"
LKEY$ = CHR$(0) + "K"
RKEY$ = CHR$(0) + "M"
ESCAPEKEY$ = CHR$(27)
ENTERKEY$ = CHR$(13)
SPACEKEY$ = CHR$(32)

OPEN "DRAGON.TXT" FOR INPUT AS #1
FOR i = 1 TO 42
 LINE INPUT #1, text$(i)
NEXT
INPUT #1, NumPlays
CLOSE
NumPlays = NumPlays + 1
OPEN "DRAGON.TXT" FOR OUTPUT AS #1
FOR i = 1 TO 42
 PRINT #1, text$(i)
NEXT
PRINT #1, NumPlays
CLOSE

OPEN "DRAGON.INI" FOR INPUT AS #1
 FOR i = 1 TO 11
  INPUT #1, cst
  INPUT #1, snm$
  FOR n = 1 TO 3
   spell(n, i).cost = cst
   spell(n, i).spellname$ = snm$
  NEXT
 NEXT
 FOR i = 0 TO NUMITEMS
  INPUT #1, item(i).label$
  INPUT #1, item(i).cost
  INPUT #1, item(i).ap
  INPUT #1, item(i).dp
 NEXT
 FOR i = 1 TO NUMFILES
  INPUT #1, GFiles$(i)
 NEXT
CLOSE

OPEN "FOE.DAT" FOR INPUT AS #1
FOR i = 0 TO 11
INPUT #1, FoeStats(i).pname$
INPUT #1, FoeStats(i).hp
INPUT #1, FoeStats(i).xp
INPUT #1, FoeStats(i).gold
INPUT #1, FoeStats(i).ap
INPUT #1, FoeStats(i).dp
INPUT #1, FoeStats(i).dx
INPUT #1, FoeStats(i).move
INPUT #1, FoeStats(i).size
NEXT
CLOSE

 '@Set default data (handy for play testing)
 '@ Add player 2+3's stats...
 map.level = 1
 you.gold = 100
 you.leader = 1
 you.pauser = 2
 you.exist = 1

 player(1).hp = 50
 player(1).mp = 0
 player(1).lv = 1
 player(1).xp = 50
 player(1).total = 0
 player(1).st = 9
 player(1).dx = 8
 player(1).iq = 7
 item(1).amount = 1
 item(11).amount = 1
 player(2).hp = 30
 player(2).mp = 20
 player(2).lv = 2
 player(2).xp = 80
 player(2).total = 50
 player(2).st = 2
 player(2).dx = 5
 player(2).iq = 8
 player(3).hp = 50
 player(3).mp = 20
 player(3).lv = 13
 player(3).xp = 800
 player(3).total = 120
 player(3).st = 34
 player(3).dx = 13
 player(3).iq = 28
 FOR i = 1 TO 3
  player(i).hpmax = player(i).hp
  player(i).mpmax = player(i).mp
  player(1).weapon = 0
  player(1).armor = 0
  player(1).target = 1
 NEXT
 spell(2, 1).own = TRUE
 spell(3, 2).own = TRUE

SCREEN 13

FOR i = 1 TO 63
 PALETTE i + 192, i
NEXT

CLS : COLOR 9

FOR i = 193 TO 230 STEP 2
COLOR i
LOCATE 1
PRINT
PRINT
PRINT
PRINT "ÉÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ»"
PRINT "º       ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿        º"
PRINT "º       ³  D R A G O N I E R  ³        º"
PRINT "º       ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ        º"
PRINT "º                                      º"
PRINT "º           By Matt Hackett            º"
PRINT "º                                      º"
PRINT "º       All Artwork Provided By        º"
PRINT "º           Michael Hackett            º"
PRINT "º                                      º"
PRINT "º       ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿        º"
PRINT "º       ³   Hit A for About   ³        º"
PRINT "º       ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ        º"
PRINT "ÈÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ¼"
NEXT

 PlayWave "DRAGON"

 DO
  'Control = Joy
  'IF Control > 0 THEN
  ' IF Control = AB THEN About (NumPlays)
  ' EXIT DO
  'END IF
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
    About (NumPlays)
    EXIT DO
  END IF
 LOOP
 
END SUB

SUB InitBattle (B)

 SetStats

 PlayWave "BATTLE"

 BattleStatus = NONE
 you.CanRun = TRUE
 you.battles = you.battles + 1

IF B = 0 THEN
 map.num = ran(1, 4)

 FOR n = 1 TO 4
  IF map.monsters = 1 THEN
   ass = ran(0, 7)
   IF ass = 0 THEN RandM = 1
   IF ass = 1 THEN RandM = 1
   IF ass = 2 THEN RandM = 1
   IF ass = 3 THEN RandM = 2
   IF ass = 4 THEN RandM = 2
   IF ass = 5 THEN RandM = 3
   IF ass = 6 THEN RandM = 3
   IF ass = 7 THEN RandM = 4
   IF n > map.num THEN RandM = 0
  END IF
  IF map.monsters = 2 THEN
   RandM = ran(5, 7)
  END IF
  foe(n).hp = FoeStats(RandM).hp
  foe(n).xp = FoeStats(RandM).xp
  foe(n).gold = FoeStats(RandM).gold
  foe(n).ap = FoeStats(RandM).ap
  foe(n).dp = FoeStats(RandM).dp
  foe(n).dx = FoeStats(RandM).dx
  foe(n).move = FoeStats(RandM).move
  foe(n).size = FoeStats(RandM).size
  foe(n).pname$ = FoeStats(RandM).pname$
  foe(n).num = RandM
  foe(n).state = 0
  foe(n).target = 1
 NEXT
ELSE
 you.CanRun = FALSE
 map.num = 1
 SELECT CASE B
  CASE 1: Foette = 10
 END SELECT
 foe(1).hp = FoeStats(Foette).hp
 foe(1).xp = FoeStats(Foette).xp
 foe(1).gold = FoeStats(Foette).gold
 foe(1).ap = FoeStats(Foette).ap
 foe(1).dp = FoeStats(Foette).dp
 foe(1).dx = FoeStats(Foette).dx
 foe(1).move = FoeStats(Foette).move
 foe(1).size = FoeStats(Foette).size
 foe(1).pname$ = FoeStats(Foette).pname$
 foe(1).num = Foette
 foe(1).state = 0
 foe(1).target = 1
END IF

foe(1).x = ran(16, 31): foe(1).y = ran(50, 60)
foe(2).x = ran(74, 100): foe(2).y = ran(50, 60)
foe(3).x = ran(16, 31): foe(3).y = ran(97, 103)
foe(4).x = ran(74, 100): foe(4).y = ran(97, 103)

FOR i = 1 TO 3
player(i).x = ran(260, 300)
NEXT
player(1).y = ran(60, 70)
player(2).y = ran(80, 90)
player(3).y = ran(110, 120)
IF you.exist = 1 THEN player(1).y = ran(80, 90)

Battle

END SUB

SUB Inventory

 COLOR 15: LOCATE 3, 1

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³INVENTORY                        ³"
 PRINT TAB(3); "³  Use                             ³"
 PRINT TAB(3); "³  Equip                           ³"
 PRINT TAB(3); "³  Drop                            ³"
 PRINT TAB(3); "³  Exit                            ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 SELECT CASE Arrow(4, 5, 8, 9)
  CASE FALSE: GOTO ExitInventory
  CASE 5: GOTO UseItems
  CASE 6: GOTO EquipItem
  CASE 7: GOTO DropItem
  CASE 8: GOTO ExitInventory
 END SELECT

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

DropItem:

 GOSUB PutInv

 SELECT CASE Arrow(4, 6, 16, 9)
  CASE FALSE: GOTO ExitInventory
  CASE 16: GOTO ExitInventory
  CASE ELSE
   FOR it = 1 TO NUMITEMS
    IF cry = item(it).itemcol THEN
     item(it).amount = item(it).amount - 1
     Message "Oops!"
    END IF
   NEXT
 END SELECT

ExitInventory:
DrawScreen (TRUE)
END SUB

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

SUB LoadMap

 CLS : CALL center("Loading...", 12, 15)

 SELECT CASE map.level
  CASE 1: a$ = "BURG"
  CASE 2: a$ = "WORLD"
  CASE 3: a$ = "CDALE"
  CASE 4: a$ = "WCAVE"
  CASE 5: a$ = "ZYRLA"
  CASE 6: a$ = "BRINTON"
 END SELECT: map.area$ = a$

 OPEN a$ + ".MAP" FOR INPUT AS #1
  INPUT #1, you.x
  INPUT #1, you.y
  INPUT #1, map.occurance
  INPUT #1, map.monsters
  INPUT #1, map.across
  INPUT #1, map.down
  FOR d = 1 TO 50
  FOR a = 1 TO 50
  INPUT #1, tile(a, d).style
  NEXT: NEXT
 CLOSE

 SELECT CASE map.level
   CASE 1
    IF BurgDoorInn = 2 THEN tile(15, 29).style = 4
    IF BurgDoorShop = 2 THEN tile(31, 12).style = 4
   CASE 2
    IF map.before = 1 THEN you.x = 19: you.y = 19
    IF map.before = 3 THEN you.x = 10: you.y = 38
    IF map.before = 4 THEN you.x = 9: you.y = 16
   CASE 3
    IF CdaleDoorInn = 2 THEN tile(12, 23).style = 4
    IF CdaleDoorChest = 2 THEN tile(24, 27).style = 4
    IF CdaleDoorGate = 2 THEN tile(26, 14).style = 4
    IF you.exist > 1 THEN tile(39, 10).style = 1
   CASE 4
    IF map.before = 5 THEN you.x = 37: you.y = 44
    IF TalkExpedition = TRUE AND CdaleDoorGate = 0 THEN
     tile(31, 40).style = 49
    END IF
    IF TNT = 2 THEN
     tile(36, 43).style = 12
     tile(37, 43).style = 12
    END IF
   CASE 5
    IF map.before = 4 THEN you.x = 40: you.y = 45
    IF map.before = 6 THEN you.x = 11: you.y = 43
   CASE 6
 END SELECT
 you.across = map.across
 you.down = map.down

END SUB

FUNCTION Location (lx, ly)
Location = FALSE
IF you.x = lx AND you.y = ly THEN Location = TRUE
END FUNCTION

SUB Main
DO

SELECT CASE INKEY$
CASE ESCAPEKEY$
 COLOR 15
 IF YesNo("Quit Game? <Y/N>") = TRUE THEN QuitGame
 CLS
 DrawScreen (TRUE)
CASE ENTERKEY$: Options
CASE SPACEKEY$: TestReturn
CASE UKEY$
 SELECT CASE tile(you.x, you.y - 1).style
 CASE 0 TO 12
 you.y = you.y - 1
 you.steps = you.steps + 1
 DrawScreen (TRUE): TestStep
 END SELECT
CASE DKEY$
 SELECT CASE tile(you.x, you.y + 1).style
 CASE 0 TO 12
 you.y = you.y + 1
 you.steps = you.steps + 1
 DrawScreen (TRUE): TestStep
 END SELECT
CASE LKEY$
 SELECT CASE tile(you.x - 1, you.y).style
 CASE 0 TO 12
 you.x = you.x - 1
 you.steps = you.steps + 1
 DrawScreen (TRUE): TestStep
 END SELECT
CASE RKEY$
 SELECT CASE tile(you.x + 1, you.y).style
 CASE 0 TO 12
 you.x = you.x + 1
 you.steps = you.steps + 1
 DrawScreen (TRUE): TestStep
 END SELECT
END SELECT

LOOP
END SUB

SUB Message (mes$)
IF LEN(mes$) > 30 THEN
 llen = 1
 mes2$ = RIGHT$(mes$, LEN(mes$) - 30)
 IF LEN(mes$) > 60 THEN
  llen = 2
  mes2$ = RIGHT$(LEFT$(mes$, 60), 30)
  mes3$ = RIGHT$(mes$, LEN(mes$) - 60)
 END IF
 mes$ = LEFT$(mes$, 30)
END IF
LOCATE 3, 1
PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
PRINT TAB(3); "³                                 ³"
FOR i = 1 TO llen
PRINT TAB(3); "³                                  ³"
NEXT
PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
center mes$, 4, -1
IF llen >= 1 THEN center mes2$, 5, -1
IF llen = 2 THEN center mes3$, 6, -1
END SUB

SUB NotEnoughGold
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
END SUB

SUB Options

 SetStats

 LOCATE 3: COLOR 15

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³  STATUS     ³"
 PRINT TAB(3); "³  INVENTORY  ³"
 PRINT TAB(3); "³  MAGIC      ³"
 PRINT TAB(3); "³  SEARCH     ³"
 PRINT TAB(3); "³             ³"
 PRINT TAB(3); "³  SAVE       ³"
 PRINT TAB(3); "³  LOAD       ³"
 PRINT TAB(3); "³             ³"
 PRINT TAB(3); "³  EXIT       ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 8, 6: PRINT player(you.leader).pname$
 LOCATE 11, 6
 SELECT CASE you.pauser
  CASE 0: PRINT "BLOCK"
  CASE 1: PRINT "SLOW"
  CASE 2: PRINT "MEDIUM"
  CASE 3: PRINT "FAST"
 END SELECT

 SELECT CASE Arrow(4, 4, 12, 9)
  CASE 4: Status
  CASE 5: Inventory
  CASE 6: CastInv
  CASE 7: TestReturn
  CASE 8
   you.leader = you.leader + 1
   IF you.leader > you.exist THEN you.leader = 1
   COLOR 15: LOCATE 8, 6: PRINT player(you.leader).pname$
  CASE 9: File (1)
  CASE 10: File (2)
  CASE 11
   you.pauser = you.pauser + 1
   IF you.pauser > 3 THEN you.pauser = 0
   LOCATE 11, 6
   SELECT CASE you.pauser
    CASE 0: PRINT "BLOCK"
    CASE 1: PRINT "SLOW"
    CASE 2: PRINT "MEDIUM"
    CASE 3: PRINT "FAST"
   END SELECT
 END SELECT
 CLS
 DrawScreen (TRUE)

END SUB

SUB Pause
SELECT CASE you.pauser
CASE 0: getch
CASE 1: delay (50000)
CASE 2: delay (10000)
CASE 3: delay (50)
END SELECT
END SUB

SUB PlayWave (WFile$)

IF Success = TRUE THEN

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

END IF

END SUB

FUNCTION PM (pmn)
au = ran(1, pmn)
rt = ran(0, 1)
IF rt = 0 THEN au = -au
PM = au
END FUNCTION

SUB QuitGame
CleanUp
COLOR 9
OPEN "TITLE.DAT" FOR INPUT AS #2
DO
INPUT #2, title$
PRINT title$
LOOP UNTIL EOF(2): CLOSE
COLOR 7
PlayWave "DRAGON"
SYSTEM
END SUB

FUNCTION ran (n1, n2)
ran = INT(RND * (n2 - (n1 - 1))) + n1
END FUNCTION

SUB RandTalk
t = ran(1, 10): LOCATE 3, 1: COLOR 15
SELECT CASE t
CASE 1: a$ = "Good day, warrior."
CASE 2: a$ = "Be sure to stay away from the West Cave!"
CASE 3: a$ = "I saw a shining light come    from the west.  It scared us.."
CASE 4: a$ = "The wind in the North is gett ing too powerful..."
CASE 5: a$ = "Go away -- you smell like my  dog."
CASE 6: a$ = "Are you a man or a woman?  I  can't tell."
CASE 7: a$ = "The reflex is a lonely child  just waiting by the park."
CASE 8: a$ = "I have nothing to say to filth like yourself, scum."
CASE 9: a$ = "Boy am I glad to see you!"
CASE 10: a$ = "I really like your sword.  It gives me cramps."
END SELECT
COLOR 15: Message a$
END SUB

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

SUB SetStats
FOR t = 1 TO you.exist
IF player(t).mp < 0 THEN player(t).mp = 0
IF player(t).hp > player(t).hpmax THEN player(t).hp = player(t).hpmax
IF player(t).mp > player(t).mpmax THEN player(t).mp = player(t).mpmax
player(t).ap = player(t).st + item(player(t).weapon).ap
player(t).dp = player(t).dx + item(player(t).armor).dp
NEXT
IF you.steps > 999999 THEN you.steps = 999999
IF player(1).state = DEATH AND player(2).state = DEATH AND player(3).state = DEATH THEN GameOver
WHILE player(you.leader).state = DEATH
you.leader = you.leader + 1
IF you.leader > 3 THEN you.leader = 1
WEND
END SUB

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

SUB Status

FOR p = 1 TO you.exist

 CLS : COLOR 15
 IF player(p).state = DEATH THEN COLOR 4
 LOCATE 3

 IF p = 1 THEN PUT (152, 0), hero, PSET
 IF p = 2 THEN PUT (152, 0), hero2, PSET
 IF p = 3 THEN PUT (152, 0), hero3, PSET

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³"; player(p).pname$
 PRINT TAB(3); "³"
 PRINT USING "  ³ HP ####/####"; player(p).hp; player(p).hpmax
 PRINT USING "  ³ MP ####/####"; player(p).mp; player(p).mpmax
 PRINT USING "  ³ LV ####"; player(p).lv
 PRINT TAB(3); "³"
 PRINT USING "  ³ XP ####/####"; player(p).total; player(p).xp
 PRINT USING "  ³   #########"; you.gold
 PRINT TAB(3); "³"
 PRINT TAB(3); "³ ST "; player(p).st
 PRINT TAB(3); "³ DX "; player(p).dx
 PRINT TAB(3); "³ IQ "; player(p).iq
 PRINT TAB(3); "³"
 PRINT TAB(3); "³ AP "; player(p).ap
 PRINT TAB(3); "³ DP "; player(p).dp
 PRINT TAB(3); "³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 FOR i = 4 TO 19
  LOCATE i, 40: PRINT "³"
 NEXT:  LOCATE 4

 LINE (100, 96)-(300, 102), 15, B
 LINE (100, 104)-(300, 110), 15, B
 LINE (100, 112)-(300, 118), 15, B
 LINE (101, 97)-(101 + player(p).st, 101), 4, BF
 LINE (101, 105)-(101 + player(p).dx, 109), 4, BF
 LINE (101, 113)-(101 + player(p).iq, 117), 4, BF

 LINE (100, 128)-(300, 134), 15, B
 LINE (100, 136)-(300, 142), 15, B
 LINE (101, 129)-(101 + player(p).ap, 133), 4, BF
 LINE (101, 137)-(101 + player(p).dp, 141), 4, BF
 getch

 CALL Box(4, 21): LOCATE 5, 4: PRINT "INVENTORY": ass = 7

 FOR it = 1 TO NUMITEMS
  IF item(it).amount > 0 THEN
   LOCATE ass, 5
   PRINT item(it).label$; item(it).amount
   ass = ass + 1
  END IF
 NEXT

 getch

 CALL Box(5, 21)
 LOCATE 6, 4: PRINT "MAGIC": ass = 8

 FOR i = 1 TO 6
  IF spell(p, i).own = TRUE THEN
   LOCATE ass, 5
   PRINT spell(p, i).spellname; spell(p, i).cost
   ass = ass + 1
  END IF
 NEXT

 LOCATE 6: getch

 PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT TAB(3); "³STATISTICS                         ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Weapon:                            ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Armor :                            ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Total Experience:                  ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Til Next Level  :                  ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Battles:                           ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Steps  :                           ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "³ Mango  :                           ³"
 PRINT TAB(3); "³                                    ³"
 PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 LOCATE 9, 13: PRINT item(player(p).weapon).label$
 LOCATE 11, 13: PRINT item(player(p).armor).label$
 LOCATE 13, 23: PRINT player(p).total
 LOCATE 15, 23: PRINT player(p).xp
 LOCATE 17, 14: PRINT you.battles
 LOCATE 19, 14: PRINT you.steps
 LOCATE 21, 14: PRINT you.mango

 getch

NEXT

CLS : DrawScreen (TRUE)

END SUB

FUNCTION Surrounding (st)
 Surrounding = FALSE
 IF tile(you.x - 1, you.y).style = st THEN Surrounding = TRUE
 IF tile(you.x + 1, you.y).style = st THEN Surrounding = TRUE
 IF tile(you.x, you.y - 1).style = st THEN Surrounding = TRUE
 IF tile(you.x, you.y + 1).style = st THEN Surrounding = TRUE
END FUNCTION

SUB TestReturn

 COLOR 15

 SELECT CASE map.level
  CASE 1
   IF Location(15, 12) = TRUE THEN ShopWeapon (2)
   IF Location(18, 27) = TRUE THEN ShopInn (5)
   IF Location(34, 29) = TRUE THEN ShopItem (1)
   IF Location(30, 18) = TRUE THEN ShopArmor (2)
   IF Location(34, 18) = TRUE THEN ShopChurch
   IF Location(32, 32) = TRUE THEN Search (0)
   IF Location(16, 29) = TRUE THEN
    IF BurgDoorInn = 1 THEN
     Message "You opened the door!": Pause
     BurgDoorInn = 2
     tile(15, 29).style = 4
     DrawScreen (TRUE)
    END IF
   END IF
   IF Location(31, 13) = TRUE THEN
    IF BurgDoorShop = 1 THEN
     Message "You opened the door!": Pause
     BurgDoorShop = 2
     tile(31, 12).style = 4
     DrawScreen (TRUE)
    END IF
   END IF
   IF Surrounding(43) = TRUE THEN Welcome
   IF Surrounding(44) = TRUE THEN
    IF TalkExpedition = TRUE AND TNT = 0 THEN
     Message "Howdy!  Yes Sorceress, I got  your message and I have your   TNT..."
     Pause
     Message "Here you are be happy!"
     PlayWave "TUNE"
     TNT = 1
    ELSE
     Message "Yeah go away."
    END IF
   END IF
   IF Surrounding(45) = TRUE THEN RandTalk
  CASE 3
   IF Location(12, 24) = TRUE THEN
    IF CdaleDoorInn = 1 THEN
     Message "You opened the door!": Pause
     CdaleDoorInn = 2
     tile(12, 23).style = 4
     DrawScreen (TRUE)
    END IF
   END IF
   IF Location(25, 27) = TRUE THEN
    IF CdaleDoorChest = 1 THEN
     Message "You opened the door!": Pause
     CdaleDoorChest = 2
     tile(24, 27).style = 4
     DrawScreen (TRUE)
    END IF
   END IF
   IF Location(26, 15) = TRUE THEN
    IF CdaleDoorGate = 1 THEN
     Message "You opened the door!": Pause
     CdaleDoorGate = 2
     tile(26, 14).style = 4
     DrawScreen (TRUE)
    END IF
   END IF
   IF Location(20, 16) = TRUE THEN ShopItem (3)
   IF Location(30, 27) = TRUE THEN ShopWhore (50)
   IF Surrounding(47) = TRUE THEN
    IF you.exist = 1 THEN GetPlayer (2)
   END IF
   IF Surrounding(45) = TRUE THEN RandTalk
   IF Surrounding(50) = TRUE THEN COLOR 9: Message "Yes I AM a fish, you!"
   IF Surrounding(44) = TRUE THEN
    i = ran(0, 2)
    IF i = 0 THEN Message "Hey baby - lookin' for a good time?"
    IF i = 1 THEN Message "Want your cock sucked?"
    IF i = 2 THEN Message "Ooh!  You lookin' fine, baby!"
   END IF
   IF Surrounding(49) = TRUE THEN
    IF TalkExpedition = FALSE THEN
     Message "Yep, last I hear the king went on an expedition lookin' for some": Pause
     Message "gold or somethin' near that   cave up there..."
     PlayWave "TUNE"
     TalkExpedition = TRUE
    ELSE
     Welcome
    END IF
   END IF
   IF Surrounding(46) = TRUE THEN Fishery
  CASE 4
   IF Location(36, 32) = TRUE THEN Search (10)
   IF Surrounding(49) = TRUE THEN
    COLOR 14
    Message "Please help me!!": Pause
    InitBattle (1)
    COLOR 15
    Message "JACK ran away!"
    PlayWave "TUNE"
    Pause
    Message "You receive a key.": Pause
    CdaleDoorGate = 1
    item(15).amount = item(15).amount + 1
    PlayWave "TUNE"
    Message "Thank you for rescuing me!": Pause
    Message "My name is Randall and I am King": Pause
    Message "Rowan's personal servant.": Pause
    Message "He went through the passage first": Pause
    Message "and then the rest of us were": Pause
    Message "ambushed by that creature.": Pause
    Message "I am the only survivor...": Pause
    Message "Well anyway come to the castle and": Pause
    Message "I will reward you.  Thanks again!": Pause
    tile(31, 40).style = 12
    CLS
    DrawScreen (TRUE)
   END IF
   IF Location(36, 42) = TRUE AND TNT = 1 THEN
    TNT = 2
    tile(36, 43).style = 12
    tile(37, 43).style = 12
    Message "YOU LAY THE BOMB!": Pause
    FOR i = 1 TO 300
     CIRCLE (160, 100), i, ran(193, 255)
    NEXT: CLS : DrawScreen (TRUE)
    Message "Whoa...that was close!": Pause: CLS : DrawScreen (TRUE)
   END IF
 END SELECT
END SUB

SUB TestStep

  SELECT CASE map.level
    CASE 1
     IF (you.x = 9 AND you.y >= 19 AND you.y <= 22) OR (you.x >= 23 AND you.x <= 26 AND you.y = 5) OR (you.x = 40 AND you.y >= 19 AND you.y <= 23) THEN
      map.level = 2
      map.before = 1
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(11, 7) = TRUE THEN
      Warp 17, 31
     ELSEIF Location(17, 31) = TRUE THEN
      Warp 11, 7
     END IF
    CASE 2
     IF Location(19, 19) = TRUE THEN
      map.level = 1
      map.before = 2
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(10, 38) = TRUE THEN
      map.level = 3
      map.before = 2
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(9, 16) = TRUE THEN
      map.level = 4
      map.before = 2
      LoadMap
      DrawScreen (TRUE)
     END IF
    CASE 3
     IF you.x >= 25 AND you.x <= 27 AND you.y = 45 THEN
      map.level = 2
      map.before = 3
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(20, 9) = TRUE THEN
      Warp 11, 9
     ELSEIF Location(11, 9) = TRUE THEN
      Warp 20, 9
     END IF
    CASE 4
     IF Location(41, 25) = TRUE THEN
      map.level = 2
      map.before = 4
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(37, 44) = TRUE THEN
      map.level = 5
      map.before = 4
      LoadMap
      DrawScreen (TRUE)
     END IF
    CASE 5
     IF Location(11, 43) = TRUE THEN
      map.level = 6
      map.before = 5
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(40, 45) = TRUE THEN
      map.level = 4
      map.before = 5
      LoadMap
      DrawScreen (TRUE)
     END IF
    CASE 6
     IF you.x > 40 THEN
      map.level = 5
      map.before = 6
      LoadMap
      DrawScreen (TRUE)
     END IF
    CASE 69
     IF Location(10, 6) = TRUE THEN
      map.level = 2
      map.before = 4
      LoadMap
      DrawScreen (TRUE)
     END IF
     IF Location(12, 36) = TRUE THEN
      CALL Warp(26, 20)
     ELSEIF Location(26, 20) = TRUE THEN
      CALL Warp(29, 39)
     ELSEIF Location(29, 39) = TRUE THEN
      CALL Warp(24, 33)
     ELSEIF Location(27, 25) = TRUE THEN
      CALL Warp(32, 22)
     ELSEIF Location(32, 22) = TRUE THEN
      CALL Warp(10, 6)
     END IF
  END SELECT

  IF map.occurance > 0 THEN IF ran(0, map.occurance - 1) = 0 THEN InitBattle (0)

END SUB

SUB ThankYou (tyline)

COLOR 14: LOCATE tyline: rp = ran(1, 5)

PRINT TAB(3); "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
PRINT TAB(3); "³ YOU MADE A PURCHASE !           ³"
PRINT TAB(3); "³                                  ³"
PRINT TAB(3); "³                                  ³"
PRINT TAB(3); "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

LOCATE tyline + 2, 5

SELECT CASE rp
 CASE 1: PRINT "Thank you!"
 CASE 2: PRINT "Please come again!"
 CASE 3: PRINT "Yeah thanks alot, scum."
 CASE 4: PRINT "Many thanks."
 CASE 5: PRINT "Heh heh."
END SELECT

PlayWave "THANK"
Pause

END SUB

SUB UseItem (ItemToUse, p)

COLOR 15

SELECT CASE ItemToUse
 CASE 11 '@Herb
  Message "You used an Herb!"
  player(p).hp = player(p).hp + ran(20, 30)
  IF player(p).hp > player(p).hpmax THEN player(p).hp = player(p).hpmax
  item(ItemToUse).amount = item(ItemToUse).amount - 1
  Pause
 CASE 12 '@Wyvern Wing
  Message "You feel air swooping by you!"
  '@ PlayWave "WING"
  item(ItemToUse).amount = item(ItemToUse).amount - 1
  Pause
  map.level = 1
  LoadMap
 CASE 13 '@Vial
  Message "You regain some energy!"
  player(p).mp = player(p).mp + ran(10, 15)
  IF player(p).mp > player(p).mpmax THEN player(p).mp = player(p).mpmax
  item(ItemToUse).amount = item(ItemToUse).amount - 1
  getch
 CASE 14 '@Fish, etch
  PlayWave "BEEP"
  Message "This is unusable here..."
  getch
END SELECT

END SUB

SUB Warp (warpx, warpy)
PlayWave "WARP"
you.x = warpx
you.y = warpy
DrawScreen (TRUE)
END SUB

SUB Welcome

 w$ = "Welcome to "
 w$ = w$ + map.area$
 i = 12
 DO
  i = i + 1
 LOOP WHILE RIGHT$(LEFT$(w$, i), 1) <> " "
 w$ = LEFT$(w$, i - 1)
 IF you.leader = 1 THEN w$ = w$ + ", warrior!"
 IF you.leader = 2 THEN w$ = w$ + ", sorceress!"
 IF you.leader = 3 THEN w$ = w$ + ", dragon!"
 COLOR 15: Message w$

END SUB

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

SUB WriteReg (Reg, Value)

OUT &H388, Reg    ' 388h = address/status port, 389h = data port
FOR i = 0 TO 5    ' This tells the SB what register we want to write to
a = INP(&H388)    ' After we write to the address port we must wait 3.3ms
NEXT

OUT &H389, Value  ' Send the value for the register to 389h
FOR i = 0 TO 34   ' Here we must also wait, this time 23ms
a = INP(&H388)
NEXT

END SUB

FUNCTION YesNo (YNText$)
Message YNText$
DO
'Control = Joy
'IF Control > 0 THEN
'IF Control = YB THEN YesNo = TRUE ELSE YesNo = FALSE
'EXIT DO
'END IF
kbhit$ = INKEY$
IF kbhit$ <> "" THEN
  IF kbhit$ = ESCAPEKEY$ THEN YesNo = FALSE ELSE YesNo = TRUE
END IF
LOOP
END FUNCTION

