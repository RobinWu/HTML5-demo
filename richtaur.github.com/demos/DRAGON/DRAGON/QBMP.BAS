'ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿
'³                                Q B M P                                   ³
'³                                                                          ³
'³                Revised addition by its orignal creator                   ³
'³                          Matt Hackett  1996                              ³
'³                                                                          ³
'ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ

DEFINT A-Z

DECLARE FUNCTION GetInput$ (gx, gy, length, gerase$)

DECLARE SUB Options ()
DECLARE SUB Change ()
DECLARE SUB ClearScreen ()
DECLARE SUB BackSave ()
DECLARE SUB ExitThis ()
DECLARE SUB Earase ()
DECLARE SUB ShowFiles ()
DECLARE SUB Help ()
DECLARE SUB Undo ()
DECLARE SUB getch ()
DECLARE SUB Save ()
DECLARE SUB Load ()
DECLARE SUB PutPaint ()
DECLARE SUB cursor (crdo)
DECLARE SUB Init ()
DECLARE SUB Main ()
DECLARE SUB DrawScreen ()

ON ERROR GOTO ErrCatch
SCREEN 13

CONST TRUE% = 1
CONST FALSE% = 0
CONST SIZE% = 10
CONST IMG% = 16

DIM SHARED x(IMG, IMG), y(IMG, IMG), clr(IMG, IMG)
DIM SHARED File$, crx, cry, drop
DIM SHARED UK$, DK$, LK$, RK$, EK$, SK$

Init
Main

ErrCatch:
BEEP
COLOR 15: LOCATE 1, 1
ass = ERR
SELECT CASE ass
CASE 53:
 PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT "³File not found...    ³"
 PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
CASE ELSE:
 PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT "³        ERROR        ³"
 PRINT USING "³Error Code:###       ³"; ass
 PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
END SELECT
getch
CLS
RESUME Resumer

Resumer:
Main

SUB BackSave

 COLOR 9: Undo

 LOCATE 23, 1: PRINT "BSAVE:"
 File$ = GetInput(23, 7, 20, "_")
 IF File$ = "ESCAPE" THEN File$ = "UNTITLED": DrawScreen: EXIT SUB

 File$ = File$ + ".IMG": Undo

 OPEN File$ FOR OUTPUT AS #1
  FOR a = 1 TO IMG
   FOR d = IMG TO 1 STEP -1
    PRINT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 OPEN File$ FOR INPUT AS #1
  FOR a = 1 TO IMG
   FOR d = 1 TO IMG
    INPUT #1, clr(a, d)
 NEXT: NEXT: CLOSE

END SUB

SUB Change
LOCATE 1, 1: INPUT "ToChange:", ToChange
LOCATE 1, 1: INPUT "ChangeTo:", ChangeTo
FOR a = 1 TO IMG
FOR d = 1 TO IMG
IF clr(a, d) = ToChange THEN clr(a, d) = ChangeTo
NEXT: NEXT
END SUB

SUB ClearScreen
BEEP
COLOR 15: LOCATE 1, 1: PRINT "CLEAR SCREEN?"
DO
kbhit$ = INKEY$
IF kbhit$ <> "" THEN
IF kbhit$ = "y" THEN
FOR a = 1 TO IMG
FOR d = 1 TO IMG
clr(a, d) = drop
NEXT: NEXT
File$ = "Untitled"
END IF
EXIT DO
END IF
LOOP
END SUB

SUB cursor (crdo)

 SELECT CASE crdo
  CASE FALSE:
   LINE ((crx * SIZE) + 1, (cry * SIZE) + 1)-((crx * SIZE) + 8, (cry * SIZE) + 8), clr(cry, crx), BF
   IF clr(cry, crx) = 0 THEN PSET ((crx * SIZE) + 5, (cry * SIZE) + 5), 19
   IF clr(cry, crx) = 999 THEN PSET ((crx * SIZE) + 5, (cry * SIZE) + 5), 0
   PSET (SIZE, (cry * SIZE) + 5), 15
   PSET ((crx * SIZE) + 5, SIZE), 15
  CASE TRUE:
   CIRCLE (crx * SIZE + 5, cry * SIZE + 5), 3, drop
   PSET (SIZE, (cry * SIZE) + 5), 0
   PSET ((crx * SIZE) + 5, SIZE), 0
 END SELECT

END SUB

