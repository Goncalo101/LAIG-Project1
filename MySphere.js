class MySemiSphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alpha = (2 * Math.PI) / this.slices;

        var betaSphere = (Math.PI * 0.5) / this.stacks;

        for (var i = 0; i < this.stacks + 1; i++) {
            for (var j = 0; j < this.slices; j++) {

                this.vertices.push(Math.cos(alpha * j) * Math.cos(betaSphere * i), Math.sin(alpha * j) * Math.cos(betaSphere * i), Math.sin(betaSphere * i));

                this.normals.push(Math.cos(alpha * j) * Math.cos(betaSphere * i), Math.sin(alpha * j) * Math.cos(betaSphere * i), Math.sin(betaSphere * i));

                this.texCoords.push((Math.cos(j * alpha) * Math.cos(betaSphere * i) + 1) / 2, (Math.sin( alpha * j) * Math.cos(betaSphere * i) + 1) / 2);

            }
        }

        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j  < this.slices; j++) {

                if (j == this.slices - 1) {
                   
                    this.indices.push(this.slices * i, this.slices * (i + 1), j + this.slices * (i + 1));
                    this.indices.push(this.slices * i, j + this.slices * (i + 1), j + this.slices * i);
                } else {
                 
                    this.indices.push(j + this.slices * i, 1 + j + this.slices * i, j + this.slices * (i + 1));
                    this.indices.push(1 + j + this.slices * i, 1 + j + this.slices * (i + 1), j + this.slices * (i + 1));
                }

            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};