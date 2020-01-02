:- include('board.pl').
:- include('menu.pl').
:- use_module(library(random)).

play:-
    initialMenuHandler.

:- dynamic(choice/1).

start(Num):-
    start(Board, 1),
    initialInfo,
    assertz(choice(Num)),
    play_mode(1, Board).

play_mode(Player, Board):- % Mode 1 - pvp , 2 - pvc, 3 - cvp, 4 - cvc
    choice(1),
    passiveMove(Player, Board).

play_mode(1, Board):- % Mode 1 - pvp , 2 - pvc, 3 - cvp, 4 - cvc
    choice(2),
    passiveMove(1, Board).

play_mode(2, Board):- % Mode 1 - pvp , 2 - pvc, 3 - cvp, 4 - cvc
    choice(2),
    cpuPassiveMove(2, Board).

play_mode(2, Board):- % Mode 1 - pvp , 2 - pvc, 3 - cvp, 4 - cvc
    choice(3),
    passiveMove(2, Board).

play_mode(1, Board):- % Mode 1 - pvp , 2 - pvc, 3 - cvp, 4 - cvc
    choice(3),
    cpuPassiveMove(1, Board).

play_mode(Player, Board):- % Mode 1 - pvp , 2 - pvc, 3 - cvp, 4 - cvc
    choice(4),
    cpuPassiveMove(Player, Board).
    

initialInfo:-
    write('Player 1 is the X'), nl,
    write('Player 2 is the O'), nl, nl,
    write('Player with X starts!'), nl, nl.

move(Move, Board, NewBoard):-
    Move is 1 -> pvp(Board).

pvp(Move, Board):-
    passiveMove(1, Board).

pvc(Move, Board) :-
    passiveMove(1, Board).

passiveMove(Player, Board):-
    write('Passive move'), nl,
    possiblePassiveMove(Player, BoardNo, Board, OLine, OColumn, DLine, DColumn), % get user input and check if move is valid
    setPiece(Player, BoardNo, Board, DLine, DColumn, Board2), % move piece to new place
    setPiece(0, BoardNo, Board2, OLine, OColumn, FollowingBoard), % remove piece from previous place
    displayGame(FollowingBoard, Player), nl,
    aggressivePlayTactic(OLine, OColumn, DLine, DColumn, LineDif, ColDif), nl, % gets delta diff from selected move 
    aggressiveMove(Player, FollowingBoard, BoardNo, LineDif, ColDif).

cpuPassiveMove(Player, Board):-
    valid_moves(Player, Board, ListOfMoves),
%    show_records(ListOfMoves),
    write('After valid moves\n'),
    length(ListOfMoves, Len),
    Length is Len + 1,
    write('After length moves '),
    write(Len),
    write('\n'),
    random(1, Length, RandVal),
    write('After random moves\n'),
    nth1(RandVal, ListOfMoves, Move),
    nth1(RandVal, ListOfMoves, [PassBoard, PassOLine, PassOCol, PassDLine, PassDCol, AgressBoard, AgressOLine, AgressOCol, AgressDLine, AgressDCol]),
    write('After selecting move\n'),
    write(Move),
%    write('\n'),
%    breakingElement(Move, BoardNo, OLine, OCol, DLine, DCol),
    DeltaLine is PassDLine-PassOLine,
    DeltaColumn is PassDCol-PassOCol, nl,
%    possibleDelta(DeltaLine, DeltaColumn),
%    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn),
%    write('After check move\n'),
%    getPiece(BoardNo, Board, OLine, OCol, Piece1),
%    getPiece(BoardNo, Board, DLine, DCol, Piece2),
%    getIntermediatePiece(BoardNo, Board, OLine, OCol, IntermediateLine, IntermediateColumn, Piece3),
%    format("1 = ~d, 2 = ~d, 3 = ~d~n", [Piece1, Piece2, Piece3]),
%    Piece1 is Player,
%    Piece2 is 0,
%    Piece3 < 1,
%    write('Possible Passive Move!'), nl,
    setPiece(Player, PassBoard, Board, PassDLine, PassDCol, Board2),
    setPiece(0, PassBoard, Board2, PassOLine, PassOCol, Board3),
    displayGame(Board3, Player), nl,
    write('After done moves\n'),
    
    
