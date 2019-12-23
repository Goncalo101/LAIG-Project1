class MyGameBoard {

    constructor(scene, x1, x2, y1, y2) {
        this.scene = scene;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;


        this.height = 0.5;

        this.side = 1.25;

        this.gap = 0.2;

        this.gapBoards = 2;


        this.b = new MyBoard(this.scene, this.height, this.side, this.gap, this.gapBoards);

        this.piece = new MySphere(this.scene, 64, 0.5, 10, 10);



        this.board = [
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],        
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]]
            ];
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

        for (let b = 0; b < 4; b++){
            for (let l = 0; l < 4; l++){
                for (let c = 0; c < 4; c++){
                    if (this.board[b][l][c] != 0){
                        let positions = this.b.getTranslationFromPosition(b+1, l+1, c+1);
                        this.scene.pushMatrix();

                        this.scene.translate(positions.x, positions.y + 0.5, positions.z);

                        this.piece.display();

                        this.scene.popMatrix();
                    }
                }
            }
        }

        if (tex != null)
            tex.bind();
    }

    updateTexCoords(s_length, t_length) {

	}
}