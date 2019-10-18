class MySphere extends CGFobject {


    constructor(scene, id, radius, slices, stacks) {
        super(scene);

        this.radius = radius;
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

                var x = this.radius * Math.cos(alpha * j) * Math.cos(betaSphere * i);
                var y = this.radius * Math.sin(alpha * j) * Math.cos(betaSphere * i);
                var z = this.radius * Math.sin(betaSphere * i);

                this.vertices.push(x, y, z);

                this.normals.push(Math.cos(alpha * j) * Math.cos(betaSphere * i), Math.sin(alpha * j) * Math.cos(betaSphere * i), Math.sin(betaSphere * i));

                this.texCoords.push(0.5 + Math.atan2(z/this.radius, x/this.radius)/(2*Math.PI), 0.5 - Math.asin(y/this.radius)/Math.PI);

            }
        }

        for (var i = 0; i < this.stacks + 1; i++) {
            for (var j = 0; j < this.slices; j++) {

                var x = this.radius * Math.cos(alpha * j) * Math.cos(betaSphere * i);
                var y = this.radius * Math.sin(alpha * j) * Math.cos(betaSphere * i);
                var z = -this.radius * Math.sin(betaSphere * i);

                this.vertices.push(x,y,z);

                this.normals.push(Math.cos(alpha * j) * Math.cos(betaSphere * i), Math.sin(alpha * j) * Math.cos(betaSphere * i), -Math.sin(betaSphere * i));

                this.texCoords.push(0.5 + Math.atan2(z/this.radius, x/this.radius)/(2*Math.PI), 0.5 - Math.asin(y/this.radius)/Math.PI);

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

        for (var i = 0; i <= this.stacks; i++) {
            for (var j = 0; j  < this.slices; j++) {

                if (j == this.slices - 1) {
                   
                    this.indices.push(this.slices * ((i + this.stacks) + 1), this.slices * (i + this.stacks), j + this.slices * ((i + this.stacks) + 1));
                    this.indices.push(j + this.slices * ((i + this.stacks) + 1), this.slices * (i + this.stacks), j + this.slices * (i + this.stacks));
                } else {
                 
                    this.indices.push(1 + j + this.slices * (i + this.stacks), j + this.slices * (i + this.stacks), j + this.slices * ((i + this.stacks) + 1));
                    this.indices.push(1 + j + this.slices * ((i + this.stacks) + 1) , 1 + j + this.slices * (i + this.stacks), j + this.slices * ((i + this.stacks) + 1));
                }

            }
        }

        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(s_length, t_length) {
		this.updateTexCoordsGLBuffers();
	}
};