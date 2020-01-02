:- use_module(library(lists)).
:- include('piece.pl').

start(Board, Player):- initBoard(Board), displayGame(Board, Player).
vsep :- write('|').
hsep :- write('+---+---+---+---+  +---+---+---+---+'), nl.

/* initialize board as a 2x2 matrix of boards */
initBoard(Board) :-
    append([[
            [
                [[2,2,2,2], [0,0,0,0], [0,0,0,0], [1,1,1,1]], 
                [[2,2,2,2], [0,0,0,0], [0,0,0,0], [1,1,1,1]]
            ],
            [
                [[2,2,2,2], [0,0,0,0], [0,0,0,0], [1,1,1,1]], 
                [[2,2,2,2], [0,0,0,0], [0,0,0,0], [1,1,1,1]]
            ]
           ]], Board).

/* print player number */
printPlayer(N) :-
    write('Player '),
    write(N),
    nl.

/* print board number*/
printBoardNumber(N) :-
    write('Board '),
    N1 is N * 2 - 1,
    write(N1),
    write('            Board '),
    N2 is N1 + 1,
    write(N2),
    nl.

/*print column letter*/
printColumnLetter :-
    write('  a   b   c   d      a   b   c   d  ').

printLineNumber(K) :-
    write(K).

printSep(2) :- vsep.
printSep(_).

printHSep(4).
printHSep(_) :- hsep.

/* translation for values in the internal data structure which will be displayed in displayGame */
translate(0, ' ').
translate(1, 'X').
translate(2, 'O').

/* print a single cell with a vertical separator */
printCell(C) :-
    translate(C,P),
    vsep,
    write(' '),
    write(P),
    write(' ').

/* print a line of a single board */
printLine([]).
printLine([C|L]):-
    printCell(C),
    printLine(L).

/* print a line to the screen, this line contains the Nth line of the top or bottom boards */ 
printBoardLine([], 0, K) :- nl.

printBoardLine([Line|Lines], N, K) :-
    N > 0,
    N1 is N - 1,
    printLine(Line),
    vsep,
    printLineNumber(K),
    write(' '),
    printBoardLine(Lines, N1, K).

/* print boards after transposing */
printTransposed([], 0, K).

printTransposed([Current|Next], N, K) :-
    N > 0,
    N1 is N - 1,
    K > -1,
    K1 is K + 1,
    printHSep(N),
    printBoardLine(Current, 2, K1),
    printTransposed(Next, N1, K1).


/* print top and bottom boards */
printBoards([], 3):- nl.
printBoards([Top|Bottom], N) :-
    N1 is N + 1, nl, 
    printPlayer(N),
    printBoardNumber(N),
    printColumnLetter, nl,
    hsep,
    transpose(Top, Transposed),
    printTransposed(Transposed, 4, 0),
    hsep, 
    printBoards(Bottom, N1).

/* print the 4 boards as a 2x2 matrix */
displayGame(Board, Player) :-
    printBoards(Board, 1),
    write('Player '),
    write(Player),
    write(' turn.'), nl.

/*Functions to move a piece from oldPlace to newPlace*/
/*Set New Coordinates of a Piece*/
setPiece(_, _, _, NewRow, _, _):-
    (NewRow < 1;
    NewRow > 4).

setPiece(_, _, _, _, NewCol, _):-
    (NewCol < 1;
    NewCol > 4).

setPiece(Piece, BoardNo, Board, NewRow, NewCol, NextBoard):-
    setBranch(Piece, BoardNo, Board, NewRow, NewCol, NextBoard).

/*Choosing the branch of matrices to use*/
setBranch(Piece, BoardNo, [Head|[Head2|Tail]], NewRow, NewCol, [Head|[NewHead2|Tail]]):-
    BoardNo > 2,
    BoardNo < 5,
    BoardNum is BoardNo-2,
    setBoard(Piece, BoardNum, Head2, NewRow, NewCol, NewHead2).

setBranch(Piece, BoardNo, [Head|Tail], NewRow, NewCol, [NewHead|Tail]):-
    BoardNo > 0,
    BoardNo < 3,
    setBoard(Piece, BoardNo, Head, NewRow, NewCol, NewHead).

/*Choosing the board to move the piece*/
setBoard(Piece, 1, [Head|Tail], NewRow, NewCol, [NewBoard|Tail]):-
    setRow(Piece, Head, NewRow, NewCol, NewBoard).

setBoard(Piece, BoardNo, [Head|Tail], NewRow, NewCol, [Head|NewTail]):-
    BoardNumber is BoardNo-1,
    setBoard(Piece, BoardNumber, Tail, NewRow, NewCol, NewTail).

/*Choosing the row of cells that includes the asked one*/
setRow(Piece, [Head|Tail], 1, Col, [NewRow|Tail]):-
    setCol(Piece, Head, Col, NewRow).

setRow(Piece, [Line|Tail], Row, Col, [Line|NewTail]):-
    NewRow is Row-1,
    setRow(Piece, Tail, NewRow, Col, NewTail).

/*Choosing the cell to change*/
setCol(Piece, [Cell|Tail], 1, [Piece|Tail]):-
    playerPiece(Piece, Cell).

setCol(Piece, [Cell|Tail], Col, [Cell|NewTail]):-
    Column is Col-1,
    setCol(Piece, Tail, Column, NewTail).

playerPiece(1,0).
playerPiece(2,0).
playerPiece(0,0).
playerPiece(0,1).
playerPiece(0,2).
playerPiece(1,2).
playerPiece(2,1).

/*Get the piece from a certain cell to check valid moves*/
getPiece(BoardNumber, Board, Row, Column, Piece):-
    BoardNumber > 0,
    BoardNumber < 5,
    getBoard(BoardNumber, Board, SelectedBoard),
    nth1(Row, SelectedBoard, Line),
    nth1(Column, Line, Piece).

getBoard(BoardNumber, Board, SelectedBoard):-
    getBranch(BoardNumber, Board, Branch),
    (BoardNumber is 2;
    BoardNumber is 4),
    nth1(2, Branch, SelectedBoard).

getBoard(BoardNumber, Board, SelectedBoard):-
    getBranch(BoardNumber, Board, Branch),
    (BoardNumber is 1;
    BoardNumber is 3),
    nth1(1, Branch, SelectedBoard).

getBranch(BoardNumber, Board, Branch):-
    BoardNumber > 0,
    BoardNumber < 3,
    nth1(1, Board, Branch).

getBranch(BoardNumber, Board, Branch):-
    BoardNumber > 2,
    BoardNumber < 5,
    nth1(2, Board, Branch).
