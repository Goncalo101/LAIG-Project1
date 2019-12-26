class MyPiece {

    constructor(scene, id, owner) {
        this.scene = scene;
        this.id = id;
        this.owner = owner;

        this.board = 0;
        this.column = 0;
        this.line = 0;

        this.sphere = new MySphere(this.scene, 64, 0.5, 10, 10);

        this.initTextures();
    }

    setPosition(board, line, column){
        this.board = board;
        this.line = line;
        this.column = column;
    }

    getPosition(){
        return {
            board: this.board,
            line: this.line,
            column: this.column
        };
    }


    initTextures() {

        this.texRope = new CGFtexture( this.scene, 'scenes/images/rope.jpg' )

    }

    display() { 

        this.scene.registerForPick(this.id, this.sphere);

        this.sphere.display();

    }
}