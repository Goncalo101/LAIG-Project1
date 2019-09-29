/**
* MyCilinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, radius_bottom, radius_top, height, slices, stacks) {
        super(scene);

        this.radius_bottom = radius_bottom;
        this.radius_top = radius_top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var slice_indices = [];
        
        var alphaAng = 2 * Math.PI / this.slices;
        var stack_height = this.height / this.stacks;
        var radius_variation = (this.radius_top - this.radius_bottom) / this.stacks;

        for (var current_height = 0, index = 0, radius = this.radius_bottom; current_height <= this.height; current_height += stack_height, radius += radius_variation) {
            console.log("radius: " + radius);
            for (var current_angle = 0; current_angle < 2 * Math.PI; current_angle += alphaAng) {
                var x_coord = radius * Math.cos(current_angle);
                var y_coord = radius * Math.sin(current_angle);
                var z_coord = current_height;

                this.vertices.push(x_coord, y_coord, z_coord);
                this.normals.push(x_coord, y_coord, 0);
            }

            var temp = [];
            for (var i = 0; i < this.slices; i++) {
                temp.push(index++);

                this.texCoords.push((1 / this.slices) * i, 1,
                    (1 / this.slices) * i, 0,
                    (1 / this.slices) * (i + 1), 0,
                    (1 / this.slices) * (i + 1), 1);
            }

            slice_indices.push(temp);
        }

        for (var stack = 0; stack < this.stacks; stack++) {
            for (var i = 0; i < this.slices; i++) {
                this.indices.push(slice_indices[stack][i], slice_indices[stack][i + 1], slice_indices[stack + 1][i]);
                this.indices.push(slice_indices[stack][i + 1], slice_indices[stack + 1][i + 1], slice_indices[stack + 1][i]);
            }

            this.indices.push(slice_indices[stack][this.slices - 1], slice_indices[stack][0], slice_indices[stack + 1][this.slices - 1]);
            this.indices.push(slice_indices[stack + 1][this.slices - 1], slice_indices[stack][0], slice_indices[stack + 1][0]);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();
    }
}