SUB DrawScreen

 COLOR 9: LOCATE 1, 1: PRINT "QBMP Editor v2.0 - H for Help"

 File$ = UCASE$(File$): Undo

 LOCATE 23, 1: PRINT "FILE: "; File$

 LOCATE 5, 34: PRINT "ÚÄÄÄÄ¿"
 LOCATE 6, 33: PRINT "³    ³"
 FOR i = 7 TO 16
  LOCATE i, 34: PRINT "³    ³"
 NEXT: LOCATE 17, 34: PRINT "ÀÄÄÄÄÙ"

 PutPaint

 FOR a = 1 TO IMG
  FOR d = 1 TO IMG
   LINE (y(a, d) + 1, x(a, d) + 1)-(y(a, d) + 9, x(a, d) + 9), clr(a, d), BF
   IF clr(a, d) = 0 THEN PSET (y(a, d) + 5, x(a, d) + 5), 19
   IF clr(a, d) = 999 THEN PSET (y(a, d) + 5, x(a, d) + 5), 0
   PSET (d + 300, a + SIZE), clr(a, d)
   PSET (d + 275, a + SIZE), clr(a, d)
 NEXT: NEXT

 LINE (y(1, 1), x(1, 1))-(y(IMG, IMG) + SIZE, x(IMG, IMG) + SIZE), 15, B
 LINE (300, SIZE)-(317, 27), 15, B

END SUB

SUB Earase

 COLOR 9: Undo

 LOCATE 23, 1: PRINT "KILL:"
 File$ = GetInput(23, 6, 8, "_")
 IF File$ = "ESCAPE" THEN File$ = "UNTITLED": DrawScreen: EXIT SUB

 File$ = File$ + ".IMG": Undo

 KILL File$

 File$ = "Untitled"

END SUB

SUB ExitThis

 OPEN "QBMP.QBM" FOR OUTPUT AS #1
  FOR a = 1 TO IMG
   FOR d = 1 TO IMG
    PRINT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 COLOR drop
 ERASE x, y, clr
 SCREEN 9
 SCREEN 0
 SYSTEM

END SUB

SUB getch
DO: LOOP WHILE INKEY$ = ""
END SUB

FUNCTION GetInput$ (gx, gy, length, gerase$)

 LOCATE gx, gy: PRINT STRING$(length, gerase$)

 DO
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
   SELECT CASE ASC(kbhit$)
    CASE 27: GetInput$ = "ESCAPE": EXIT FUNCTION
    CASE 13: EXIT DO
    CASE 8:
     IF LEN(a$) > 0 THEN a$ = LEFT$(a$, LEN(a$) - 1): LOCATE gx, gy + LEN(a$): PRINT gerase$
    CASE 48 TO 122:
     IF LEN(a$) < length THEN a$ = a$ + UCASE$(kbhit$)
   END SELECT
   LOCATE gx, gy: PRINT a$
  END IF
 LOOP

 GetInput$ = a$

END FUNCTION

SUB Help

 CLS : IF drop > 0 THEN COLOR drop:  ELSE COLOR 15

 PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
 PRINT "³                  QBMP                ³"
 PRINT "³               Editor v2.0            ³"
 PRINT "³                                      ³"
 PRINT "³              Matt Hackett            ³"
 PRINT "³                May 1996              ³"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "³QBMP was created by request of Jim    ³"
 PRINT "³MacDonald for the purpose of creating ³"
 PRINT "³a drawing program specifically for    ³"
 PRINT "³QBASIC.                               ³"
 PRINT "³                                      ³"
 PRINT "³It's format is quite simple - it uses ³"
 PRINT "³input and print to store data in the  ³"
 PRINT "³given type of file and then it can be ³"
 PRINT "³used in other QBASIC programs for     ³"
 PRINT "³use with get and put graphics         ³"
 PRINT "³functions.                            ³"
 PRINT "³                                      ³"
 PRINT "³                                      ³"
 PRINT "³ -Matt Hackett 1996                   ³"
 PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"

 getch

 CLS : DrawScreen

END SUB

SUB Init

 ON ERROR GOTO ErrCatch

 CHDIR "C:\DRAGON"

 File$ = "Untitled"

 drop = 1
 crx = 1
 cry = 1
 UK$ = CHR$(0) + "H"
 DK$ = CHR$(0) + "P"
 LK$ = CHR$(0) + "K"
 RK$ = CHR$(0) + "M"
 SK$ = CHR$(32)
 EK$ = CHR$(13)

 FOR i = 1 TO 63
  PALETTE i + 192, i
 NEXT

 FOR a = 1 TO IMG
  FOR d = 1 TO IMG
   x(a, d) = a * SIZE
   y(a, d) = d * SIZE
 NEXT: NEXT

 OPEN "QBMP.QBM" FOR INPUT AS #1
  FOR a = 1 TO IMG
   FOR d = 1 TO IMG
    INPUT #1, clr(a, d)
 NEXT: NEXT: CLOSE

