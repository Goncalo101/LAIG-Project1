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

        this.cyl1 = new CGFnurbsSurface(2, // degree on U: 2 control vertexes U
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
            ]);

        this.cyl2 = new CGFnurbsSurface(2, // degree on U: 2 control vertexes U
            1, // degree on V: 2 control vertexes on V
            [	// U = 0
                [ // V = 0..1;
                    [0.0*this.radius_bottom, -1.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [0.0*this.radius_top, -1.0*this.radius_top, this.height, 1 ],
                ],
                // U = 1
                [ // V = 0..1;
                    [1.0*this.radius_bottom, -1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [1.0*this.radius_top, -1.0*this.radius_top, this.height, 0.707 ],
                ],
                // U = 2
                [ // V = 0..1;
                    [1.0*this.radius_bottom, 0.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [1.0*this.radius_top, 0.0*this.radius_top, this.height, 1 ],
                ],
            ]);

        this.cyl3 = new CGFnurbsSurface(2, // degree on U: 2 control vertexes U
            1, // degree on V: 2 control vertexes on V
            [	// U = 0
                [ // V = 0..1;
                    [1.0*this.radius_bottom, 0.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [1.0*this.radius_top, 0.0*this.radius_top, this.height, 1 ],
                ],
                // U = 1
                [ // V = 0..1;
                    [1.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [1.0*this.radius_top, 1.0*this.radius_top, this.height, 0.707 ],
                ],
                // U = 2
                [ // V = 0..1;
                    [0.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [0.0*this.radius_top, 1.0*this.radius_top, this.height, 1 ],
                ],
            ]);

        this.cyl4 = new CGFnurbsSurface(2, // degree on U: 2 control vertexes U
            1, // degree on V: 2 control vertexes on V
            [	// U = 0
                [ // V = 0..1;
                    [0.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [0.0*this.radius_top, 1.0*this.radius_top, this.height, 1 ],
                ],
                // U = 1
                [ // V = 0..1;
                    [-1.0*this.radius_bottom, 1.0*this.radius_bottom, 0.0*this.height, 0.707 ],
                    [-1.0*this.radius_top, 1.0*this.radius_top, this.height, 0.707 ],
                ],
                // U = 2
                [ // V = 0..1;
                    [-1.0*this.radius_bottom, 0.0*this.radius_bottom, 0.0*this.height, 1 ],
                    [-1.0*this.radius_top, 0.0*this.radius_top, this.height, 1 ],
                ],
            ]);


        this.cylObj1 = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.cyl1); 
        this.cylObj2 = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.cyl2); 
        this.cylObj3 = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.cyl3); 
        this.cylObj4 = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.cyl4); 

        this.initBuffers();

    }

    initBuffers(){
        this.cylObj1.initBuffers();
        this.cylObj2.initBuffers();
        this.cylObj3.initBuffers();
        this.cylObj4.initBuffers();
    }

    display(){
        this.cylObj1.display();
        this.cylObj2.display();
        this.cylObj3.display();
        this.cylObj4.display();
    }

    updateTexCoords(s_length, t_length) {
		// this.updateTexCoordsGLBuffers();
	}
}