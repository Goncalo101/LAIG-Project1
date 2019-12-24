class MyPiece {

    constructor(scene, id, owner) {
        this.scene = scene;
        this.id = id;
        this.owner = owner;

        this.sphere = new MySphere(this.scene, 64, 0.5, 10, 10);

        this.initTextures();
    }


    initTextures() {

        this.texRope = new CGFtexture( this.scene, 'scenes/images/rope.jpg' )

    }

    display() { 

        this.sphere.display();

    }
}