%    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn),
    calculateBehindPiece(AgressDLine, AgressDCol, DeltaLine, DeltaColumn, BehindLine, BehindColumn),
%    getPiece(BoardNo, Board, OLine, OCol, Piece1),
    getPiece(AgressBoard, Board, AgressDLine, AgressDCol, Piece2),
%    getIntermediatePiece(BoardNo, Board, OLine, OCol, IntermediateLine, IntermediateColumn, 
%    getBehindPiece(BoardNo, Board, BehindLine, BehindColumn, Piece4),
%    Piece1 is Player,
%    Piece3 < 1,
%    (Piece2 is 0;
%     (Piece2 > 0,
%      Piece2 =\= Player,
%      Piece4 < 1)),
%    write('Possible Aggressive Move!'), nl, 
%    write(Move),nl,   
    setPiece(0, AgressBoard, Board3, AgressOLine, AgressOCol, Board4),
    setPiece(Player, AgressBoard, Board4, AgressDLine, AgressDCol, Board5),
    onlySetBehindPiece(Player, Piece2, AgressBoard, Board5, BehindLine, BehindColumn, NewBoard),
    
    displayGame(NewBoard, Player), nl, % display game
    gameOver(NewBoard, Winner), % false if game has ended
    passingTheTurn(Player, NewPlayer), % get new player
    displayGame(NewBoard, NewPlayer), nl, % display
    play_mode(NewPlayer, NewBoard).

aggressiveMove(Player, Board, PrevBoardNo, DeltaLine, DeltaColumn) :-
    write('Aggressive move'), nl,
    possibleAgressiveMove(Player, PrevBoardNo, NewBoardNo, Board, OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn, 
                      BehindLine, BehindColumn, Piece1, Piece2), % asks user input and check if is possible
    setPiece(0, NewBoardNo, Board, OLine, OColumn, Board2),
    setPiece(Player, NewBoardNo, Board2, DLine, DColumn, Board3),
    setBehindPiece(Player, Piece2, NewBoardNo, Board3, BehindLine, BehindColumn, NewBoard).

possiblePassiveMove(Player, BoardNo, Board, OLine, OColumn, DLine, DColumn):-
    repeat,
    getBoardNumber(BoardNo), % gets board to move
    calculateDeltas(OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn),  % asks user input and check if possible
    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn), % gets delta for intermediary piece
    getPiece(BoardNo, Board, OLine, OColumn, Player), % checks if piece selected is yours
    getPiece(BoardNo, Board, DLine, DColumn, 0), % check if piece moves to empty place
    getIntermediatePiece(BoardNo, Board, OLine, OColumn, IntermediateLine, IntermediateColumn, Piece3), % gets intermediary piece
    Piece3 < 1, % checks if there is no piece in the intermediary
    write('Possible Passive Move!'), nl.

possibleAgressiveMove(Player, PrevBoardNo, NewBoardNo, Board, OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn, 
                      BehindLine, BehindColumn, Piece1, Piece2):-
    repeat,
    aggressiveBoardPossibility(PrevBoardNo, NewBoardNo), % checks if selected board is on the other side
    getOriginCoordinates(OLine, OColumn), % asks for user input
    calculateAgressivePlay(OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn), % get destination based on deltas
    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn), % get intermediary place
    calculateBehindPiece(DLine, DColumn, DeltaLine, DeltaColumn, BehindLine, BehindColumn), % get pushed piece position
    getPiece(NewBoardNo, Board, OLine, OColumn, Piece1), % get piece place before
    getPiece(NewBoardNo, Board, DLine, DColumn, Piece2), % get piece place after
    getIntermediatePiece(NewBoardNo, Board, OLine, OColumn, IntermediateLine, IntermediateColumn, Piece3),  % get piece intermediary
    getBehindPiece(NewBoardNo, Board, BehindLine, BehindColumn, Piece4), % get piece in place of final push position
    Piece1 is Player, % piece choosen is mine
    Piece3 < 1, % todo 
    (Piece2 is 0;
     (Piece2 > 0,
      Piece2 =\= Player,
      Piece4 < 1)),
    write('Possible Aggressive Move!'), nl.

