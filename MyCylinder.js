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

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
        var stack_height = this.height / this.stacks;

        for (var i = 0; i < this.height; i += stack_height) {
            for (var j = 0; j < this.slices; j++) {
                var sa = Math.sin(ang);
                var saa = Math.sin(ang + alphaAng);
                var ca = Math.cos(ang);
                var caa = Math.cos(ang + alphaAng);

                this.vertices.push(ca, -sa, i + stack_height);
                this.vertices.push(ca, -sa, i);
                this.vertices.push(caa, -saa, i);
                this.vertices.push(caa, -saa, i + stack_height);

                // Compute normal direction
                var normal = [
                    caa,
                    0,
                    -saa
                ]

                var normal2 = [
                    ca,
                    0,
                    -sa
                ]

                // Normalize vector
                var nsize = Math.sqrt(
                    normal[0] * normal[0] +
                    normal[1] * normal[1] +
                    normal[2] * normal[2]
                )

                normal[0] /= nsize
                normal[1] /= nsize
                normal[2] /= nsize

                var nsize = Math.sqrt(
                    normal2[0] * normal2[0] +
                    normal2[1] * normal2[1] +
                    normal2[2] * normal2[2]
                )

                normal2[0] /= nsize
                normal2[1] /= nsize
                normal2[2] /= nsize

                // push normal once for each vertex of this rectangle
                this.normals.push(...normal2)
                this.normals.push(...normal2)
                this.normals.push(...normal)
                this.normals.push(...normal)

                this.texCoords.push((1 / this.slices) * j, 1,
                    (1 / this.slices) * j, 0,
                    1 / this.slices * (j + 1), 0,
                    1 / this.slices * (j + 1), 1);

                // this.indices.push(4 * j, (4 * j + 3), (4 * j + 2), (4 * j + 1), 4 * j)
                this.indices.push(4 * j, (4 * j + 3), (4 * j + 2), (4 * j + 2), (4 * j + 1), 4 * j)
                ang += alphaAng;
            }
        }

        // for (var i = 0; i < this.slices; i++) {
        //     var sa = Math.sin(ang)
        //     var saa = Math.sin(ang + alphaAng)
        //     var ca = Math.cos(ang)
        //     var caa = Math.cos(ang + alphaAng)

        //     this.vertices.push(ca, stack_height, -sa)
        //     this.vertices.push(ca, 0, -sa)
        //     this.vertices.push(caa, 0, -saa)
        //     this.vertices.push(caa, stack_height, -saa)

        //     // Compute normal direction
        //     var normal = [
        //         caa,
        //         0,
        //         -saa
        //     ]

        //     var normal2 = [
        //         ca,
        //         0,
        //         -sa
        //     ]

        //     // Normalize vector
        //     var nsize = Math.sqrt(
        //         normal[0] * normal[0] +
        //         normal[1] * normal[1] +
        //         normal[2] * normal[2]
        //     )

        //     normal[0] /= nsize
        //     normal[1] /= nsize
        //     normal[2] /= nsize

        //     var nsize = Math.sqrt(
        //         normal2[0] * normal2[0] +
        //         normal2[1] * normal2[1] +
        //         normal2[2] * normal2[2]
        //     )

        //     normal2[0] /= nsize
        //     normal2[1] /= nsize
        //     normal2[2] /= nsize

        //     // push normal once for each 0vertex of this rectangle
        //     this.normals.push(...normal2)
        //     this.normals.push(...normal2)
        //     this.normals.push(...normal)
        //     this.normals.push(...normal)

        //     this.texCoords.push((1 / this.slices) * i, 1,
        //         (1 / this.slices) * i, 0,
        //         1 / this.slices * (i + 1), 0,
        //         1 / this.slices * (i + 1), 1);

        //     this.indices.push(4 * i, (4 * i + 1), (4 * i + 2), (4 * i + 2), (4 * i + 3), 4 * i)
        //     ang += alphaAng;
        // }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();
    }
}


