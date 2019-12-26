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
                [[29, 30, 31, 32], [0, 0, 0, 0], [0, 0, 0, 0], [25, 26, 27, 28]]
            ];

        this.currentMove = null;
        this.currentMoveTime = 0;

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

    update(delta){

        if (this.currentMove != null){
            this.currentMoveTime += delta;
            if (this.currentMoveTime >= 1000){
                this.endMovement();
            }
        }
    }

    endMovement(){
        if (this.currentMove != null){
            let ob = this.currentMove.fromPosition.board, ol = this.currentMove.fromPosition.line, oc = this.currentMove.fromPosition.column, 
            nb = this.currentMove.toPosition.board, nl = this.currentMove.toPosition.line, nc = this.currentMove.toPosition.column;
            this.board[ob][ol][oc] = 0;
            this.board[nb][nl][nc] = this.currentMove.piece.id;

            this.pieces[this.currentMove.piece.id].setPosition(nb, nl, nc);

            this.orchestrator.moves.push(this.currentMove);

            console.log(this.orchestrator.moves);
        }

        

        this.currentMove = null;
        this.currentMoveTime = 0;
    }

    makeMove(idPiece, idTile){

        this.endMovement();

        console.log("Making move");
        console.log("Piece: " + idPiece + "  Tile: " + idTile)
        let index = 65;
        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){
                    // if (this.board[b][l][c] == idPiece){
                    //     this.board[b][l][c] = 0;
                    //     console.log("Removing piece");
                    // }
                    
                    if (index++ == idTile) {
                        this.currentMoveTime = 0;
                        this.currentMove = new MyMove(this.scene, this.pieces[idPiece], this.pieces[idPiece].getPosition(),
                        {board: b, line: l, column: c});
                        
                    }
                }
            }
        }
        console.log(this.board);
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

        let idPieceOnMovement = -1;

        if (this.currentMove != null){
            idPieceOnMovement = this.currentMove.piece.id;
        }

        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){
                    let positions = this.b.getTranslationFromPosition(b+1, l+1, c+1);
                    if (this.board[b][l][c] != 0){
                        
                        this.scene.pushMatrix();

                        this.scene.translate(positions.x, positions.y + 0.5, positions.z);

                        if (this.board[b][l][c] != idPieceOnMovement)
                            this.pieces[this.board[b][l][c]].display();

                        this.scene.popMatrix();
                    }
                }
            }
        }

        if (this.currentMove != null){

            let ob = this.currentMove.fromPosition.board, ol = this.currentMove.fromPosition.line, oc = this.currentMove.fromPosition.column, 
            nb = this.currentMove.toPosition.board, nl = this.currentMove.toPosition.line, nc = this.currentMove.toPosition.column;

            this.scene.pushMatrix();

            var translation = vec3.create();

            let fromPosition = this.b.getTranslationFromPosition(ob+1, ol+1, oc+1);
            let toPosition = this.b.getTranslationFromPosition(nb+1, nl+1, nc+1);

            var from = vec3.fromValues(fromPosition.x, fromPosition.y, fromPosition.z)
            var to = vec3.fromValues(toPosition.x, toPosition.y, toPosition.z)

            vec3.lerp(translation, from, to, this.currentMoveTime/1000.0);

            this.scene.translate(translation[0], translation[1] + 0.5, translation[2]);
            
            this.pieces[this.currentMove.piece.id].display();

            this.scene.popMatrix();
        }        

        if (tex != null)
            tex.bind();
    }

    updateTexCoords(s_length, t_length) {

	}
}