onlySetBehindPiece(Player, Piece, BoardNo, Board, BehindLine, BehindColumn, NewBoard):-
    Piece > 0,
    BehindLine > 0,
    BehindLine < 5,
    BehindColumn > 0,
    BehindColumn < 5, % if behind position is inside board
    setPiece(Piece, BoardNo, Board, BehindLine, BehindColumn, NewBoard). % set behind piece

onlySetBehindPiece(Player, Piece, BoardNo, Board, BehindLine, BehindColumn, Board).

setBehindPiece(Player, Piece, BoardNo, Board, BehindLine, BehindColumn, NewBoard):-
    Piece > 0,
    BehindLine > 0,
    BehindLine < 5,
    BehindColumn > 0,
    BehindColumn < 5, % if behind position is inside board
    setPiece(Piece, BoardNo, Board, BehindLine, BehindColumn, NewBoard), % set behind piece
    displayGame(NewBoard, Player), nl, % display game
    gameOver(NewBoard, Winner), % false if game has ended
    passingTheTurn(Player, NewPlayer), % get new player
    displayGame(NewBoard, NewPlayer), nl, % display
    play_mode(NewPlayer, NewBoard). % call passive move again (cycle)

setBehindPiece(Player, Piece, BoardNo, Board, BehindLine, BehindColumn, NewBoard):-
    displayGame(Board, Player), nl,
    gameOver(Board, Winner),
    passingTheTurn(Player, NewPlayer),
    displayGame(Board, NewPlayer), nl,
    play_mode(NewPlayer, Board).

cpuAggressiveMove(Player, Board, PrevBoardNo, DeltaLine, DeltaColumn):-
    write('Aggressive move'), nl,
    valid_moves_agressive(Player, Board, PrevBoardNo, DeltaLine, DeltaColumn, ListOfMoves),
    length(ListOfMoves, Len),
    Length is Len + 1,
    write('After length moves '),
    write(Len),
    write('\n'),
    random(1, Length, RandVal),
    write('After random moves\n'),
    nth1(RandVal, ListOfMoves, Move),
    write('After selecting move\n'),
    write(Move),
    write('\n'),
    breakingElement(Move, BoardNo, OLine, OCol, DLine, DCol),
%    repeat,
%    random(1, 5, NewBoardNo),
%    aggressiveBoardPossibility(PrevBoardNo, NewBoardNo),
%    random(1, 5, OLine),
%    random(1, 5, OColumn),
    calculateAgressivePlay(OLine, OCol, DLine, DCol, DeltaLine, DeltaColumn),
    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn),
    calculateBehindPiece(DLine, DCol, DeltaLine, DeltaColumn, BehindLine, BehindColumn),
    getPiece(BoardNo, Board, OLine, OCol, Piece1),
    getPiece(BoardNo, Board, DLine, DCol, Piece2),
    getIntermediatePiece(BoardNo, Board, OLine, OCol, IntermediateLine, IntermediateColumn, Piece3),
    getBehindPiece(BoardNo, Board, BehindLine, BehindColumn, Piece4),
    Piece1 is Player,
    Piece3 < 1,
    (Piece2 is 0;
     (Piece2 > 0,
      Piece2 =\= Player,
      Piece4 < 1)),
    write('Possible Aggressive Move!'), nl, 
    write(Move),nl,   
    setPiece(0, BoardNo, Board, OLine, OCol, Board2),
    setPiece(Player, BoardNo, Board2, DLine, DCol, Board3),
    onlySetBehindPiece(Player, Piece2, BoardNo, Board3, BehindLine, BehindColumn, NewBoard),
    
    displayGame(NewBoard, Player), nl, % display game
    gameOver(NewBoard, Winner), % false if game has ended
    passingTheTurn(Player, NewPlayer), % get new player
    displayGame(NewBoard, NewPlayer), nl, % display
    play_mode(NewPlayer, NewBoard).


breakingElement([H1|[H2|[H3|[H4|[H5|T]]]]], Board, OLine, OCol, DLine, DCol):-
    Board = H1,
    OLine = H2,
    OCol = H3,
    DLine = H4,
    DCol = H5.



