'Game Editor by Matt Hackett 1996
DECLARE SUB BackSave ()
DECLARE SUB ExitThis ()
DECLARE SUB Earase ()
DECLARE SUB ShowFiles ()
DECLARE SUB Undo ()
DECLARE SUB getch ()
DECLARE SUB SAVE ()
DECLARE SUB LOAD ()
DECLARE SUB PutPaint ()
DECLARE SUB cursor (crdo%)
DECLARE SUB Init ()
DECLARE SUB Main ()
DECLARE SUB DrawScreen ()

DEFINT A-Z
SCREEN 13

CONST TRUE = 1
CONST FALSE = 0

DIM SHARED x(5, 5), y(5, 5), clr(5, 5)
 
DIM SHARED File$, behind(120)
DIM SHARED crx, cry, drop

Init
DrawScreen
Main

SUB BackSave

 COLOR 9: Undo

 LOCATE 23, 1: INPUT "BackSave FILENAME:", File$

 File$ = File$ + ".bit": Undo

 OPEN File$ FOR OUTPUT AS #1
  FOR a = 1 TO 5
   FOR d = 5 TO 1 STEP -1
    PRINT #1, clr(a, d)
   NEXT
  NEXT
 CLOSE

 OPEN File$ FOR INPUT AS #1
  FOR a = 1 TO 5
   FOR d = 1 TO 5
    INPUT #1, clr(a, d)
   NEXT
  NEXT
 CLOSE

 DrawScreen

END SUB

SUB cursor (crdo)

 SELECT CASE crdo
  CASE 1:
   LINE ((crx * 10) + 1, (cry * 10) + 1)-((crx * 10) + 8, (cry * 10) + 8), clr(cry, crx), BF
   IF clr(cry, crx) = 0 THEN PSET ((crx * 10) + 5, (cry * 10) + 5), 19
   PSET (10, (cry * 10) + 5), 15
   PSET ((crx * 10) + 5, 10), 15

  CASE 2:
   CIRCLE (crx * 10 + 5, cry * 10 + 5), 3, drop
   PSET (10, (cry * 10) + 5), 0
   PSET ((crx * 10) + 5, 10), 0

 END SELECT

END SUB

SUB DrawScreen

 File$ = UCASE$(File$): Undo

 LOCATE 23, 1: PRINT "FILE: "; File$

 LOCATE 5, 34: PRINT "ÚÄÄÄÄ¿"
 LOCATE 6, 33: PRINT "³    ³"
 FOR i = 7 TO 16
  LOCATE i, 34: PRINT "³    ³"
 NEXT
 LOCATE 17, 34: PRINT "ÀÄÄÄÄÙ"

 PutPaint

 'getch

 FOR a = 1 TO 5
  FOR d = 1 TO 5
   LINE (y(a, d) + 1, x(a, d) + 1)-(y(a, d) + 9, x(a, d) + 9), clr(a, d), BF
   IF clr(a, d) = 0 THEN PSET (y(a, d) + 5, x(a, d) + 5), 19
   PSET (d + 300, a + 10), clr(a, d)
   PSET (d + 275, a + 10), clr(a, d)
  NEXT
 NEXT

 LINE (y(1, 1), x(1, 1))-(y(5, 5) + 10, x(5, 5) + 10), 15, B
 LINE (300, 10)-(317, 27), 15, B

END SUB

SUB Earase

 COLOR 9: Undo

 LOCATE 23, 1: INPUT "KILL FILENAME:", File$

 File$ = File$ + ".bit": Undo

 KILL File$

 File$ = "Untitled"

 DrawScreen

END SUB

SUB ExitThis

 OPEN "little.bit" FOR OUTPUT AS #1
  FOR a = 1 TO 5
   FOR d = 1 TO 5
    PRINT #1, clr(a, d)
   NEXT
  NEXT
 CLOSE #1

 COLOR drop: END

END SUB

