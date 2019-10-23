class Patch extends CGFobject {

    constructor(scene, npointsU, npointsV, npartsU, npartsV, controlvertexes) {

        super(scene);

        this.scene = scene;

        console.log(controlvertexes);

        this.patch = new CGFnurbsSurface(npointsU-1, npointsV-1, controlvertexes);

		this.patchObj = new CGFnurbsObject(this.scene, npartsU, npartsV, this.patch);

        this.initBuffers();
    }

    initBuffers(){
        this.patchObj.initBuffers();
    }

    display(){
        this.patchObj.display();
    }

    updateTexCoords(s_length, t_length) {
		// this.updateTexCoordsGLBuffers();
	}

}