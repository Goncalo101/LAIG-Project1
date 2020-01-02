getBoardNumber(BoardNo):-
    write('Board: '),
    get_code(Bd),
    read_line(_),
    BoardNo is Bd-48,
    BoardNo > 0,
    BoardNo < 5.

getOriginLine(OLine):-
    write('Line: '), 
    get_code(OLi),
    read_line(_),
    OLine is OLi-48,
    OLine > 0,
    OLine < 5.

getOriginColumn(OColumn):-
    write('Column: '), 
    get_char(OCo),
    read_line(_),
    char_code(OCo, OCode),
    OColumn is OCode-96,
    OColumn > 0,
    OColumn < 5.

getDestinationLine(DLine):-
    write('Line: '), 
    get_code(DLi),
    read_line(_),
    DLine is DLi-48,
    DLine > 0,
    DLine < 5.

getDestinationColumn(DColumn):-
    write('Column: '), 
    get_char(DCo),
    read_line(_),
    char_code(DCo, DCode),
    DColumn is DCode-96,
    DColumn > 0,
    DColumn < 5.


getDestinationCoordinates(DLine, DColumn) :-
    write('Destination coordinates'), nl,
    getDestinationLine(DLine),
    getDestinationColumn(DColumn).

getOriginCoordinates(OLine, OColumn) :-
    write('Origin coordinates'), nl,
    getOriginLine(OLine),
    getOriginColumn(OColumn).

% calculate delta of move
% asks for input until deltas are ok
calculateDeltas(OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn):-
    repeat,
    getOriginCoordinates(OLine, OColumn),
    getDestinationCoordinates(DLine, DColumn),
    DeltaLine is DLine-OLine,
    DeltaColumn is DColumn-OColumn, nl,
    possibleDelta(DeltaLine, DeltaColumn).

possibleDelta(0, 1).
possibleDelta(0, 2).
possibleDelta(0, -1).
possibleDelta(0, -2).
possibleDelta(1, 0).
possibleDelta(2, 0).
possibleDelta(-1, 0).
possibleDelta(-2, 0).
possibleDelta(1, 1).
possibleDelta(2, 2).
possibleDelta(-1, -1).
possibleDelta(-2, -2).
possibleDelta(-1, 1).
possibleDelta(-2, 2).
possibleDelta(1, -1).
possibleDelta(2, -2).

checkPiece(_, 0, Flag):-
    Flag is 0.

checkPiece(Player, Piece, Flag) :-
    Player == Piece,
    Flag is -1,
    write('Illegal move: one of your pieces is already in that position'),
    fail.

checkPiece(Player, Piece, Flag) :-
    Piece \= Player,
    Flag is 1.

checkingDeltas(DeltaLine, DeltaColumn, LineToCheck, ColToCheck):-
    DeltaLine == DeltaColumn,
    compare(DeltaLine, LineToCheck),
    ColToCheck is LineToCheck.

checkingDeltas(DeltaLine, DeltaColumn, LineToCheck, ColToCheck):-
    DeltaLine is 0,
    compare(DeltaColumn, ColToCheck),
    LineToCheck is 0.

checkingDeltas(DeltaLine, DeltaColumn, LineToCheck, ColToCheck):-
    DeltaColumn is 0,
    compare(DeltaLine, LineToCheck),
    ColToCheck is 0.

compare(Delta, Check):-
    (Delta is 1;
    Delta is 2),
    Check is 1.

compare(Delta, Check):-
    (Delta is -1;
    Delta is -2),
    Check is -1.