/*Function to calculate usable play for the cpu*/

possibleMove(Player, PrevBoardNo, NewBoardNo, Board, OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn, 
                      BehindLine, BehindColumn, Piece1, Piece2):-
    calculateAgressivePlay(OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn),
    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn),
    calculateBehindPiece(DLine, DColumn, DeltaLine, DeltaColumn, BehindLine, BehindColumn),
    getPiece(NewBoardNo, Board, OLine, OColumn, Piece1),
    getPiece(NewBoardNo, Board, DLine, DColumn, Piece2),
    getIntermediatePiece(NewBoardNo, Board, OLine, OColumn, IntermediateLine, IntermediateColumn, Piece3),
    getBehindPiece(NewBoardNo, Board, BehindLine, BehindColumn, Piece4),
    Piece1 is Player,
    Piece3 < 1,
    (Piece2 is 0;
     (Piece2 > 0,
      Piece2 =\= Player,
      Piece4 < 1)).

getIntermediatePiece(BoardNo, Board, OLine, OColumn, IntermediateLine, IntermediateColumn, Piece):-
    (IntermediateLine =\= 0;
     IntermediateColumn =\= 0),
    IL is OLine + IntermediateLine,
    IC is OColumn + IntermediateColumn,
    getPiece(BoardNo, Board, IL, IC, Piece).

getIntermediatePiece(BoardNo, Board, OLine, OColumn, IntermediateLine, IntermediateColumn, Piece):-
    IntermediateLine is 0,
    IntermediateColumn is 0,
    Piece is -1.

getBehindPiece(BoardNo, Board, BehindLine, BehindColumn, Piece):-
    ((BehindLine < 1;
      BehindLine > 4);
     (BehindColumn < 1;
      BehindColumn > 4)),
    Piece is -1.

getBehindPiece(BoardNo, Board, BehindLine, BehindColumn, Piece):-
    getPiece(BoardNo, Board, BehindLine, BehindColumn, Piece).

calculateBehindPiece(DLine, DColumn, DeltaLine, DeltaColumn, BehindLine, BehindColumn):-
    calculateBehindCoord(DLine, DeltaLine, BehindLine),
    calculateBehindCoord(DColumn, DeltaColumn, BehindColumn).

calculateBehindCoord(Destination, Delta, Behind):-
    Delta > 0,
    Behind is Destination + 1.

calculateBehindCoord(Destination, Delta, Behind):-
    Delta < 0,
    Behind is Destination - 1.

calculateBehindCoord(Destination, Delta, Behind):-
    Delta is 0,
    Behind is Destination.

calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn):-
    deltaAnalysis(DeltaLine, IntermediateLine),
    deltaAnalysis(DeltaColumn, IntermediateColumn).

deltaAnalysis(Delta, Intermediate):-
    Delta is 2,
    Intermediate is 1.

deltaAnalysis(Delta, Intermediate):-
    Delta is -2,
    Intermediate is -1.

deltaAnalysis(Delta, Intermediate):-
    Delta < 2,
    Delta > -2,
    Intermediate is 0.

aggressivePlayTactic(OLine, OColumn, DLine, DColumn, LineDif, ColDif):-
    LineDif is DLine-OLine,
    ColDif is DColumn-OColumn.

aggressiveBoardPossibility(PrevNumber, NewBoardNo) :-
    repeat, 
    getBoardNumber(NewBoardNo),
    \+ aggressiveBoardPossibilities(PrevNumber, NewBoardNo).

aggressiveBoardPossibilities(PrevNumber, NewBoardNo):-
    (PrevNumber is 2;
    PrevNumber is 4),
    (NewBoardNo is 2;
    NewBoardNo is 4),
    write('The number of the board for the aggressive move should be 1 or 3'), nl, nl.

aggressiveBoardPossibilities(PrevNumber, NewBoardNo):-
    (PrevNumber is 1;
    PrevNumber is 3),
    (NewBoardNo is 1;
    NewBoardNo is 3),
    write('The number of the board for the aggressive move should be 2 or 4'), nl, nl.

