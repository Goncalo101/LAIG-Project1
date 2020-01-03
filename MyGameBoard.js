class MyGameBoard {

    constructor(scene, orchestrator, x1, x2, y1, y2) {
        this.scene = scene;
        this.orchestrator = orchestrator;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;


        this.height = 0.5;

        this.side = 1.25;

        this.gap = 0.2;

        this.gapBoards = 2;


        this.b = new MyBoard(this.scene, this.height, this.side, this.gap, this.gapBoards);

        this.pieces = [];
        this.tiles = [];

        for (let i = 0; i <= 32; i++)
            this.pieces.push(new MyPiece(this.scene, i, Math.floor((i-1)/4)%2));

        this.board = [
                [[5, 6, 7, 8], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 3, 4]],
                [[13, 14, 15, 16], [0, 0, 0, 0], [0, 0, 0, 0], [9, 10, 11, 12]],        
                [[21, 22, 23, 24], [0, 0, 0, 0], [0, 0, 0, 0], [17, 18, 19, 20]],
                [[29, 30, 31, 32], [0, 0, 0, 0], [0, 0, 0, 0], [25, 26, 27, 28]],
                [[0, 0], [0, 0], [0, 0], [0, 0]],
                [[0, 0], [0, 0], [0, 0], [0, 0]],
                [[0, 0], [0, 0], [0, 0], [0, 0]],
                [[0, 0], [0, 0], [0, 0], [0, 0]],
            ];

        this.currentMove = null;
        this.currentMoveTime = 0;
        this.currentUndoMove = null;
        this.currentLimitTime = 20000;

        this.updatePositionPieces();
    }

    updatePositionPieces(){
        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){
                    if (this.board[b][l][c] != 0){
                        this.pieces[this.board[b][l][c]].setPosition(b, l, c);
                    }
                }
            }
        }
    }

    getNextMoveInformation(){

        this.orchestrator.computerMove = null;
        this.orchestrator.possibleMoves = [];
        this.currentLimitTime = 20000;

        this.orchestrator.prolog.requestWinner(this.board);
        this.orchestrator.prolog.requestComputerMove(this.orchestrator.currentPlayer, this.board);
        this.orchestrator.prolog.requestPossibleMoves(this.orchestrator.currentPlayer, this.board);

    }

    update(delta){

        if (delta > 2000)  // to not prejudice player on first display
            return;

        if (this.currentMove != null){
            this.currentMoveTime += delta;
            if (this.currentMoveTime >= 1000){
                this.endMovement();
            }
        } else if (this.currentUndoMove != null){
            this.currentMoveTime += delta;
            if (this.currentMoveTime >= 1000){
                this.endMovement();
            }
        } else if (this.orchestrator.xmlscene.selectedGameType == 2 || 
            (this.orchestrator.xmlscene.selectedGameType == 1 && this.orchestrator.currentPlayer == 1)) {
                if (this.orchestrator.computerMove != null)
                    this.makeMoveFromProlog(this.orchestrator.computerMove);
        } else {
            this.currentLimitTime -= delta;
            if (this.currentLimitTime < 0){
                this.orchestrator.changePlayer();
                this.getNextMoveInformation();
            }
            document.getElementById('player_time').innerHTML = (this.currentLimitTime/1000).toFixed(2);
        }
    }

    undoMove(){

        this.endMovement();

        if (this.orchestrator.moves.length > 0){
            this.currentUndoMove = this.orchestrator.moves[this.orchestrator.moves.length-1];
            this.currentMoveTime = 0;
        }

    }

    endMovement(){
        if (this.currentMove != null){
            let obpassive = this.currentMove.fromPositionPassive.board, olpassive = this.currentMove.fromPositionPassive.line, ocpassive = this.currentMove.fromPositionPassive.column, 
            nbpassive = this.currentMove.toPositionPassive.board, nlpassive = this.currentMove.toPositionPassive.line, ncpassive = this.currentMove.toPositionPassive.column;
            this.board[obpassive][olpassive][ocpassive] = 0;
            this.board[nbpassive][nlpassive][ncpassive] = this.currentMove.piecePassive.id;

            this.pieces[this.currentMove.piecePassive.id].setPosition(nbpassive, nlpassive, ncpassive);


            if (this.currentMove.pieceBehind.id != 0){
                let obbehind = this.currentMove.fromPositionBehind.board, olbehind = this.currentMove.fromPositionBehind.line, ocbehind = this.currentMove.fromPositionBehind.column, 
                nbbehind = this.currentMove.toPositionBehind.board, nlbehind = this.currentMove.toPositionBehind.line, ncbehind = this.currentMove.toPositionBehind.column;
                this.board[obbehind][olbehind][ocbehind] = 0;
                this.board[nbbehind][nlbehind][ncbehind] = this.currentMove.pieceBehind.id;

                this.pieces[this.currentMove.pieceBehind.id].setPosition(nbbehind, nlbehind, ncbehind);
            }


            let obagressive = this.currentMove.fromPositionAgressive.board, olagressive = this.currentMove.fromPositionAgressive.line, ocagressive = this.currentMove.fromPositionAgressive.column, 
            nbagressive = this.currentMove.toPositionAgressive.board, nlagressive = this.currentMove.toPositionAgressive.line, ncagressive = this.currentMove.toPositionAgressive.column;
            this.board[obagressive][olagressive][ocagressive] = 0;
            this.board[nbagressive][nlagressive][ncagressive] = this.currentMove.pieceAgressive.id;

            this.pieces[this.currentMove.pieceAgressive.id].setPosition(nbagressive, nlagressive, ncagressive);



            this.orchestrator.moves.push(this.currentMove);
            
            this.orchestrator.computerMove = null;
            this.orchestrator.possibleMoves = [];

            this.updatePointsPlayer();

            this.currentLimitTime = 20000;

            document.getElementById('player_time').innerHTML = (this.currentLimitTime/1000).toFixed(2);

            this.orchestrator.changePlayer();

            this.orchestrator.prolog.requestWinner(this.board);
            this.orchestrator.prolog.requestComputerMove(this.orchestrator.currentPlayer, this.board);
            this.orchestrator.prolog.requestPossibleMoves(this.orchestrator.currentPlayer, this.board);

        } else if (this.currentUndoMove != null){

            this.currentUndoMove.piecePassive.setPosition(this.currentUndoMove.fromPositionPassive.board, this.currentUndoMove.fromPositionPassive.line, this.currentUndoMove.fromPositionPassive.column);

            this.currentUndoMove.pieceAgressive.setPosition(this.currentUndoMove.fromPositionAgressive.board, this.currentUndoMove.fromPositionAgressive.line, this.currentUndoMove.fromPositionAgressive.column);

            if (this.currentUndoMove.pieceBehind.id != 0)
                this.currentUndoMove.pieceBehind.setPosition(this.currentUndoMove.fromPositionBehind.board, this.currentUndoMove.fromPositionBehind.line, this.currentUndoMove.fromPositionBehind.column);

            this.board = this.currentUndoMove.beforeBoard;

            this.orchestrator.moves.pop();

            this.orchestrator.computerMove = null;
            this.orchestrator.possibleMoves = [];

            this.updatePointsPlayer();

            this.currentLimitTime = 20000;

            document.getElementById('player_time').innerHTML = (this.currentLimitTime/1000).toFixed(2);

            this.orchestrator.changeToPlayer(this.currentUndoMove.piecePassive.owner);

            this.orchestrator.prolog.requestWinner(this.board);
            this.orchestrator.prolog.requestComputerMove(this.orchestrator.currentPlayer, this.board);
            this.orchestrator.prolog.requestPossibleMoves(this.orchestrator.currentPlayer, this.board);

        }

        this.currentUndoMove = null;
        this.currentMove = null;
        this.currentMoveTime = 0;
    }

    makeMoveFromProlog(ListMove) {
        let idPiecePassive, idPieceAgressive, idTilePassive, idTileAgressive;
        let index = 65;
        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){

                    if (b+1 == ListMove[0] && l+1 == ListMove[1] && c+1 == ListMove[2]){
                        if (this.board[b][l][c] == 0)
                            return;
                        idPiecePassive = this.board[b][l][c];
                    }

                    if (b+1 == ListMove[0] && l+1 == ListMove[3] && c+1 == ListMove[4]){
                        idTilePassive = index;
                    }

                    if (b+1 == ListMove[5] && l+1 == ListMove[6] && c+1 == ListMove[7]){
                        if (this.board[b][l][c] == 0)
                            return;
                        idPieceAgressive = this.board[b][l][c];
                    }

                    if (b+1 == ListMove[5] && l+1 == ListMove[8] && c+1 == ListMove[9]){
                        idTileAgressive = index;
                    }

                    index++;
                }
            }
        }

        this.makeMove(idPiecePassive, idTilePassive, idPieceAgressive, idTileAgressive);
    }

    makeMove(idPiecePassive, idTilePassive, idPieceAgressive, idTileAgressive){

        this.endMovement();

        console.log("Winner: " + this.orchestrator.winner);

        if (this.orchestrator.winner != 0)
            return;

        var toPositionPassive = null, toPositionAgressive = null;

        console.log("Making move");
        console.log("Piece 1: " + idPiecePassive + "  Tile 1: " + idTilePassive + "  Piece 2: " + idPieceAgressive + "  Tile 2: " + idTileAgressive);
        let index = 65;
        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){

                    if (index == idTilePassive){
                        toPositionPassive = {board: b, line: l, column: c};
                    }

                    if (index++ == idTileAgressive){
                        toPositionAgressive = {board: b, line: l, column: c};
                    }
                    
                    // if (index++ == idTile) {
                    //     this.currentMoveTime = 0;
                    //     var move = new MyMove(this.scene, this.pieces[idPiece], this.pieces[idPiece].getPosition(),
                    //     {board: b, line: l, column: c}, JSON.parse(JSON.stringify(this.board)));

                    //     if (this.checkMove(move)){
                    //         console.log("Valid move");
                    //         this.currentMove = move;
                    //     } else {
                    //         console.log("Invalid move");
                    //     }
                    //     // this.currentMove = new MyMove(this.scene, this.pieces[idPiece], this.pieces[idPiece].getPosition(),
                    //     // {board: b, line: l, column: c}, JSON.parse(JSON.stringify(this.board)));
                        
                    // }
                }
            }
        }

        if (toPositionPassive != null && toPositionAgressive != null){

            this.currentMoveTime = 0;
            var move = new MyMove(this.scene, this.pieces[idPiecePassive], this.pieces[idPiecePassive].getPosition(),
            toPositionPassive, this.pieces[idPieceAgressive], this.pieces[idPieceAgressive].getPosition(),
            toPositionAgressive, JSON.parse(JSON.stringify(this.board)));

            if (this.checkMove(move)){
                console.log("Valid move");
                move.pieceBehind = this.pieces[move.idPieceBehind];
                console.log(move);
                this.currentMove = move;
            } else {
                console.log("Invalid move");
            }

        }
        
    }

    checkMove(Move){

        console.log(Move);

        console.log("Length Moves: " + this.orchestrator.possibleMoves.length);

        for (let i = 0; i < this.orchestrator.possibleMoves.length; i++){
            let curMove = this.orchestrator.possibleMoves[i];
            if (curMove[0] != Move.fromPositionPassive.board + 1)
                continue;

            if (curMove[0] != Move.toPositionPassive.board + 1)
                continue;

            if (curMove[1] != Move.fromPositionPassive.line + 1)
                continue;

            if (curMove[2] != Move.fromPositionPassive.column + 1)
                continue;
                
            if (curMove[3] != Move.toPositionPassive.line + 1)
                continue;

            if (curMove[4] != Move.toPositionPassive.column + 1)
                continue;

            if (curMove[5] != Move.fromPositionAgressive.board + 1)
                continue;

            if (curMove[5] != Move.toPositionAgressive.board + 1)
                continue;

            if (curMove[6] != Move.fromPositionAgressive.line + 1)
                continue;

            if (curMove[7] != Move.fromPositionAgressive.column + 1)
                continue;
                
            if (curMove[8] != Move.toPositionAgressive.line + 1)
                continue;

            if (curMove[9] != Move.toPositionAgressive.column + 1)
                continue;

            return true;

        }

        return false;
    }

    addPiece(piece) { }
    removePiece(piece) { }
    getPiece(tile) { }
    getTile(piece) { }
    getTileByCoordinate(coordinate) { }
    movePiece(piece) { }
    display() {
        
        let tex = this.scene.activeTexture;

        this.b.display();

        let idPieceOnMovementPassive = -1, idPieceOnMovementAgressive = -1, idPieceOnMovementBehind = -1;

        if (this.currentMove != null){
            idPieceOnMovementPassive = this.currentMove.piecePassive.id;
            idPieceOnMovementAgressive = this.currentMove.pieceAgressive.id;
            idPieceOnMovementBehind = this.currentMove.pieceBehind.id;

        } else if (this.currentUndoMove != null){
            idPieceOnMovementPassive = this.currentUndoMove.piecePassive.id;
            idPieceOnMovementAgressive = this.currentUndoMove.pieceAgressive.id;
            idPieceOnMovementBehind = this.currentUndoMove.pieceBehind.id;
        }

        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){
                    let positions = this.b.getTranslationFromPosition(b+1, l+1, c+1);
                    if (this.board[b][l][c] != 0){
                        
                        this.scene.pushMatrix();

                        this.scene.translate(positions.x, positions.y + 0.5, positions.z);

                        if (this.board[b][l][c] != idPieceOnMovementPassive && this.board[b][l][c] != idPieceOnMovementAgressive && this.board[b][l][c] != idPieceOnMovementBehind)
                            this.pieces[this.board[b][l][c]].display();

                        this.scene.popMatrix();
                    }
                }
            }
        }

        for (let b = 4; b < 8; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 2; c++){
                    let positions = this.b.getTranslationFromPosition(b+1, l+1, c+1);
                    if (this.board[b][l][c] != 0){
                        
                        this.scene.pushMatrix();

                        this.scene.translate(positions.x, positions.y + 0.5, positions.z);

                        if (this.board[b][l][c] != idPieceOnMovementPassive && this.board[b][l][c] != idPieceOnMovementAgressive && this.board[b][l][c] != idPieceOnMovementBehind)
                            this.pieces[this.board[b][l][c]].display();

                        this.scene.popMatrix();
                    }
                }
            }
        }

        this.drawCurrentMovement();

        if (tex != null)
            tex.bind();
    }

    updateTexCoords(s_length, t_length) {

    }
    
    drawCurrentMovement(){
        if (this.currentMove != null){

            let obpassive = this.currentMove.fromPositionPassive.board, olpassive = this.currentMove.fromPositionPassive.line, ocpassive = this.currentMove.fromPositionPassive.column, 
            nbpassive = this.currentMove.toPositionPassive.board, nlpassive = this.currentMove.toPositionPassive.line, ncpassive = this.currentMove.toPositionPassive.column;

            this.scene.pushMatrix();

            var translationpassive = vec3.create();

            let fromPositionpassive = this.b.getTranslationFromPosition(obpassive+1, olpassive+1, ocpassive+1);
            let toPositionpassive = this.b.getTranslationFromPosition(nbpassive+1, nlpassive+1, ncpassive+1);

            var frompassive = vec3.fromValues(fromPositionpassive.x, fromPositionpassive.y, fromPositionpassive.z)
            var topassive = vec3.fromValues(toPositionpassive.x, toPositionpassive.y, toPositionpassive.z)

            vec3.lerp(translationpassive, frompassive, topassive, this.currentMoveTime/1000.0);

            this.scene.translate(translationpassive[0], translationpassive[1] + 0.5, translationpassive[2]);
            
            this.pieces[this.currentMove.piecePassive.id].display();

            this.scene.popMatrix();

            let obagressive = this.currentMove.fromPositionAgressive.board, olagressive = this.currentMove.fromPositionAgressive.line, ocagressive = this.currentMove.fromPositionAgressive.column, 
            nbagressive = this.currentMove.toPositionAgressive.board, nlagressive = this.currentMove.toPositionAgressive.line, ncagressive = this.currentMove.toPositionAgressive.column;

            this.scene.pushMatrix();

            var translationagressive = vec3.create();

            let fromPositionagressive = this.b.getTranslationFromPosition(obagressive+1, olagressive+1, ocagressive+1);
            let toPositionagressive = this.b.getTranslationFromPosition(nbagressive+1, nlagressive+1, ncagressive+1);

            var fromagressive = vec3.fromValues(fromPositionagressive.x, fromPositionagressive.y, fromPositionagressive.z)
            var toagressive = vec3.fromValues(toPositionagressive.x, toPositionagressive.y, toPositionagressive.z)

            vec3.lerp(translationagressive, fromagressive, toagressive, this.currentMoveTime/1000.0);

            this.scene.translate(translationagressive[0], translationagressive[1] + 0.5, translationagressive[2]);
            
            this.pieces[this.currentMove.pieceAgressive.id].display();

            this.scene.popMatrix();


            if (this.currentMove.pieceBehind.id != 0){
                let obbehind = this.currentMove.fromPositionBehind.board, olbehind = this.currentMove.fromPositionBehind.line, ocbehind = this.currentMove.fromPositionBehind.column, 
                nbbehind = this.currentMove.toPositionBehind.board, nlbehind = this.currentMove.toPositionBehind.line, ncbehind = this.currentMove.toPositionBehind.column;

                this.scene.pushMatrix();

                var translationbehind = vec3.create();

                let fromPositionbehind = this.b.getTranslationFromPosition(obbehind+1, olbehind+1, ocbehind+1);
                let toPositionbehind = this.b.getTranslationFromPosition(nbbehind+1, nlbehind+1, ncbehind+1);

                var frombehind = vec3.fromValues(fromPositionbehind.x, fromPositionbehind.y, fromPositionbehind.z)
                var tobehind = vec3.fromValues(toPositionbehind.x, toPositionbehind.y, toPositionbehind.z)

                vec3.lerp(translationbehind, frombehind, tobehind, this.currentMoveTime/1000.0);

                this.scene.translate(translationbehind[0], translationbehind[1] + 0.5, translationbehind[2]);
                
                this.pieces[this.currentMove.pieceBehind.id].display();

                this.scene.popMatrix();

            }

        } else if (this.currentUndoMove != null){

            let obpassive = this.currentUndoMove.fromPositionPassive.board, olpassive = this.currentUndoMove.fromPositionPassive.line, ocpassive = this.currentUndoMove.fromPositionPassive.column, 
            nbpassive = this.currentUndoMove.toPositionPassive.board, nlpassive = this.currentUndoMove.toPositionPassive.line, ncpassive = this.currentUndoMove.toPositionPassive.column;

            this.scene.pushMatrix();

            var translationpassive = vec3.create();

            let fromPositionpassive = this.b.getTranslationFromPosition(obpassive+1, olpassive+1, ocpassive+1);
            let toPositionpassive = this.b.getTranslationFromPosition(nbpassive+1, nlpassive+1, ncpassive+1);

            var topassive = vec3.fromValues(fromPositionpassive.x, fromPositionpassive.y, fromPositionpassive.z)
            var frompassive = vec3.fromValues(toPositionpassive.x, toPositionpassive.y, toPositionpassive.z)

            vec3.lerp(translationpassive, frompassive, topassive, this.currentMoveTime/1000.0);

            this.scene.translate(translationpassive[0], translationpassive[1] + 0.5, translationpassive[2]);
            
            this.pieces[this.currentUndoMove.piecePassive.id].display();

            this.scene.popMatrix();

            let obagressive = this.currentUndoMove.fromPositionAgressive.board, olagressive = this.currentUndoMove.fromPositionAgressive.line, ocagressive = this.currentUndoMove.fromPositionAgressive.column, 
            nbagressive = this.currentUndoMove.toPositionAgressive.board, nlagressive = this.currentUndoMove.toPositionAgressive.line, ncagressive = this.currentUndoMove.toPositionAgressive.column;

            this.scene.pushMatrix();

            var translationagressive = vec3.create();

            let fromPositionagressive = this.b.getTranslationFromPosition(obagressive+1, olagressive+1, ocagressive+1);
            let toPositionagressive = this.b.getTranslationFromPosition(nbagressive+1, nlagressive+1, ncagressive+1);

            var toagressive = vec3.fromValues(fromPositionagressive.x, fromPositionagressive.y, fromPositionagressive.z)
            var fromagressive = vec3.fromValues(toPositionagressive.x, toPositionagressive.y, toPositionagressive.z)

            vec3.lerp(translationagressive, fromagressive, toagressive, this.currentMoveTime/1000.0);

            this.scene.translate(translationagressive[0], translationagressive[1] + 0.5, translationagressive[2]);
            
            this.pieces[this.currentUndoMove.pieceAgressive.id].display();

            this.scene.popMatrix();


            if (this.currentUndoMove.pieceBehind.id != 0) {
                let obbehind = this.currentUndoMove.fromPositionBehind.board, olbehind = this.currentUndoMove.fromPositionBehind.line, ocbehind = this.currentUndoMove.fromPositionBehind.column, 
                nbbehind = this.currentUndoMove.toPositionBehind.board, nlbehind = this.currentUndoMove.toPositionBehind.line, ncbehind = this.currentUndoMove.toPositionBehind.column;

                this.scene.pushMatrix();

                var translationbehind = vec3.create();

                let fromPositionbehind = this.b.getTranslationFromPosition(obbehind+1, olbehind+1, ocbehind+1);
                let toPositionbehind = this.b.getTranslationFromPosition(nbbehind+1, nlbehind+1, ncbehind+1);

                var tobehind = vec3.fromValues(fromPositionbehind.x, fromPositionbehind.y, fromPositionbehind.z)
                var frombehind = vec3.fromValues(toPositionbehind.x, toPositionbehind.y, toPositionbehind.z)

                vec3.lerp(translationbehind, frombehind, tobehind, this.currentMoveTime/1000.0);

                this.scene.translate(translationbehind[0], translationbehind[1] + 0.5, translationbehind[2]);
                
                this.pieces[this.currentUndoMove.pieceBehind.id].display();

                this.scene.popMatrix();
            }
        }   
    }

    updatePointsPlayer(){

        let minBlack = 4, minWhite = 4;

        for (let b = 0; b < 4; b++){
            let curBlack = 0, curWhite = 0;
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){
                    if (this.board[b][l][c] != 0){
                        
                        if (this.pieces[this.board[b][l][c]].owner == 0)
                            curBlack++;
                        else 
                            curWhite++;
                    }
                }
            }
            minBlack = Math.min(minBlack, curBlack);
            minWhite = Math.min(minWhite, curWhite);
        }

        document.getElementById('points_black').innerHTML = minBlack;
        document.getElementById('points_white').innerHTML = minWhite;

    }
}