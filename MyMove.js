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
    }

    display() { 

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.scene.registerForPick(id, this.tile);

        this.tile.display();

        this.scene.popMatrix();

    }
}