calculateAgressivePlay(OLine, OColumn, DLine, DColumn, DeltaLine, DeltaColumn):-
    DLine is OLine + DeltaLine,
    DColumn is OColumn + DeltaColumn.

passingTheTurn(Player, NewPlayer):-
    write('Press any key to pass the turn'),
    getAnyKey(Key),
    changePlayer(Player, NewPlayer),
    clearConsole.

changePlayer(2, 1).
changePlayer(1, 2).

gameOver(Board, Winner):-
    endGame(Board, 1, 1, 1, 0, 0, 0, Winner)
%    champion(Winner).
    .

champion(Winner):-
    Winner > 0, 
    Winner < 3,
    nl,
    write('Player '),
    write(Winner),
    write(' won the game!'),
    getAnyKey(Key),
    endMenuHandler.

champion(Winner):-
    (Winner < 1;
    Winner > 2),
    write('Changing Player'), nl.

endGame(Board, BoardNumber, Row, Column, P1No, P2No, Counter, Winner):-
    (BoardNumber > 4 -> 
        Winner is 0;
        /*else*/
        (getPiece(BoardNumber, Board, Row, Column, Piece),
        Cnt is Counter + 1,
        (Piece is 1 -> 
            (P1Number is P1No + 1, P2Number is P2No);
        Piece is 2 -> 
            (P2Number is P2No + 1, P1Number is P1No);
        /*else*/
            (P1Number is P1No, P2Number is P2No)),
        (Column is 4 -> 
            (Line is Row + 1, Col is 1);
        /*else*/
            (Line is Row, Col is Column + 1)),
        ((Cnt is 16, P1Number is 0) -> 
            Winner is 2;
        (Cnt is 16, P2Number is 0) -> 
            Winner is 1;
        (P1Number > 0, P2Number > 0) -> 
            (BN is BoardNumber + 1, endGame(Board, BN, 1, 1, 0, 0, 0, Winner));
        /*else*/
            endGame(Board, BoardNumber, Line, Col, P1Number, P2Number, Cnt, Winner)))).

show_records([]):-
        write('\n').
show_records([A|B]) :-
  format('~d ',A),
  show_records(B).

/*Starting CPU Work*/

getAllPlayerPiecesPosition(Player, Board, ListOfPositions):-
    findall([1, Row, Column], getPiece(1, Board, Row, Column, Player), List1),
    findall([2, Row, Column], getPiece(2, Board, Row, Column, Player), List2),
    findall([3, Row, Column], getPiece(3, Board, Row, Column, Player), List3),
    findall([4, Row, Column], getPiece(4, Board, Row, Column, Player), List4),
%    show_records([List1]),
%    show_records(List2),
%    show_records(List3),
%    show_records(List4),    
    append([List1], [List2], IntermediateList1),
    append([List3], [List4], IntermediateList2),
    append(IntermediateList1, IntermediateList2, ListOfPositions). %list of 4 lists of form [Board, y (bottom is 1), x (left is 1)]

getAllPlayerPiecesPositionAgressive(Player, Board, PrevBoard, ListOfPositions):-
    
    BoardFirst is mod(PrevBoard, 2) + 1,
    BoardSecond is mod(PrevBoard, 2) + 3,
    findall([BoardFirst, Row, Column], getPiece(BoardFirst, Board, Row, Column, Player), List1),
    findall([BoardSecond, Row, Column], getPiece(BoardSecond, Board, Row, Column, Player), List2),
%    show_records([List1]),
%    show_records(List2),
%    show_records(List3),
%    show_records(List4),    
    append([List1], [List2], ListOfPositions). %list of 4 lists of form [Board, y (bottom is 1), x (left is 1)]

passiveMovesAvailable(Player, Board, [H1|[H2|[H3|[H4|T]]]], ListWithMoves):-
    
    % H1 of form list ([Board, y (bottom is 1), x (left is 1)])
    getPossibleDestinationCoords(Player, H1, Board, NovaLista),  % H1 is empty if the player has no piece on the board 1
    append([], NovaLista, Temp2),

    getPossibleDestinationCoords(Player, H2, Board, NovaLista1),
    append(Temp2, NovaLista1, Temp3),

    getPossibleDestinationCoords(Player, H3, Board, NovaLista2),
    append(Temp3, NovaLista2, Temp4),
    
