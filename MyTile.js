class MyTile {

    constructor(scene, id, board, line, column) {
        this.scene = scene;
        this.id = id;

        this.board = board;
        this.line = line;
        this.column = column;

        this.tile = new MyRectangle(this.scene, 64, -0.5, 0.5, -0.5, 0.5)

        this.initTextures();
    }


    initTextures() {

        this.texRope = new CGFtexture( this.scene, 'scenes/images/wood_light.jpg' )

    }

    display() { 

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.scene.registerForPick(id, this.tile);

        this.tile.display();

        this.scene.popMatrix();

    }
}