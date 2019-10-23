class Patch extends CGFobject {

    constructor(scene, npointsU, npointsV, npartsU, npartsV, controlvertexes) {

        super(scene);

        this.scene = scene;

        this.patch = new CGFnurbsSurface(npointsU, npointsV, controlvertexes);

		this.patchObj = new CGFnurbsObject(this.scene, npartsU, npartsV, this.patch);

        this.initBuffers();
    }

    initBuffers(){
        this.patchObj.initBuffers();
    }

    display(){
        this.patchObj.display();
    }

}