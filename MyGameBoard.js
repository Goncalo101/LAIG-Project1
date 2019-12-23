class MyGameBoard {

    constructor(scene, x1, x2, y1, y2) {
        this.scene = scene;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.b = new MyBoard(this.scene);



        this.board = [[
            [
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]]
            ],
            [
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
                [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]]
            ]
        ]]
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



        this.scene.activeTexture = tex;

        if (tex != null)
            tex.bind();
    }

    updateTexCoords(s_length, t_length) {

	}
}