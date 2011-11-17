DEFINT A-Z

DECLARE FUNCTION GetInput$ (gx, gy, length, gerase$)

DECLARE SUB CleanUp ()
DECLARE SUB Change ()
DECLARE SUB ClearScreen ()
DECLARE SUB DrawHalf ()
DECLARE SUB BackSave ()
DECLARE SUB ExitThis ()
DECLARE SUB Earase ()
DECLARE SUB ShowFiles ()
DECLARE SUB Undo ()
DECLARE SUB getch ()
DECLARE SUB SAVE ()
DECLARE SUB LOAD ()
DECLARE SUB PutPaint ()
DECLARE SUB cursor (crdo)
DECLARE SUB Init ()
DECLARE SUB Main ()
DECLARE SUB DrawScreen ()

SCREEN 13

CONST TRUE% = 1
CONST FALSE% = 0
CONST SIZE% = 3
CONST IMGSIZE% = 64

DIM SHARED x(IMGSIZE, IMGSIZE), y(IMGSIZE, IMGSIZE), clr(IMGSIZE, IMGSIZE)
DIM SHARED File$, crx, cry, drop
DIM SHARED UK$, DK$, LK$, RK$, EK$, SK$

Init
DrawScreen
Main

SUB BackSave

 COLOR 9

 Undo

 LOCATE 23, 1: PRINT "BSAVE:"
 File$ = GetInput$(23, 7, 8, "_")

 IF File$ = "ESCAPE" THEN
  File$ = "UNTITLED"
  DrawScreen
  EXIT SUB
 END IF

 File$ = File$ + ".HUG"

 Undo

 OPEN File$ FOR OUTPUT AS #1
  FOR a = 1 TO IMGSIZE
   FOR d = IMGSIZE TO 1 STEP -1
    PRINT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 OPEN File$ FOR INPUT AS #1
  FOR a = 1 TO IMGSIZE
   FOR d = 1 TO IMGSIZE
    INPUT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 DrawScreen

END SUB

SUB Change
LOCATE 1, 1: INPUT "ToChange:", ToChange
LOCATE 1, 1: INPUT "ChangeTo:", ChangeTo
FOR a = 1 TO IMGSIZE
 FOR d = 1 TO IMGSIZE
  IF clr(a, d) = ToChange THEN clr(a, d) = ChangeTo
NEXT: NEXT: CLS : DrawScreen
END SUB

SUB CleanUp
SCREEN 9
SCREEN 0
ERASE x, y, clr
SYSTEM
END SUB

SUB ClearScreen
BEEP
COLOR 15: LOCATE 1, 1: PRINT "CLEAR SCREEN?"
DO
 kbhit$ = INKEY$
 IF kbhit$ <> "" THEN
  IF UCASE$(kbhit$) = "Y" THEN
   FOR a = 1 TO IMGSIZE
    FOR d = 1 TO IMGSIZE
     clr(a, d) = drop
   NEXT: NEXT
   File$ = "UNTITLED"
  END IF
  CLS
  DrawScreen
  EXIT DO
 END IF
LOOP
END SUB

SUB cursor (crdo)

 SELECT CASE crdo
  CASE FALSE:
   PSET ((crx * SIZE) + 2, (cry * SIZE) + 2), clr(cry, crx)
   IF clr(cry, crx) = 0 THEN PSET ((crx * SIZE) + 2, (cry * SIZE) + 2), 19
   PSET (SIZE, (cry * SIZE) + 2), 15
   PSET ((crx * SIZE) + 2, SIZE), 15
  CASE TRUE:
   PSET (crx * SIZE + 2, cry * SIZE + 2), drop
   PSET (SIZE, (cry * SIZE) + 2), 0
   PSET ((crx * SIZE) + 2, SIZE), 0
 END SELECT

END SUB

SUB DrawHalf

 clr(cry, crx) = drop
 LINE (crx * SIZE + 2, cry * SIZE + 2)-(crx * SIZE + 3, cry * SIZE + 3), drop, BF

 FOR a = 1 TO IMGSIZE
  FOR d = 1 TO IMGSIZE
   PSET (d + 200, a + 10), clr(a, d)
 NEXT: NEXT

END SUB

SUB DrawScreen

 COLOR 9

 LOCATE 5, 34: PRINT "ÚÄÄÄÄ¿"
 LOCATE 6, 33: PRINT " ³    ³"
 FOR i = 7 TO 16
  LOCATE i, 34: PRINT "³    ³"
 NEXT: LOCATE 17, 34: PRINT "ÀÄÄÄÄÙ"

 PutPaint

 FOR a = 1 TO IMGSIZE
  FOR d = 1 TO IMGSIZE
   LINE (y(a, d) + 2, x(a, d) + 2)-(y(a, d) + 3, x(a, d) + 3), clr(a, d), BF
   IF clr(a, d) = 0 THEN PSET (y(a, d) + 2, x(a, d) + 2), 19
   PSET (d + 200, a + 10), clr(a, d)
 NEXT: NEXT

 LINE (y(1, 1), x(1, 1))-(y(IMGSIZE, IMGSIZE) + SIZE + 2, x(IMGSIZE, IMGSIZE) + SIZE + 2), 15, B
 LINE (200, 10)-(265, 75), 15, B