%    write('H4: '),
%    write(H4),
%    write('\n'),

    getPossibleDestinationCoords(Player, H4, Board, NovaLista3),
    append(Temp4, NovaLista3, Temp5),

    ListWithMoves = Temp5.

agressiveMovesAvailable(Player, Board, DeltaLine, DeltaColumn, [H1|[H2|T]], ListWithMoves):-
    
    % H1 of form list ([Board, y (bottom is 1), x (left is 1)])
    getPossibleDestinationCoordsAgressive(Player, H1, Board, DeltaLine, DeltaColumn, NovaLista), % H1 is empty if the player has no piece on the board 1
    append([], NovaLista, Temp2),

    getPossibleDestinationCoordsAgressive(Player, H2, Board, DeltaLine, DeltaColumn, NovaLista1),
    append(Temp2, NovaLista1, Temp3),

    ListWithMoves = Temp3.


getPossibleDestinationCoords(_, [], _, []).  % no pieces in board

getPossibleDestinationCoords(Player, [H|T], Board, NewList):-
    
    %doesnt work when a piece has died
    
    usingAllMovePossibilities(Player, Board, H, NovaLista),
    
    getPossibleDestinationCoords(Player, T, Board, NovaLista1),
    
    append(NovaLista1, NovaLista, NewList).

%getPossibleDestinationCoords(Player, [H1|[H2|[H3|[H4|T]]]], Board, NewList):-
%    
%    
%    
%    %doesnt work when a piece has died
%    
%    usingAllMovePossibilities(Player, Board, H1, NovaLista),
%    append([], NovaLista, Temp2),
%
%    usingAllMovePossibilities(Player, Board, H2, NovaLista1),
%    append(Temp2, NovaLista1, Temp3),
%
%    usingAllMovePossibilities(Player, Board, H3, NovaLista2),
%    append(Temp3, NovaLista2, Temp4),
%
%    usingAllMovePossibilities(Player, Board, H4, NovaLista3), % H4 is empty if the player is missing a piece on the board 4
%    append(Temp4, NovaLista3, Temp5),
%    
%    NewList = Temp5.


getPossibleDestinationCoordsAgressive(_, [], _, _, _, []).

getPossibleDestinationCoordsAgressive(Player, [H|T], Board, DeltaLine, DeltaColumn, NewList):-
    
    usingAllMovePossibilitiesAgressive(Player, Board, H, DeltaLine, DeltaColumn, NovaLista),
    
    getPossibleDestinationCoordsAgressive(Player, T, Board, DeltaLine, DeltaColumn, NovaLista1),
    
    append(NovaLista1, NovaLista, NewList).

%getPossibleDestinationCoordsAgressive(Player, [H1|[H2|[H3|[H4|T]]]], Board, DeltaLine, DeltaColumn, NewList):-
%    
%    %doesnt work when a piece has died
%    
%    usingAllMovePossibilitiesAgressive(Player, Board, H1, DeltaLine, DeltaColumn, NovaLista),
%    append([], NovaLista, Temp2),
%
%    usingAllMovePossibilitiesAgressive(Player, Board, H2, DeltaLine, DeltaColumn, NovaLista1),
%    append(Temp2, NovaLista1, Temp3),
%
%    usingAllMovePossibilitiesAgressive(Player, Board, H3, DeltaLine, DeltaColumn, NovaLista2),
%    append(Temp3, NovaLista2, Temp4),
%
%    usingAllMovePossibilitiesAgressive(Player, Board, H4, DeltaLine, DeltaColumn, NovaLista3),
%    append(Temp4, NovaLista3, Temp5),
%    
%    NewList = Temp5.

usingAllMovePossibilities(_, _, [], []):-
    write('Piece removed!').

usingAllMovePossibilities(Player, Board, Line, NovaLista):-
    
