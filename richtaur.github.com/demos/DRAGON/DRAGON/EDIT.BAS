DEFINT A-Z

DECLARE FUNCTION GetInput$ (gx, gy, length, gerase$)

DECLARE SUB Options ()
DECLARE SUB ClearScreen ()
DECLARE SUB Lines ()
DECLARE SUB Find ()
DECLARE SUB Change ()
DECLARE SUB PutThem (Ptype, px, py)
DECLARE SUB GetGraphics ()
DECLARE SUB DrawFile (drf$)
DECLARE SUB PutTools ()
DECLARE SUB ExitThis ()
DECLARE SUB Earase ()
DECLARE SUB ShowFiles ()
DECLARE SUB Undo ()
DECLARE SUB getch ()
DECLARE SUB Save ()
DECLARE SUB Load ()
DECLARE SUB cursor (crdo)
DECLARE SUB Init ()
DECLARE SUB Main ()
DECLARE SUB DrawScreen ()

ON ERROR GOTO ErrCatch
SCREEN 9

CONST TRUE% = 1
CONST FALSE% = 0
CONST SIZE% = 6
CONST HS% = 4

DIM SHARED tile(50, 50), x(50, 50), y(50, 50), text$(70)
DIM SHARED File$, crx, cry, tool, gx, gy
DIM SHARED UK$, DK$, LK$, RK$, EK$, SK$
DIM SHARED py, px, ocur, mon, scrx, scry

DIM SHARED grass(11), forest(11), pot(11), brick(11), floor(11), town(11)
DIM SHARED chest(11), pad(11), jaw(11), chair(11), wall(11), ocean(11)
DIM SHARED river(11), table(11), candle(11), door(11), widow(11)
DIM SHARED wall2(11), wall5(11), wall6(11), ped(11), ped2(11), ped3(11)
DIM SHARED hero2(11), hero3(11), king(11), merchant(11), folk(11), folk2(11)
DIM SHARED block(11), eagle(11), drape(11), blank(11), rock(11), rock2(11)
DIM SHARED mount(11), mount2(11), temple(11), fish(11)

Init
GetGraphics
DrawScreen
Main

ErrCatch:
BEEP
COLOR 14
LOCATE 1, 1
PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
PRINT "³       ERROR!        ³"
PRINT USING "³ Error Code:###      ³"; ERR
PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
getch
CLS
COLOR 15
File$ = "UNTITLED"
DrawScreen
ON ERROR GOTO ErrCatch
RESUME Resumer

Resumer:
Main

DATA 0'blank,1`grass,2`forest,3`pot,4`brick,5`floor
DATA 6`town,7`chest,8`block,9`pad,10`jaw,11`chair,12`rock2
DATA 13`temple

DATA 21@wall,22@wall2,23@ocean,24@river,25@table,26@candle
DATA 27@door,28@wall5,29@eagle,30@wall6,31@drape,32@widow
DATA 33@mount,34@mount2,35@rock

DATA 41*king,42*merchant,43*folk,44*ped,45*ped2
DATA 46*ped3,47*hero2,48*hero3,49*folk2,50*fish

SUB Change
LOCATE 1, 40: INPUT "ToChange:", ToChange
LOCATE 2, 40: INPUT "ChangeTo:", ChangeTo
FOR a = 1 TO 50
FOR d = 1 TO 50
IF tile(a, d) = ToChange THEN tile(a, d) = ChangeTo
NEXT: NEXT: DrawScreen
END SUB

SUB ClearScreen
FOR a = 1 TO 50
FOR d = 1 TO 50
tile(a, d) = tool
NEXT: NEXT
File$ = "Untitled"
DrawScreen
END SUB

SUB cursor (crdo)
SELECT CASE crdo
CASE FALSE: CALL PutThem(tile(cry, crx), crx * SIZE, cry * SIZE)
CASE TRUE: CIRCLE ((crx * SIZE) + 2, (cry * SIZE) + 2), 2, 0
END SELECT
END SUB

SUB DrawFile (drf$)
gx = INT(RND * 630) + 1
gy = INT(RND * 340) + 1
OPEN drf$ FOR INPUT AS #1
FOR a = 1 TO 5
FOR d = 1 TO 5
INPUT #1, clr
PSET (d + gx - 1, a + gy - 1), clr
NEXT: NEXT: CLOSE
END SUB

