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
        var delta_height = this.height / this.stacks;
        var delta_radius = (this.radius_top - this.radius_bottom) / this.stacks;

        // generate top and bottom vertices and normals for the cylinder (normals are the same in all stacks)
        var top_vertices = [];
        var bottom_vertices = [];
        var stack_normals = [];
        for (var angleIndex = 0; angleIndex < this.slices; angleIndex++) {
            var current_angle = alphaAng * angleIndex;
            var x_coord = Math.cos(current_angle);
            var y_coord = Math.sin(current_angle);
            
            top_vertices.push(this.radius_top * x_coord, this.radius_top * y_coord, this.height);
            bottom_vertices.push(this.radius_bottom * x_coord, this.radius_bottom * y_coord, 0);
            stack_normals.push(x_coord, y_coord, 0);
        }

        // generate all of the other vertices
        var middle_vertices = [];
        for (var stack = 1, radius = this.radius_bottom + delta_radius, height = delta_height; stack < this.stacks; ++stack) {
            for (var angleIndex = 0; angleIndex < this.slices; angleIndex++) {
                var current_angle = alphaAng * angleIndex;
                var x_coord = radius * Math.cos(current_angle);
                var y_coord = radius * Math.sin(current_angle);
                var z_coord = height;

                middle_vertices.push(x_coord, y_coord, z_coord);
            }

            radius += delta_radius;
            height += delta_height;
        }

        // add vertices to vertices list
        this.vertices.push(...bottom_vertices);
        this.vertices.push(...middle_vertices);
        this.vertices.push(...top_vertices);

        // add normals
        for (var vertice_line = 0; vertice_line <= this.stacks; ++vertice_line) {
            this.normals.push(...stack_normals);
            
            for (var i = 0; i < this.slices; i++){
                this.texCoords.push(i/this.slices,vertice_line/this.stacks);
            }
        }

        // prepare indices for addition to the indices list
        for (var i = 0, index = 0; i <= this.stacks; ++i) {
            var temp = [];
            for (var j = 0; j < this.slices; ++j) {
                temp.push(index++);
            }
            slice_indices.push(temp);
        }

        for (var stack = 0; stack < this.stacks; stack++) {
            console.log("stack no. " + stack);
            for (var i = 0; i < this.slices - 1; i++) {
                this.indices.push(slice_indices[stack][i], slice_indices[stack][i + 1], slice_indices[stack + 1][i]);
                this.indices.push(slice_indices[stack][i + 1], slice_indices[stack + 1][i + 1], slice_indices[stack + 1][i]);
            }

            this.indices.push(slice_indices[stack][this.slices - 1], slice_indices[stack][0], slice_indices[stack + 1][this.slices - 1]);
            this.indices.push(slice_indices[stack + 1][this.slices - 1], slice_indices[stack][0], slice_indices[stack + 1][0]);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        // this.initNormalVizBuffers();

        // console.log(this.vertices);
        // console.log(this.indices);
        // console.log(this.texCoords);
    }
}


