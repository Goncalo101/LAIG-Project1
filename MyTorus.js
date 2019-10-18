class MyTorus extends CGFobject {


    constructor(scene, id, innerRadius, outerRadius, slices, loops) {
        super(scene);

        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.slices = slices;
        this.loops = loops;

        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alpha = (2 * Math.PI) / this.loops;

        var betaSphere = (2 * Math.PI) / this.slices;

        for (var i = 0; i <= this.loops; i++) {
            for (var j = 0; j <= this.slices; j++) {

                this.vertices.push(this.outerRadius * Math.cos(alpha * i) + this.innerRadius * Math.cos(betaSphere * j) * Math.cos(alpha * i),
                                    this.outerRadius * Math.sin(alpha * i) + this.innerRadius * Math.cos(betaSphere * j) * Math.sin(alpha * i), 
                                    this.innerRadius * Math.sin(betaSphere * j));

                this.normals.push(Math.cos(betaSphere * j) * Math.cos(alpha * i), 
                                    Math.cos(betaSphere * j) * Math.sin(alpha * i), 
                                    Math.sin(betaSphere * j));

                this.texCoords.push(i/this.loops, j/this.slices);

            }
        }


        for (var i = 0; i < this.loops; i++) {
            for (var j = 0; j < this.slices; j++) {

                var curcur = i * (this.slices+1) + j;
                var curnext = i * (this.slices+1) + ((j + 1) );
                var nextcur = ((i+1) ) * (this.slices+1) + j;
                var nextnext = ((i+1) ) * (this.slices+1) + ((j + 1) );

                this.indices.push(curnext, curcur, nextcur);
                this.indices.push(curnext, nextcur, nextnext);

            }
        }       

        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        // this.initNormalVizBuffers();
    }
};