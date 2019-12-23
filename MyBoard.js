class MyBoard {

    constructor(scene, height, sideCubes, gapCubes, gapBoards) {
        this.scene = scene;

        this.rectLight = new MyRectangle(this.scene, 64, 0, 1, 0, 1);

        this.height = height;

        this.side = sideCubes;

        this.gap = gapCubes;

        this.gapBoards = gapBoards;

        this.sizeBoard = this.side*4+this.gap*5;

        this.sphere = new MySphere(this.scene, 64, 0.5, 10, 10);

        this.cylinder = new MyCylinderNURBS(this.scene, 0.5, 0.5, this.sizeBoard*2+this.gapBoards-1, 20, 10);

        this.initTextures();
    }

    getTranslationFromPosition(board, line, column){
        let x = 0, y = this.height, z = 0;

        if (board % 2 == 0)
            x += (this.sizeBoard+this.gapBoards)/2;
        else 
            x -= (this.sizeBoard+this.gapBoards)/2;

        if (board <= 2)
            z -= (this.sizeBoard+this.gapBoards)/2;
        else 
            z += (this.sizeBoard+this.gapBoards)/2;

        if (column <= 2)
            x -= (this.gap+this.side)/2 + (this.gap+this.side)*(2-column);
        else 
            x += (this.gap+this.side)/2 + (this.gap+this.side)*(column-3);

        if (line <= 2)
            z -= (this.gap+this.side)/2 + (this.gap+this.side)*(2-line);
        else 
            z += (this.gap+this.side)/2 + (this.gap+this.side)*(line-3);

        
        return {x: x, y:y, z:z};        
    }

    initTextures() {

        this.texWoodLight = new CGFtexture( this.scene, 'scenes/images/wood_light.jpg' )
        this.texWoodDark = new CGFtexture( this.scene, 'scenes/images/wood_dark.jpg' )
        this.texRope = new CGFtexture( this.scene, 'scenes/images/rope.jpg' )

    }

    display() { 

        this.scene.pushMatrix();

        this.scene.translate(-(this.sizeBoard+this.gapBoards)/2, 0, -(this.sizeBoard+this.gapBoards)/2);

        for (let i = 0; i < 2; i++){

            for (let j = 0; j < 2; j++){

                this.scene.pushMatrix();

                this.scene.translate((this.sizeBoard+this.gapBoards)*j, 0, (this.sizeBoard+this.gapBoards)*i);

                if (j == 0){
                    this.texWoodDark.bind();
                } else {
                    this.texWoodLight.bind();
                }

                this.displayOneBoard();

                this.scene.popMatrix();


            }

        }

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.scene.translate(0, 0, -this.sizeBoard-this.gapBoards/2+0.5);

        this.texRope.bind();

        this.cylinder.display();

        this.sphere.display();

        this.scene.translate(0, 0, 2*this.sizeBoard+this.gapBoards-1);

        this.sphere.display();

        this.scene.popMatrix();

    }

    displayOneBoard(){

        this.scene.pushMatrix();

        this.scene.translate(-1.5*this.side-1.5*this.gap, 0, -1.5*this.side-1.5*this.gap);


        for (let i = 0; i < 4; i++){

            for (let j = 0; j < 4; j++){

                this.scene.pushMatrix();

                this.scene.translate((this.side+this.gap)*j, 0, (this.side+this.gap)*i);

                this.displayOneCube();

                this.scene.popMatrix();

            }

        }

            this.scene.pushMatrix();  

                this.scene.translate(-this.side/2-this.gap,0,3.5*this.side+4*this.gap);  //3.5*this.side+this.gap

                this.scene.scale(4*this.side+5*this.gap, 1, 4*this.side+5*this.gap);

                this.scene.rotate(-Math.PI/2, 1, 0, 0);

                this.rectLight.display();

            this.scene.popMatrix();

        this.scene.popMatrix();
    }

    displayOneCube(){

        this.scene.pushMatrix();

            this.scene.translate(-this.side/2, 0, this.side/2);

            this.scene.scale(this.side, this.height, this.side);

            this.scene.pushMatrix();        

                this.rectLight.display();

                this.scene.translate(0,0,-1);

                this.scene.rotate(-Math.PI/2, 0,1,0);

                this.rectLight.display();

                this.scene.translate(0,0,-1);

                this.scene.rotate(-Math.PI/2, 0,1,0);

                this.rectLight.display();

                this.scene.translate(0,0,-1);

                this.scene.rotate(-Math.PI/2, 0,1,0);

                this.rectLight.display();

            this.scene.popMatrix();

            this.scene.pushMatrix();  

                this.scene.translate(0,1,0);

                this.scene.rotate(-Math.PI/2, 1, 0, 0);

                this.rectLight.display();

            this.scene.popMatrix();

        this.scene.popMatrix();

    }
}