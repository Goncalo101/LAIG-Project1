/**
* MyCilinderNURBS creates a cylinder using NURBS
* @constructor
*/
class MyCylinderNURBS extends CGFobject {
    constructor(scene, radius_bottom, radius_top, height, slices, stacks) {
        super(scene);

        this.radius_bottom = radius_bottom;
        this.radius_top = radius_top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initSurface();
    }
    
    initSurface() {
        this.control_vertices = [
			[[1, 0, 0.0, 1], [1, 0, 1.0, 1],],
			[[1, 1.0, 0.0, 1 / (2*Math.SQRT2)], [1, 1.0, 1.0, 1 / (2*Math.SQRT2)],],
			// [[0, 1, 0.0, 1], [0, 1, 1.0, 1],],
			[[-1, 1, 0.0, 1 / (2*Math.SQRT2)], [-1, 1, 1.0, 1 / (2*Math.SQRT2)],],

			[[-1, 0.0, 0.0, 1], [-1, 0.0, 1.0, 1],],
			[[-1, -1, 0.0, 1 / (2*Math.SQRT2)], [-1, -1, 1.0, 1 / (2*Math.SQRT2)],],
			// [[0.0, -1.0, 0.0, 1], [0.0, -1.0, 1.0, 1],],
			[[1.0, -1.0, 0.0, 1 / (2*Math.SQRT2)], [1.0, -1.0, 1.0, 1 / (2*Math.SQRT2)],],
			[[1, 0, 0.0, 1], [1, 0, 1.0, 1],],
        ];
        
        this.cylinder_patch = new Patch(this.scene, 7, 2, 20, 20, this.control_vertices);
    }
}