class Plane extends CGFobject {

    constructor(scene, divisions) {
        super(scene);

        this.divisions = divisions;
        this.scene = scene;

        this.plane = new CGFnurbsSurface(1, // degree on U: 2 control vertexes U
            1, // degree on V: 2 control vertexes on V
           [	// U = 0
               [ // V = 0..1;
                    [-0.5, 0.0, 0.5, 1 ],
                    [-0.5,  0.0, -0.5, 1 ]
                   
               ],
               // U = 1
               [ // V = 0..1
                    [ 0.5, 0.0, 0.5, 1 ],
                    [ 0.5,  0.0, -0.5, 1 ]							 
               ]
           ]);


        this.planeObj = new CGFnurbsObject(this.scene, this.divisions, this.divisions, this.plane); 

        this.initBuffers();
    }

    initBuffers(){
        this.planeObj.initBuffers();
    }

    display(){
        this.planeObj.display();
    }

}