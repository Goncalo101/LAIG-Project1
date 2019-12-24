class MyMove {

    constructor(scene, piece, fromPosition, toPosition) {
        this.scene = scene;

        this.piece = piece;
        this.fromPosition = fromPosition;
        this.toPosition = toPosition;

    }

    display() { 

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.scene.registerForPick(id, this.tile);

        this.tile.display();

        this.scene.popMatrix();

    }
}