END SUB

SUB Load

 COLOR 9: Undo

 LOCATE 23, 1: PRINT "LOAD:"
 File$ = GetInput$(23, 6, 20, "_")
 IF File$ = "ESCAPE" THEN File$ = "UNTITLED": DrawScreen: EXIT SUB

 File$ = File$ + ".IMG": Undo

 OPEN File$ FOR INPUT AS #1
  FOR a = 1 TO IMG
   FOR d = 1 TO IMG
    INPUT #1, clr(a, d)
 NEXT: NEXT: CLOSE

END SUB

SUB Main

 crx = 1
 cry = 1

 cursor (FALSE): cursor (TRUE)

 DrawScreen

 DO
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
   cursor (FALSE)
   SELECT CASE UCASE$(kbhit$)
    CASE CHR$(27): ExitThis
    CASE DK$: IF cry < IMG THEN cry = cry + 1
    CASE UK$: IF cry > 1 THEN cry = cry - 1
    CASE LK$: IF crx > 1 THEN crx = crx - 1
    CASE RK$: IF crx < IMG THEN crx = crx + 1
    CASE SK$: clr(cry, crx) = drop: DrawScreen
    CASE "9": clr(cry, crx) = 999: DrawScreen
    CASE EK$: drop = POINT(crx + 275, cry + SIZE): PutPaint
    CASE "8": IF drop > 0 THEN drop = drop - 1: PutPaint
    CASE "2": IF drop < 255 THEN drop = drop + 1: PutPaint
    CASE "0": drop = 0: PutPaint
    CASE "F": ShowFiles
    CASE "H": Help
    CASE "`": Options
   END SELECT
   cursor (TRUE)
  END IF
 LOOP

END SUB

SUB Options
COLOR 9: LOCATE 1, 1
PRINT "ÚÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ¿"
PRINT "³       OPTIONS       ³"
PRINT "³ Change              ³"
PRINT "³ Save                ³"
PRINT "³ Load                ³"
PRINT "³ BackSave            ³"
PRINT "³ Erase               ³"
PRINT "³ Clean Canvas        ³"
PRINT "ÀÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÙ"
cry = 3
COLOR 14: LOCATE cry, 2: PRINT ""
DO
kbhit$ = INKEY$
IF kbhit$ <> "" THEN
COLOR 0: LOCATE cry, 2: PRINT ""
SELECT CASE kbhit$
CASE UK$: IF cry > 3 THEN cry = cry - 1 ELSE cry = 8
CASE DK$: IF cry < 8 THEN cry = cry + 1 ELSE cry = 3
CASE EK$:
COLOR 9
SELECT CASE cry
CASE 3: Change
CASE 4: Save
CASE 5: Load
CASE 6: BackSave
CASE 7: Earase
CASE 8: ClearScreen
END SELECT
EXIT DO
CASE CHR$(27): EXIT DO
END SELECT
COLOR 14: LOCATE cry, 2: PRINT ""
END IF
LOOP
CLS
DrawScreen
END SUB

SUB PutPaint

 ass = 6

 FOR i = drop TO drop + 10
  IF i > 255 THEN EXIT FOR
  LOCATE ass, 35: COLOR i: PRINT USING "###"; i
  ass = ass + 1
 NEXT

END SUB

SUB Save

 COLOR 9: Undo

 LOCATE 23, 1: PRINT "SAVE:"
 File$ = GetInput(23, 6, 20, "_")
 IF File$ = "ESCAPE" THEN File$ = "UNTITLED": DrawScreen: EXIT SUB

 File$ = File$ + ".IMG": Undo

 OPEN File$ FOR OUTPUT AS #1
  FOR a = 1 TO IMG
   FOR d = 1 TO IMG
    PRINT #1, clr(a, d)
 NEXT: NEXT: CLOSE

END SUB

SUB ShowFiles

 CLS : INPUT "Directory:", Dir$

 IF Dir$ <> "" THEN CHDIR Dir$

 INPUT "Files:", fl$

 IF fl$ = "" THEN fl$ = "*.IMG"

 FILES fl$: getch

 CLS : DrawScreen

END SUB

SUB Undo
LOCATE 23, 1: PRINT "                                        "
END SUB

