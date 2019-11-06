/**
* MyCilinderNURBS creates a cylinder using NURBS
* @constructor
*/
class MyCylinderNURBS extends CGFobject {
    constructor(scene, radius_bottom, radius_top, height, slices, stacks) {
        super(scene);

        this.scene = scene;
        this.radius_bottom = radius_bottom;
        this.radius_top = radius_top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.cyl = new CGFnurbsSurface(8, // degree on U: 2 control vertexes U
            1, // degree on V: 2 control vertexes on V
           [	// U = 0
               [ // V = 0..1;
                    [-1.0*this.radius_bottom, 0.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [-1.0*this.radius_top, 0.0*this.radius_top, this.height, 1 ],
               ],
               // U = 1
               [ // V = 0..1;
                    [-1.0*this.radius_bottom, -1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [-1.0*this.radius_top, -1.0*this.radius_top, this.height, 0.707 ],
               ],
               // U = 2
               [ // V = 0..1;
                    [0.0*this.radius_bottom, -1.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [0.0*this.radius_top, -1.0*this.radius_top, this.height, 1 ],
               ],
            //    // U = 3
                [ // V = 0..1;
                    [1.0*this.radius_bottom, -1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [1.0*this.radius_top, -1.0*this.radius_top, this.height, 0.707 ],
                ],
               //    // U = 4
               [ // V = 0..1;
                [1.0*this.radius_bottom, 0.0*this.radius_bottom, 0.0*this.height, 1 ],
                [1.0*this.radius_top, 0.0*this.radius_top, this.height, 1 ],
                ],
                // U = 5
                [ // V = 0..1;
                    [1.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [1.0*this.radius_top, 1.0*this.radius_top, this.height, 0.707 ],
                ],
                //    // U = 4
               [ // V = 0..1;
                [0.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 1 ],
                [0.0*this.radius_top, 1.0*this.radius_top, this.height, 1 ],
                ],
                [ // V = 0..1;
                    [-1.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [-1.0*this.radius_top, 1.0*this.radius_top, this.height, 0.707 ],
                ],
                [ // V = 0..1;
                    [-1.0*this.radius_bottom, 0.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [-1.0*this.radius_top, 0.0*this.radius_top, this.height, 1 ],
                ],
           ]);


        this.cylObj = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.cyl); 

        this.initBuffers();

    }

    initBuffers(){
        this.cylObj.initBuffers();
    }

    display(){
        this.cylObj.display();
    }

    updateTexCoords(s_length, t_length) {
		// this.updateTexCoordsGLBuffers();
	}
}