SUB getch
 DO: LOOP WHILE INKEY$ = ""
END SUB

SUB Init

 File$ = "Untitled"

 drop = 1
 crx = 1
 cry = 1

 FOR a = 1 TO 5
  FOR d = 1 TO 5
   x(a, d) = a * 10
   y(a, d) = d * 10
  NEXT
 NEXT

 CHDIR "c:\dragon"

 OPEN "little.bit" FOR INPUT AS #1
  FOR a = 1 TO 5
   FOR d = 1 TO 5
    INPUT #1, clr(a, d)
    IF clr(a, d) > 15 THEN clr(a, d) = 0
   NEXT
  NEXT
 CLOSE #1

END SUB

SUB LOAD

 COLOR 9: Undo

 LOCATE 23, 1: INPUT "LOAD FILENAME:", File$

 File$ = File$ + ".bit": Undo

 OPEN File$ FOR INPUT AS #1
  FOR a = 1 TO 5
   FOR d = 1 TO 5
    INPUT #1, clr(a, d)
    IF clr(a, d) > 15 THEN clr(a, d) = 0
   NEXT d
  NEXT a
 CLOSE

 DrawScreen

END SUB

SUB Main

 crx = 1
 cry = 1

 cursor (1): cursor (2)

 DO
 
  kbhit$ = INKEY$
  IF kbhit$ <> "" THEN
  
   cursor (1)

   SELECT CASE RIGHT$(kbhit$, 1)
  
    'Escape
    CASE CHR$(27): ExitThis

    'Up
    CASE CHR$(80): IF cry < 5 THEN cry = cry + 1

    'Down
    CASE CHR$(72): IF cry > 1 THEN cry = cry - 1

    'Left
    CASE CHR$(75): IF crx > 1 THEN crx = crx - 1

    'Right
    CASE CHR$(77): IF crx < 5 THEN crx = crx + 1

    CASE CHR$(32): clr(cry, crx) = drop: DrawScreen

    CASE "8": IF drop > 0 THEN drop = drop - 1: PutPaint

    CASE "2": IF drop < 15 THEN drop = drop + 1: PutPaint
   
    CASE "f", "F": ShowFiles
   
    CASE "0": drop = 0: PutPaint

    CASE "b", "B": BackSave
    CASE "s", "S": SAVE
    CASE "l", "L": LOAD
    CASE "e", "E": Earase
    CASE "c", "C", "n":
     IF RIGHT$(kbhit$, 1) = "n" THEN drop = 0
     FOR a = 1 TO 5
      FOR d = 1 TO 5
       clr(a, d) = drop
      NEXT d
     NEXT a
     File$ = "Untitled"
     DrawScreen
    CASE CHR$(13):
     drop = POINT(crx + 275, cry + 10): PutPaint

   END SELECT

   cursor (2)
            
  END IF 'End key stroke

 LOOP

END SUB

SUB PutPaint

 ass = 6

 FOR i = drop TO drop + 10
  IF i > 15 THEN EXIT FOR
  LOCATE ass, 35: COLOR i: PRINT USING "###"; i
  ass = ass + 1
 NEXT i

END SUB

SUB SAVE

 COLOR 9: Undo

 LOCATE 23, 1: INPUT "SAVE FILENAME:", File$

 File$ = File$ + ".bit": Undo

 OPEN File$ FOR OUTPUT AS #1
  FOR a = 1 TO 5
   FOR d = 1 TO 5
    PRINT #1, clr(a, d)
   NEXT d
  NEXT a
 CLOSE

 DrawScreen

END SUB

SUB ShowFiles

 CLS : INPUT "Directory:", Dir$

 IF Dir$ <> "" THEN CHDIR Dir$

 INPUT "Files:", fl$

 IF fl$ = "" THEN fl$ = "*.bit"

 FILES fl$: getch

 CLS : DrawScreen

END SUB

SUB Undo
 LOCATE 23, 1: PRINT "                                        "
END SUB

