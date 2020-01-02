initialMenu:-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|     ______  _             _                         |'),nl,
    write('|    |  ____|| |           | |                        |'),nl,
    write('|    | |____ | |___  _____ | |___  _   _              |'),nl,
    write('|    |_____ ||  _  ||  _  ||  _  || | | |             |'),nl,
    write('|     ____| || | | || |_| || |_| || |_| |             |'),nl,
    write('|    |______||_| |_||_____||_____||_____|             |'),nl,
    write('|                                                     |'),nl,
    write('|                                                     |'),nl,
    write('|              Press Any Key to Continue              |'),nl,
    write('|_____________________________________________________|'),nl,nl.

startMenu:-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                        MENU                         |'),nl,
    write('|                                                     |'),nl,
    write('|    (1) Play                                         |'),nl,
    write('|                                                     |'),nl,
    write('|    (2) Rules and Information                        |'),nl,
    write('|                                                     |'),nl,
    write('|    (3) Credits                                      |'),nl,
    write('|                                                     |'),nl,
    write('|    (4) Exit                                         |'),nl,
    write('|_____________________________________________________|'),nl,nl.

infoMenu:-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                     INFORMATION                     |'),nl,
    write('|                                                     |'),nl,
    write('|    Shobu is an abstract strategy game for two       |'),nl,
    write('|    players. The game features 4 square boards       |'),nl,
    write('|    with dimension of 4x4 and 16 pieces for each     |'),nl,
    write('|    player.                                          |'),nl,
    write('|                                                     |'),nl,
    write('|                                                     |'),nl,
    write('|                                (1) Rules (0) Back   |'),nl,
    write('|_____________________________________________________|'),nl,nl.

rulesMenu1:-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                        RULES                        |'),nl,
    write('|                                                     |'),nl,
    write('|    Each player has 4 stone in 4 diferent boards.    |'),nl,
    write('|    As a player, you win when your opponent lose     |'),nl,
    write('|    all his pieces from one board. In each play,     |'),nl,
    write('|    you need to make a passive play, without taking  |'),nl,
    write('|    out any of your opponent pieces in any board,    |'),nl,
    write('|    and an agressive play, where you could attack    |'),nl,
    write('|                       (1) Info (2) Page2 (0) Back   |'),nl,
    write('|_____________________________________________________|'),nl,nl.

rulesMenu2:-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                        RULES                        |'),nl,
    write('|                                                     |'),nl,
    write('|    your opponent. To move one piece from him, you   |'),nl,
    write('|    have to move your piece against his piece. You   |'),nl,
    write('|    can move your piece horizontal, vertical, or     |'),nl,
    write('|    diagonally, one or two houses.                   |'),nl,
    write('|    IMPORTANT: Your agressive play must be equal to  |'),nl,
    write('|    your passive play!                               |'),nl,
    write('|                               (1) Page1  (0) Back   |'),nl,
    write('|_____________________________________________________|'),nl,nl.

playMenu:-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                        PLAY                         |'),nl,
    write('|                                                     |'),nl,
    write('|    (1) Player vs Player                             |'),nl,
    write('|                                                     |'),nl,
    write('|    (2) Player vs CPU                                |'),nl,
    write('|                                                     |'),nl,
    write('|    (3) CPU vs Player                                |'),nl,
    write('|                                                     |'),nl,
    write('|    (4) CPU vs CPU                                   |'),nl,
    write('|_____________________________________________________|'),nl,nl.

credits :-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                       CREDITS                       |'),nl,
    write('|                                                     |'),nl,
    write('|    Game Made By:                                    |'),nl,
    write('|          Goncalo Oliveira                           |'),nl,
    write('|          Miguel Simoes                              |'),nl,
    write('|                                                     |'),nl,
    write('|    Curricular Unit:                                 |'),nl,
    write('|          Programacao em Logica, MIEIC, FEUP         |'),nl,
    write('|                                                     |'),nl,
    write('|_____________________________________________________|'),nl,nl.

endMenu :-
    clearConsole,
    write(' _____________________________________________________ '),nl,
    write('|                            2019, PLog Trademark Inc |'),nl,
    write('|                                                     |'),nl,
    write('|                        MENU                         |'),nl,
    write('|                                                     |'),nl,
    write('|    (1) Restart                                      |'),nl,
    write('|                                                     |'),nl,
    write('|    (2) Back to Main Menu                            |'),nl,
    write('|                                                     |'),nl,
    write('|    (3) Exit                                         |'),nl,
    write('|                                                     |'),nl,
    write('|                                                     |'),nl,
    write('|_____________________________________________________|'),nl,nl.
                                 
getAnyKey(Key):-
    get_code(Key), nl.

clearConsole:-
    write('\e[H\e[2J'), nl.

playMenuHandler:-
    playMenu,
    getAnyKey(Key),
    read_line(_),
    (Key is 49 -> start(1);
     Key is 50 -> start(2);
     Key is 51 -> start(3);
     Key is 52 -> start(4)), nl.

infoMenuHandler:-
    repeat,
    infoMenu,
    getAnyKey(Key),
    (Key is 49 -> rulesMenu1Handler;
     Key is 48 -> startMenuHandler).

rulesMenu1Handler:-
    repeat,
    rulesMenu1,
    getAnyKey(Key),
    (Key is 50 -> rulesMenu2Handler;
     Key is 48 -> startMenuHandler;
     Key is 49 -> infoMenuHandler).

rulesMenu2Handler:-
    repeat,
    rulesMenu2,
    getAnyKey(Key),
    (Key is 49 -> rulesMenu1;
     Key is 48 -> startMenuHandler).

creditsMenuHandler:-
    credits,
    getAnyKey(Key),
    Key > -1,
    startMenuHandler.

startMenuHandler :-
    repeat,
    startMenu,
    getAnyKey(Key),
    read_line(_),
    (Key is 49 -> playMenuHandler;
     Key is 50 -> infoMenuHandler;
     Key is 51 -> creditsMenuHandler;
     Key is 52 -> halt).

initialMenuHandler :-
    initialMenu,
    getAnyKey(Key),
    Key > -1,
    startMenuHandler.

endMenuHandler :-
    endMenu,
    getAnyKey(Key),
    (Key is 49 -> playMenuHandler;
     Key is 50 -> startMenuHandler;
     Key is 51 -> halt).