class MyGameBoard {
    constructor() {
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
    display() { }
}