%    write('Before calculate\n'),
%    write(Line),
    
    /* check move possibilities vertically */
    calculatePossiblePlay(Player, Board, Line, -1, 0, H1List),
    calculatePossiblePlay(Player, Board, Line, -2, 0, H2List),
    calculatePossiblePlay(Player, Board, Line, 1, 0, H3List),
    calculatePossiblePlay(Player, Board, Line, 2, 0, H4List),

    /* check move possibilities horizontally */
    calculatePossiblePlay(Player, Board, Line, 0, -1, H5List),
    calculatePossiblePlay(Player, Board, Line, 0, -2, H6List), 
    calculatePossiblePlay(Player, Board, Line, 0, 1, H7List),
    calculatePossiblePlay(Player, Board, Line, 0, 2, H8List),

    /* check move possibilities diagonally */
    calculatePossiblePlay(Player, Board, Line, 1, 1, H9List),
    calculatePossiblePlay(Player, Board, Line, 1, -1, H10List),
    calculatePossiblePlay(Player, Board, Line, -1, 1, H11List),
    calculatePossiblePlay(Player, Board, Line, -1, -1, H12List),
    calculatePossiblePlay(Player, Board, Line, 2, 2, H13List),
    calculatePossiblePlay(Player, Board, Line, 2, -2, H14List),
    calculatePossiblePlay(Player, Board, Line, -2, 2, H15List),
    calculatePossiblePlay(Player, Board, Line, -2, -2, H16List),
    
%    write('After calculate\n'),

    /* append everything */

    append(H1List, H2List, Temp1),
    append(Temp1, H3List, Temp2),
    append(Temp2, H4List, Temp3),
    append(Temp3, H5List, Temp4),
    append(Temp4, H6List, Temp5),
    append(Temp5, H7List, Temp6),
    append(Temp6, H8List, Temp7),
    append(Temp7, H9List, Temp8),
    append(Temp8, H10List, Temp9),
    append(Temp9, H11List, Temp10), 
    append(Temp10, H12List, Temp11), 
    append(Temp11, H13List, Temp12), 
    append(Temp12, H14List, Temp13), 
    append(Temp13, H15List, Temp14), 
    append(Temp14, H16List, Temp15),
    NovaLista = Temp15.

usingAllMovePossibilitiesAgressive(Player, Board, Line, DeltaLine, DeltaColumn, NovaLista):-
    
    /* check move possibilities vertically */
    calculatePossiblePlay(Player, Board, Line, DeltaLine, DeltaColumn, NovaLista).

calculatePossiblePlay(Player, Board, [H1|[H2|[H3|T]]], NewRow, NewCol, ArrayMove):-
    findall([H1, H2, H3, DLine, DColumn], 
                possibleMove(Player, 1, H1, Board, H2, H3, DLine, DColumn, NewRow, NewCol, BehindLine, BehindColumn, Piece1, Piece2), 
                List),
    ArrayMove = List.

append_all(_, [], []).

append_all(Pass, [Agress | Rest], [Final | FinalList]):-
    append(Pass, Agress, Final),
    append_all(Pass, Rest, FinalList).

trulyValidAgressiveMoves(_, _, _, _, _, [], []).

trulyValidAgressiveMoves(Player, Board, BoardNoBefore, DeltaLine, DeltaColumn, [PossMove | PossMovesAgress], [FinalMove | FinalMovesAgress]):-
    breakingElement(PossMove, BoardNo, OLine, OCol, DLine, DCol),
    calculateAgressivePlay(OLine, OCol, DLine, DCol, DeltaLine, DeltaColumn),
    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn),
    calculateBehindPiece(DLine, DCol, DeltaLine, DeltaColumn, BehindLine, BehindColumn),
    getPiece(BoardNo, Board, OLine, OCol, Piece1),
    getPiece(BoardNo, Board, DLine, DCol, Piece2),
    getIntermediatePiece(BoardNo, Board, OLine, OCol, IntermediateLine, IntermediateColumn, Piece3),
    getBehindPiece(BoardNo, Board, BehindLine, BehindColumn, Piece4),
    Piece1 is Player,
    Piece3 < 1,
    (Piece2 is 0;
     (Piece2 > 0,
      Piece2 =\= Player,
      Piece4 < 1)),