SUB DrawScreen
File$ = UCASE$(File$)
Undo
LOCATE 23, 1: PRINT "FILE: "; File$
LOCATE 11, 40: PRINT USING "PX=##"; px
LOCATE 12, 40: PRINT USING "PY=##"; py
LOCATE 13, 40: PRINT USING "OCUR=###"; ocur
LOCATE 14, 40: PRINT USING "MONS=  #"; mon
LOCATE 15, 40: PRINT USING "SCRX=#"; scrx
LOCATE 16, 40: PRINT USING "SCRY=#"; scry
PutTools
FOR a = 1 TO 50
FOR d = 1 TO 50
CALL PutThem(tile(a, d), y(a, d), x(a, d))
NEXT: NEXT
LINE (y(1, 1) - 2, x(1, 1) - 2)-(y(50, 50) + SIZE, x(50, 50) + SIZE), 15, B
END SUB

SUB Earase
COLOR 9
Undo
LOCATE 23, 1: PRINT "KILL FILENAME:"
File$ = GetInput(23, 15, 8, "_")
IF File$ = "ESCAPE" THEN DrawScreen: EXIT SUB
File$ = File$ + ".MAP"
Undo
KILL File$
File$ = "Untitled"
DrawScreen
END SUB

SUB ExitThis
OPEN "EDIT.MAP" FOR OUTPUT AS #1
PRINT #1, px
PRINT #1, py
PRINT #1, ocur
PRINT #1, mon
PRINT #1, scrx
PRINT #1, scry
FOR a = 1 TO 50
FOR d = 1 TO 50
PRINT #1, tile(a, d)
NEXT: NEXT: CLOSE
ERASE tile, x, y, text$
SCREEN 0
SYSTEM
END SUB

SUB Find
LOCATE 1, 40: INPUT "FindThis:", FindThis
Findings = 0
FOR a = 1 TO 50
FOR d = 1 TO 50
IF tile(a, d) = FindThis THEN Findings = Findings + 1
NEXT: NEXT
LOCATE 1, 40
IF Findings > 0 THEN
PRINT USING "Found:    ####"; Findings
ELSE
BEEP
PRINT "Didn't find any!"
END IF
END SUB

SUB getch
DO: LOOP WHILE INKEY$ = ""
END SUB

SUB GetGraphics

GET (gx, gy)-(gx + 4, gy + 4), blank

DrawFile "grass.BIT"
GET (gx, gy)-(gx + 4, gy + 4), grass

DrawFile "forest.BIT"
GET (gx, gy)-(gx + 4, gy + 4), forest

DrawFile "floor.BIT"
GET (gx, gy)-(gx + 4, gy + 4), floor

DrawFile "pot.BIT"
GET (gx, gy)-(gx + 4, gy + 4), pot

DrawFile "brick.BIT"
GET (gx, gy)-(gx + 4, gy + 4), brick

DrawFile "town.BIT"
GET (gx, gy)-(gx + 4, gy + 4), town

DrawFile "chest.BIT"
GET (gx, gy)-(gx + 4, gy + 4), chest

DrawFile "pad.BIT"
GET (gx, gy)-(gx + 4, gy + 4), pad

DrawFile "jaw.BIT"
GET (gx, gy)-(gx + 4, gy + 4), jaw

DrawFile "chair.BIT"
GET (gx, gy)-(gx + 4, gy + 4), chair

DrawFile "wall.BIT"
GET (gx, gy)-(gx + 4, gy + 4), wall

DrawFile "ocean.BIT"
GET (gx, gy)-(gx + 4, gy + 4), ocean

DrawFile "river.BIT"
GET (gx, gy)-(gx + 4, gy + 4), river

DrawFile "table.BIT"
GET (gx, gy)-(gx + 4, gy + 4), table

DrawFile "candle.BIT"
GET (gx, gy)-(gx + 4, gy + 4), candle

DrawFile "door.BIT"
GET (gx, gy)-(gx + 4, gy + 4), door

DrawFile "widow.BIT"
GET (gx, gy)-(gx + 4, gy + 4), widow

DrawFile "wall2.BIT"
GET (gx, gy)-(gx + 4, gy + 4), wall2

DrawFile "wall5.BIT"
GET (gx, gy)-(gx + 4, gy + 4), wall5

DrawFile "wall6.BIT"
GET (gx, gy)-(gx + 4, gy + 4), wall6

DrawFile "hero2.BIT"
GET (gx, gy)-(gx + 4, gy + 4), hero2