END SUB

SUB Earase

 COLOR 9

 Undo

 LOCATE 23, 1: PRINT "KILL:"
 File$ = GetInput$(23, 6, 8, "_")

 IF File$ = "ESCAPE" THEN
  File$ = "UNTITLED"
  DrawScreen
  EXIT SUB
 END IF

 File$ = File$ + ".HUG"

 Undo

 KILL File$

 File$ = "UNTITLED"

 DrawScreen

END SUB

SUB ExitThis

 OPEN "QBMP64.QBM" FOR OUTPUT AS #1
  FOR a = 1 TO IMGSIZE
   FOR d = 1 TO IMGSIZE
    PRINT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 COLOR drop

 CleanUp

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
    CASE 65 TO 90, 97 TO 122, 48 TO 57:
     IF LEN(a$) < 10 THEN a$ = a$ + UCASE$(kbhit$)
   END SELECT
   LOCATE gx, gy: PRINT a$
  END IF
 LOOP

 GetInput$ = a$

END FUNCTION

SUB Init

 CHDIR "C:\DRAGON"

 File$ = "UNTITLED"

 drop = 1
 crx = 1
 cry = 1
 UK$ = CHR$(0) + "H"
 DK$ = CHR$(0) + "P"
 LK$ = CHR$(0) + "K"
 RK$ = CHR$(0) + "M"
 EK$ = CHR$(13)
 SK$ = CHR$(32)

 FOR i = 1 TO 63
  PALETTE i + 192, i
 NEXT

 FOR a = 1 TO IMGSIZE
  FOR d = 1 TO IMGSIZE
   x(a, d) = a * SIZE
   y(a, d) = d * SIZE
 NEXT: NEXT

 OPEN "QBMP64.QBM" FOR INPUT AS #1
  FOR a = 1 TO IMGSIZE
   FOR d = 1 TO IMGSIZE
    INPUT #1, clr(a, d)
 NEXT: NEXT: CLOSE

END SUB

SUB LOAD

 COLOR 9

 Undo

 LOCATE 23, 1: PRINT "LOAD:"
 File$ = GetInput$(23, 6, 8, "_")

 IF File$ = "ESCAPE" THEN
  File$ = "UNTITLED"
  DrawScreen
  EXIT SUB
 END IF

 File$ = File$ + ".HUG"

 Undo

 OPEN File$ FOR INPUT AS #1
  FOR a = 1 TO IMGSIZE
   FOR d = 1 TO IMGSIZE
    INPUT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 DrawScreen

END SUB

SUB Main

 cursor (FALSE)
 cursor (TRUE)

 DO
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
   cursor (FALSE)
   SELECT CASE UCASE$(kbhit$)
    CASE "7": Change
    CASE CHR$(27): ExitThis
    CASE UK$: IF cry < IMGSIZE THEN cry = cry + 1
    CASE DK$: IF cry > 1 THEN cry = cry - 1
    CASE LK$: IF crx > 1 THEN crx = crx - 1
    CASE RK$: IF crx < IMGSIZE THEN crx = crx + 1
    CASE SP$: DrawHalf
    CASE "8": IF drop > 0 THEN drop = drop - 1: PutPaint
    CASE "2": IF drop < 255 THEN drop = drop + 1: PutPaint
    CASE "F": ShowFiles
    CASE "0": drop = 0: PutPaint
    CASE "B": BackSave
    CASE "S": SAVE
    CASE "L": LOAD
    CASE "E": Earase
    CASE "C": ClearScreen
    CASE EK$: drop = POINT(crx + 200, cry + 10): PutPaint
   END SELECT
   cursor (TRUE)
  END IF
 LOOP

END SUB

SUB PutPaint

 ass = 6
 FOR i = drop TO drop + 10
  IF i > 255 THEN EXIT FOR
  LOCATE ass, 35: COLOR i: PRINT USING "###"; i
  ass = ass + 1
 NEXT

END SUB

SUB SAVE

 COLOR 9

 Undo

 LOCATE 23, 1: PRINT "SAVE:"
 File$ = GetInput$(23, 6, 8, "_")

 IF File$ = "ESCAPE" THEN
  File$ = "UNTITLED"
  DrawScreen
  EXIT SUB
 END IF

 File$ = File$ + ".HUG"

 Undo

 OPEN File$ FOR OUTPUT AS #1
  FOR a = 1 TO IMGSIZE
   FOR d = 1 TO IMGSIZE
    PRINT #1, clr(a, d)
 NEXT: NEXT: CLOSE

 DrawScreen

END SUB

SUB ShowFiles

 CLS

 INPUT "Directory:", Dir$
 IF Dir$ <> "" THEN CHDIR Dir$
 INPUT "Files:", fl$
 IF fl$ = "" THEN fl$ = "*.hug"
 FILES fl$
 getch
 CLS
 DrawScreen

END SUB

SUB Undo
LOCATE 23, 1: PRINT "                                        "
END SUB

