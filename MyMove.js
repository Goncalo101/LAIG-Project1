class MyMove {

    constructor(scene, piecePassive, fromPositionPassive, toPositionPassive, pieceAgressive, fromPositionAgressive, toPositionAgressive, beforeBoard) {
        this.scene = scene;


        this.piecePassive = piecePassive;
        this.fromPositionPassive = fromPositionPassive;
        this.toPositionPassive = toPositionPassive;
        this.pieceAgressive = pieceAgressive;
        this.fromPositionAgressive = fromPositionAgressive;
        this.toPositionAgressive = toPositionAgressive;

        this.beforeBoard = beforeBoard;

        this.checkBehindPiece();
    }

    checkBehindPiece() {
        let fromPositionBehind = JSON.parse(JSON.stringify(this.toPositionAgressive));
        let toPositionBehind = JSON.parse(JSON.stringify(this.toPositionAgressive));
        let idPieceBehind = this.beforeBoard[this.toPositionAgressive.board][this.toPositionAgressive.line][this.toPositionAgressive.column];

        if (this.fromPositionAgressive.line < this.toPositionAgressive.line)
            toPositionBehind.line++;
        else if (this.fromPositionAgressive.line > this.toPositionAgressive.line)
            toPositionBehind.line--;

        if (this.fromPositionAgressive.column < this.toPositionAgressive.column)
            toPositionBehind.column++;
        else if (this.fromPositionAgressive.column > this.toPositionAgressive.column)
            toPositionBehind.column--;
    
        if (toPositionBehind.line < 0 || toPositionBehind.line >= 4 || toPositionBehind.column < 0 || toPositionBehind.column >= 4){
            toPositionBehind = this.getFreePositionAuxiliary(fromPositionBehind.board, this.pieceAgressive.owner ^ 1);
            console.log(toPositionBehind);
        }

        this.idPieceBehind = idPieceBehind;
        this.fromPositionBehind = fromPositionBehind;
        this.toPositionBehind = toPositionBehind;
    }

    getFreePositionAuxiliary(board, player){
        for (let i = 0; i < 4; i++){
            if (this.beforeBoard[board+4][i][player] == 0)
                return {board: board+4, line: i, column: player};
        }
    }

    display() { 

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.scene.registerForPick(id, this.tile);

        this.tile.display();

        this.scene.popMatrix();

    }
}