DrawFile "hero3.BIT"
GET (gx, gy)-(gx + 4, gy + 4), hero3

DrawFile "ped.BIT"
GET (gx, gy)-(gx + 4, gy + 4), ped

DrawFile "ped2.BIT"
GET (gx, gy)-(gx + 4, gy + 4), ped2

DrawFile "ped3.BIT"
GET (gx, gy)-(gx + 4, gy + 4), ped3

DrawFile "wall6.BIT"
GET (gx, gy)-(gx + 4, gy + 4), wall6

DrawFile "block.BIT"
GET (gx, gy)-(gx + 4, gy + 4), block

DrawFile "eagle.BIT"
GET (gx, gy)-(gx + 4, gy + 4), eagle

DrawFile "drape.BIT"
GET (gx, gy)-(gx + 4, gy + 4), drape

DrawFile "merchant.BIT"
GET (gx, gy)-(gx + 4, gy + 4), merchant

DrawFile "folk.BIT"
GET (gx, gy)-(gx + 4, gy + 4), folk

DrawFile "king.BIT"
GET (gx, gy)-(gx + 4, gy + 4), king

DrawFile "mount.BIT"
GET (gx, gy)-(gx + 4, gy + 4), mount

DrawFile "mount2.BIT"
GET (gx, gy)-(gx + 4, gy + 4), mount2

DrawFile "rock.BIT"
GET (gx, gy)-(gx + 4, gy + 4), rock

DrawFile "rock2.BIT"
GET (gx, gy)-(gx + 4, gy + 4), rock2

DrawFile "folk2.BIT"
GET (gx, gy)-(gx + 4, gy + 4), folk2

DrawFile "temple.BIT"
GET (gx, gy)-(gx + 4, gy + 4), temple

DrawFile "fish.BIT"
GET (gx, gy)-(gx + 4, gy + 4), fish

CLS

END SUB

FUNCTION GetInput$ (gx, gy, length, gerase$)

 LOCATE gx, gy: PRINT STRING$(length, gerase$)

 DO
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
   r = ASC(kbhit$)
   IF r = 27 THEN GetInput$ = "ESCAPE": EXIT FUNCTION
   IF r = 13 THEN EXIT DO
   IF r = 8 THEN
    IF LEN(a$) > 0 THEN a$ = LEFT$(a$, LEN(a$) - 1): LOCATE gx, gy + LEN(a$): PRINT gerase$
   END IF
   IF r >= 65 AND r <= 90 OR r >= 97 AND r <= 122 THEN
    IF LEN(a$) < 10 THEN a$ = a$ + UCASE$(kbhit$)
   END IF
   LOCATE gx, gy: PRINT a$
  END IF
 LOOP
 
 GetInput$ = a$

END FUNCTION

SUB Init

 ON ERROR GOTO ErrCatch

 CHDIR "C:\DRAGON"

 File$ = "Untitled"

 tool = 0
 crx = 25
 cry = 25
 gx = 1
 UK$ = CHR$(0) + "P"
 DK$ = CHR$(0) + "H"
 LK$ = CHR$(0) + "K"
 RK$ = CHR$(0) + "M"
 EK$ = CHR$(13)
 SK$ = CHR$(32)

 FOR a = 1 TO 50
 FOR d = 1 TO 50
 x(a, d) = a * SIZE
 y(a, d) = d * SIZE
 NEXT: NEXT

 FOR i = 0 TO 13
  READ text$(i)
 NEXT
 FOR i = 21 TO 35
  READ text$(i)
 NEXT
 FOR i = 41 TO 50
  READ text$(i)
 NEXT

 OPEN "EDIT.MAP" FOR INPUT AS #1
 INPUT #1, px
 INPUT #1, py
 INPUT #1, ocur
 INPUT #1, mon
 INPUT #1, scrx
 INPUT #1, scry
 FOR a = 1 TO 50
 FOR d = 1 TO 50
 INPUT #1, tile(a, d)
 NEXT: NEXT: CLOSE

END SUB

SUB Lines
LOCATE 1, 40: INPUT "TileType:", TileType
LOCATE 2, 40: INPUT "Direction:", Dir$
SELECT CASE UCASE$(Dir$)
 CASE "U"
  FOR d = cry TO 1 STEP -1
   tile(d, crx) = TileType
  NEXT
 CASE "D"
  FOR d = cry TO 50
   tile(d, crx) = TileType
  NEXT
 CASE "R"
  FOR a = crx TO 50
   tile(cry, a) = TileType
  NEXT
 CASE "L"
  FOR a = crx TO 1 STEP -1
   tile(cry, a) = TileType
  NEXT
