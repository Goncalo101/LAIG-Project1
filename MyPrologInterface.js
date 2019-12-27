class MyPrologInterface {

    constructor(port, orchestrator){
        this.port = port;
        this.myOrchestrator = orchestrator;
    }


    sendRequest(requestString){

        // let requestString = 'valid_moves(1,[[[[2,2,2,2],[0,0,0,0],[0,0,0,0],[1,1,1,1]],[[2,2,2,2],[0,0,0,0],[0,0,0,0],[1,1,1,1]]],[[[2,2,2,2],[0,0,0,0],[0,0,0,0],[1,1,1,1]],[[2,2,2,2],[0,0,0,0],[0,0,0,0],[1,1,1,1]]]])'; 
        let requestProlog = new XMLHttpRequest();

        requestProlog.orch = this;

        requestProlog.addEventListener("load", this.parseStartPrologReply); 
        requestProlog.addEventListener("error",this.startPrologGameError);

        requestProlog.open('GET', 'http://localhost:'+this.port+'/'+requestString, true); 
        requestProlog.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8"); 
        requestProlog.send();
    }

    requestPossibleMoves(Player, Board){
        let requestString = 'valid_moves(' + (Player+1) + ',' +  this.convertBoardToProlog(Board) + ')';

        console.log(requestString);

        this.sendRequest(requestString);



    }

    convertBoardToProlog(Board){
        let responseBoard = [[[],[]],[[],[]]];
        let boardString = "[";
        for (let i = 0; i < 2; i++){
            boardString += "[";
            for (let j = 0; j < 2; j++){
                boardString += "[";
                let n = i*2+j;
                // let line = Board[n];
                // responseBoard[i][j].push(...line);
                for (let y = 0; y < 4; y++){
                    boardString += "[";
                    let line = [];
                    for (let x = 0; x < 4; x++){
                        if (Board[n][y][x] == 0)
                            line.push(0);
                        else 
                            line.push(Math.floor((Board[n][y][x]-1)/4)%2+1);
                    }
                    responseBoard[i][j].push(line);
                    boardString += line.toString();
                    boardString += "]";
                    if (y != 3)
                        boardString += ",";
                }

                boardString += "]";
                if (j != 1)
                boardString += ",";
            }
            boardString += "]";
            if (i != 1)
                boardString += ",";
        }
        boardString += "]";

        return boardString;
    }

    parseStartPrologReply(){
        console.log('Good Parse');

        if (this.status === 400) { 
            console.log("ERROR"); 
            return;
        }

        // let responseArray = textStringToArray(this.responseText,true);

        console.log(JSON.parse(this.responseText));

        console.log(this);

        this.orch.possibleMoves = JSON.parse(this.responseText);
        
    }

    startPrologGameError(){
        console.log('Bad Parse');
    }
}