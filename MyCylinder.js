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

        for (var current_height = 0, index = 0; current_height <= this.height; current_height += stack_height) {
            for (var current_angle = 0; current_angle < 2 * Math.PI; current_angle += alphaAng) {
                var x_coord = Math.cos(current_angle);
                var y_coord = Math.sin(current_angle);
                var z_coord = current_height;

                this.vertices.push(x_coord, y_coord, z_coord);
                this.normals.push(x_coord, y_coord, 0);
            }

            var temp = [];
            for (var i = 0; i < this.slices; i++) {
                temp.push(index++);
            }

            slice_indices.push(temp);
        }

        for (var stack = 0; stack < this.stacks; ++stack) {
            for (var i = 0; i < this.slices; i++) {
                this.indices.push(slice_indices[stack][i], slice_indices[stack][i + 1], slice_indices[stack + 1][i]);
                this.indices.push(slice_indices[stack][i + 1], slice_indices[stack + 1][i + 1], slice_indices[stack + 1][i])
            }

            this.indices.push(slice_indices[stack][this.slices - 1], slice_indices[stack][0], slice_indices[stack + 1][this.slices - 1]);
            this.indices.push(slice_indices[stack + 1][this.slices - 1], slice_indices[stack][0], slice_indices[stack + 1][0]);
        }

        // for (var i = 0; i < this.height; i += stack_height) {
        //     var widening_factor = ((this.radius_top - this.radius_bottom) / this.stacks) * i + this.radius_bottom;
        //     for (var j = 0; j < this.slices; j++) {
        //         var sa = Math.sin(ang);
        //         var saa = Math.sin(ang + alphaAng);
        //         var ca = Math.cos(ang);
        //         var caa = Math.cos(ang + alphaAng);

        //         this.vertices.push(ca * widening_factor, -sa * widening_factor, i + stack_height);
        //         this.vertices.push(ca * widening_factor, -sa * widening_factor, i);
        //         this.vertices.push(caa * widening_factor, -saa * widening_factor, i);
        //         this.vertices.push(caa * widening_factor, -saa * widening_factor, i + stack_height);

        //         // Compute normal direction
        //         var normal = [
        //             caa,
        //             0,
        //             -saa
        //         ]

        //         var normal2 = [
        //             ca,
        //             0,
        //             -sa
        //         ]

        //         // Normalize vector
        //         var nsize = Math.sqrt(
        //             normal[0] * normal[0] +
        //             normal[1] * normal[1] +
        //             normal[2] * normal[2]
        //         )

        //         normal[0] /= nsize
        //         normal[1] /= nsize
        //         normal[2] /= nsize

        //         var nsize = Math.sqrt(
        //             normal2[0] * normal2[0] +
        //             normal2[1] * normal2[1] +
        //             normal2[2] * normal2[2]
        //         )

        //         normal2[0] /= nsize
        //         normal2[1] /= nsize
        //         normal2[2] /= nsize

        //         // push normal once for each vertex of this rectangle
        //         this.normals.push(...normal2)
        //         this.normals.push(...normal2)
        //         this.normals.push(...normal)
        //         this.normals.push(...normal)

        //         // this.texCoords.push((1 / this.slices) * j, 1,
        //         //     (1 / this.slices) * j, 0,
        //         //     1 / this.slices * (j + 1), 0,
        //         //     1 / this.slices * (j + 1), 1);

        //         // this.indices.push(4 * j, (4 * j + 3), (4 * j + 2), (4 * j + 1), 4 * j)
        //         this.indices.push(4 * j, (4 * j + 3), (4 * j + 2), (4 * j + 2), (4 * j + 1), 4 * j)
        //         ang += alphaAng;
        //     }
        // }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();
    }
}