END SELECT: DrawScreen
END SUB

SUB Load

 ON ERROR GOTO ErrCatch

 COLOR 9
 Undo

 LOCATE 23, 1
 PRINT "LOAD FILENAME:"
 File$ = GetInput(23, 15, 8, "_")
 IF File$ = "ESCAPE" THEN File$ = "UNTITLED": DrawScreen: EXIT SUB

 File$ = File$ + ".MAP": Undo

 OPEN File$ FOR INPUT AS #1
  INPUT #1, px
  INPUT #1, py
  INPUT #1, ocur
  INPUT #1, mon
  INPUT #1, scrx
  INPUT #1, scry
  FOR a = 1 TO 50
   FOR d = 1 TO 50
    INPUT #1, tile(a, d)
 NEXT: NEXT: CLOSE

 DrawScreen

END SUB

SUB Main

 ON ERROR GOTO ErrCatch

 cursor (FALSE): cursor (TRUE)

 LOCATE 3, 40: PRINT "X:"; crx
 LOCATE 4, 40: PRINT "Y:"; cry

 DO
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
   cursor (FALSE)
   SELECT CASE UCASE$(kbhit$)
    CASE CHR$(27): ExitThis
    CASE UK$: IF cry < 50 THEN cry = cry + 1
    CASE DK$: IF cry > 1 THEN cry = cry - 1
    CASE LK$: IF crx > 1 THEN crx = crx - 1
    CASE RK$: IF crx < 50 THEN crx = crx + 1
    CASE SK$: tile(cry, crx) = tool: cursor (FALSE): cursor (TRUE)
    CASE EK$: tool = tile(cry, crx): cursor (FALSE): cursor (TRUE): PutTools
    CASE "8": IF tool > 0 THEN tool = tool - 1: PutTools
    CASE "2": IF tool < 100 THEN tool = tool + 1: PutTools
    CASE "F": ShowFiles
    CASE "0": tool = 0: PutTools
    CASE "`": Options
    CASE "P":
     px = crx: py = cry
     COLOR 15
     LOCATE 11, 40: PRINT USING "PX=##"; px
     LOCATE 12, 40: PRINT USING "PY=##"; py
    CASE "M":
     COLOR 15
     LOCATE 13, 40: INPUT "OCUR=", ocur
     LOCATE 14, 40: INPUT "MONS=", mon
     LOCATE 13, 40: PRINT USING "OCUR=###"; ocur
     LOCATE 14, 40: PRINT USING "MONS=  #"; mon
    CASE "S":
     COLOR 15
     LOCATE 15, 40: INPUT "SCRX=", scrx
     LOCATE 16, 40: INPUT "SCRY=", scry
     LOCATE 15, 40: PRINT USING "SCRX=#"; scrx
     LOCATE 16, 40: PRINT USING "SCRY=#"; scry
    END SELECT
   cursor (TRUE)
   LOCATE 3, 40: PRINT "X:"; crx
   LOCATE 4, 40: PRINT "Y:"; cry
  END IF

 LOOP

END SUB

SUB Options
COLOR 9
LOCATE 1, 40: PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
LOCATE 2, 40: PRINT "³       OPTIONS       ³"
LOCATE 3, 40: PRINT "³ Find                ³"
LOCATE 4, 40: PRINT "³ Change              ³"
LOCATE 5, 40: PRINT "³ Save                ³"
LOCATE 6, 40: PRINT "³ Load                ³"
LOCATE 7, 40: PRINT "³ Erase               ³"
LOCATE 8, 40: PRINT "³ Clean Canvas        ³"
LOCATE 9, 40: PRINT "³ Draw Line           ³"
LOCATE 10, 40: PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
cy = 3
COLOR 14: LOCATE cy, 41: PRINT ""
DO
kbhit$ = INKEY$
IF kbhit$ <> "" THEN
COLOR 0: LOCATE cy, 41: PRINT ""
SELECT CASE kbhit$
CASE DK$: IF cy > 3 THEN cy = cy - 1 ELSE cy = 9
CASE UK$: IF cy < 9 THEN cy = cy + 1 ELSE cy = 3
CASE EK$:
COLOR 9
SELECT CASE cy
CASE 3: Find
CASE 4: Change
CASE 5: Save
CASE 6: Load
CASE 7: Earase
CASE 8: ClearScreen
CASE 9: Lines
END SELECT
'getch
EXIT DO
CASE CHR$(27): EXIT DO
END SELECT
COLOR 14: LOCATE cy, 41: PRINT ""
END IF
LOOP
FOR i = 1 TO 10
LOCATE i, 40: PRINT "                       "
NEXT
COLOR 15
END SUB