%    write('Possible Aggressive Move!'), nl,   
    setPiece(0, BoardNo, Board, OLine, OCol, Board2),
    setPiece(Player, BoardNo, Board2, DLine, DCol, Board3),
    onlySetBehindPiece(Player, Piece2, BoardNo, Board3, BehindLine, BehindColumn, NewBoard),
    FinalMove = PossMove,
    !,
    trulyValidAgressiveMoves(Player, Board, BoardNoBefore, DeltaLine, DeltaColumn, PossMovesAgress, FinalMovesAgress).

trulyValidAgressiveMoves(Player, Board, BoardNo, DeltaLine, DeltaColumn, [_ | PossMovesAgress], FinalMovesAgress):-
    trulyValidAgressiveMoves(Player, Board, BoardNo, DeltaLine, DeltaColumn, PossMovesAgress, FinalMovesAgress).

getAllAgressiveMoves(_, _, [], []).

getAllAgressiveMoves(Player, Board, [BeforeMove|BeforeList], [Move|FinalList]):-
    breakingElement(BeforeMove, BoardNo, OLine, OCol, DLine, DCol),
    DeltaLine is DLine-OLine,
    DeltaColumn is DCol-OCol,
    
    possibleDelta(DeltaLine, DeltaColumn),
    calculateIntermediatePiece(DeltaLine, DeltaColumn, IntermediateLine, IntermediateColumn),
%    write('After check move\n'),
    getPiece(BoardNo, Board, OLine, OCol, Piece1),
    getPiece(BoardNo, Board, DLine, DCol, Piece2),
    getIntermediatePiece(BoardNo, Board, OLine, OCol, IntermediateLine, IntermediateColumn, Piece3),
%    format("1 = ~d, 2 = ~d, 3 = ~d~n", [Piece1, Piece2, Piece3]),
    Piece1 is Player,
    Piece2 is 0,
    Piece3 < 1,
%    write('Possible Passive Move!'), nl,
    setPiece(Player, BoardNo, Board, DLine, DCol, Board2),
    setPiece(0, BoardNo, Board2, OLine, OCol, FollowingBoard),
%    displayGame(FollowingBoard, Player), nl,
%    write('After done moves\n'),
    valid_moves_agressive(Player, FollowingBoard, BoardNo, DeltaLine, DeltaColumn, MovesAgress),
    
    trulyValidAgressiveMoves(Player, FollowingBoard, BoardNo, DeltaLine, DeltaColumn, MovesAgress, FinalMovesAgress),
    
    append_all(BeforeMove, FinalMovesAgress, Move),
    
    !,    
    
    getAllAgressiveMoves(Player, Board, BeforeList, FinalList).

getAllAgressiveMoves(Player, Board, [_|BeforeList], FinalList):-
    getAllAgressiveMoves(Player, Board, BeforeList, FinalList).

flatenList([], []).

flatenList([Cur | TempListOfMoves], ListOfMoves):-
    flatenList(TempListOfMoves, List1),
    append(Cur, List1, ListOfMoves).
    
get_random_valid_move(Player, Board, Move):-
    valid_moves(Player, Board, ListOfMoves),
    length(ListOfMoves, Len),
    Length is Len + 1,
    random(1, Length, RandVal),
    nth1(RandVal, ListOfMoves, Move).

valid_moves(Player, Board, ListOfMoves) :-
    getAllPlayerPiecesPosition(Player, Board, ListOfPositions),
    write('All intial positions\n'),
    passiveMovesAvailable(Player, Board, ListOfPositions, ListOfMovesPassive),
    write('All passive positions\n'),
    getAllAgressiveMoves(Player, Board, ListOfMovesPassive, TempListOfMoves),
    write('Flaten positions\n'),
    flatenList(TempListOfMoves, ListOfMoves1),
    sort(ListOfMoves1, ListOfMoves).



valid_moves_agressive(Player, Board, PrevBoard, DeltaLine, DeltaColumn, ListOfMoves) :-
    getAllPlayerPiecesPositionAgressive(Player, Board, PrevBoard, ListOfPositions),
    agressiveMovesAvailable(Player, Board, DeltaLine, DeltaColumn, ListOfPositions, ListOfMoves).