SUB PutThem (Ptype, px, py)

 SELECT CASE Ptype
  CASE 0: PUT (px, py), blank, PSET
  CASE 1: PUT (px, py), grass, PSET
  CASE 2: PUT (px, py), forest, PSET
  CASE 3: PUT (px, py), pot, PSET
  CASE 4: PUT (px, py), brick, PSET
  CASE 5: PUT (px, py), floor, PSET
  CASE 6: PUT (px, py), town, PSET
  CASE 7: PUT (px, py), chest, PSET
  CASE 8: PUT (px, py), block, PSET
  CASE 9: PUT (px, py), pad, PSET
  CASE 10: PUT (px, py), jaw, PSET
  CASE 11: PUT (px, py), chair, PSET
  CASE 12: PUT (px, py), rock2, PSET
  CASE 13: PUT (px, py), temple, PSET
  CASE 21: PUT (px, py), wall, PSET
  CASE 22: PUT (px, py), wall2, PSET
  CASE 23: PUT (px, py), ocean, PSET
  CASE 24: PUT (px, py), river, PSET
  CASE 25: PUT (px, py), table, PSET
  CASE 26: PUT (px, py), candle, PSET
  CASE 27: PUT (px, py), door, PSET
  CASE 28: PUT (px, py), wall5, PSET
  CASE 29: PUT (px, py), eagle, PSET
  CASE 30: PUT (px, py), wall6, PSET
  CASE 31: PUT (px, py), drape, PSET
  CASE 32: PUT (px, py), widow, PSET
  CASE 33: PUT (px, py), mount, PSET
  CASE 34: PUT (px, py), mount2, PSET
  CASE 35: PUT (px, py), rock, PSET
  CASE 41: PUT (px, py), king, PSET
  CASE 42: PUT (px, py), merchant, PSET
  CASE 43: PUT (px, py), folk, PSET
  CASE 44: PUT (px, py), ped, PSET
  CASE 45: PUT (px, py), ped2, PSET
  CASE 46: PUT (px, py), ped3, PSET
  CASE 47: PUT (px, py), hero2, PSET
  CASE 48: PUT (px, py), hero3, PSET
  CASE 49: PUT (px, py), folk2, PSET
  CASE 50: PUT (px, py), fish, PSET
  CASE ELSE: PUT (px, py), blank, PSET
 END SELECT

END SUB

SUB PutTools

 COLOR 9: ass = 2
 FOR i = tool TO tool + 20
  IF i > 70 THEN EXIT FOR
  LOCATE ass, 65: PRINT USING "\          \"; text$(i)
  ass = ass + 1
  COLOR 15
 NEXT
 CALL PutThem(tool, 500, 1)

END SUB

SUB Save

 COLOR 9: Undo

 LOCATE 23, 1
 PRINT "SAVE FILENAME:"
 File$ = GetInput(23, 15, 8, "_")
 IF File$ = "ESCAPE" THEN File$ = "UNTITLED": DrawScreen: EXIT SUB

 File$ = File$ + ".MAP": Undo

 OPEN File$ FOR OUTPUT AS #1
 PRINT #1, px
 PRINT #1, py
 PRINT #1, ocur
 PRINT #1, mon
 PRINT #1, scrx
 PRINT #1, scry
 FOR a = 1 TO 50
 FOR d = 1 TO 50
 PRINT #1, tile(a, d)
 NEXT: NEXT: CLOSE

 DrawScreen

END SUB

SUB ShowFiles

 CLS : INPUT "Directory:", Dir$

 IF Dir$ <> "" THEN CHDIR Dir$

 INPUT "Files:", fl$

 IF fl$ = "" THEN fl$ = "*.MAP"

 FILES fl$: getch

 CLS : DrawScreen

END SUB

SUB Undo
 LOCATE 23, 1: PRINT "                                        "
END SUB

