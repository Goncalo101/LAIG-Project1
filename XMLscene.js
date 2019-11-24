var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(50);

        this.light0 = true;
        this.light1 = false;
        this.light2 = false;
        this.light3 = false;
        this.light4 = false;
        this.light5 = false;
        this.light6 = false;
        this.light7 = false;

        this.numberLights = 0;

        this.views = [];
        this.curView = 0;
        this.securityView = 0;

        this.securityCamera = new MySecurityCamera(this);
        this.testCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));

        this.rtt = new CGFtextureRTT(this, this.gl.canvas.width, this.gl.canvas.height);

        this.count = 0;
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        this.testCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    initCamerasAfterGraph() {
        var first = true;
        for (var key in this.graph.cameras) {

            if (first){
                this.curView = key;
                this.securityView = key;
                first = false;
            }
            this.views.push(key);

        }

        this.interface.gui.add(this, 'curView', this.views).name('Main camera');
        this.interface.gui.add(this, 'securityView', this.views).name('Security camera');

        this.camera =  this.graph.cameras[this.curView];
        this.testCamera = this.graph.cameras[this.securityView];
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                this.lights[i].setPosition(light[2][0], light[2][1], light[2][2], light[2][3]);
                this.lights[i].setAmbient(light[3][0], light[3][1], light[3][2], light[3][3]);
                this.lights[i].setDiffuse(light[4][0], light[4][1], light[4][2], light[4][3]);
                this.lights[i].setSpecular(light[5][0], light[5][1], light[5][2], light[5][3]);

                if (light[1] == "spot") {
                    this.lights[i].setSpotCutOff(light[6]);
                    this.lights[i].setSpotExponent(light[7]);
                    this.lights[i].setSpotDirection(light[8][0], light[8][1], light[8][2]);
                }

                this.lights[i].setVisible(true);
                if (light[0]){
                    this.lights[i].enable();
                    this.setLightTo(i, true);
                } else {
                    this.lights[i].disable();
                    this.setLightTo(i, false);
                }



                this.lights[i].update();

                this.interface.lights_folder.add(this, 'light' + i ).name(key);

                i++;
                this.numberLights++;
            }
        }
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

        this.setGlobalAmbientLight(this.graph.ambient[0], this.graph.ambient[1], this.graph.ambient[2], this.graph.ambient[3]);

        this.initLights();

        this.initCamerasAfterGraph();

        this.sceneInited = true;
    }

    setStartTime(t) {
        this.start_time = t;
        ++this.count;
    }

    update(t) {
        if (this.interface.isKeyPressed("KeyM")) {
            this.graph.keyMPressed();
        }

        if (this.count == 0) {
            this.setStartTime(t);
        }

        // guarantee that the animations start at time = 0
        if (this.start_time != undefined) {
            this.graph.curr_time = t - this.start_time;
            this.curr_time = t;
        }
    }

    /**
     * Displays the scene.
     */
    render(isRTT) {
        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
        this.axis.display();
        

        if (this.sceneInited) {
            // Draw axis
            this.setDefaultAppearance();

            this.updateActiveLights();

            this.updateActiveCamera();

            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
            // this.graph.displayAlternative();

            if (isRTT){
                this.camera = this.testCamera;
                // this.camera = this.graph.cameras[this.curView];
            } else {
                this.camera = this.graph.cameras[this.curView];
            }
            
        }

       

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }

    display(){
        this.rtt.attachToFrameBuffer();
        this.render(false);
        this.securityCamera.display();
        this.rtt.detachFromFrameBuffer();
        this.render(true);
        this.securityCamera.display();
    }


    updateActiveCamera(){
        this.camera = this.graph.cameras[this.curView];
        this.testCamera = this.graph.cameras[this.securityView];

        this.interface.setActiveCamera(this.camera);
    }


    setLightTo(i, active){
        switch(i){
            case 7:
                this.light7 = active;
                break;
            case 6:
                this.light6 = active;
                break;
            case 5:
                this.light5 = active;
                break;
            case 4:
                this.light4 = active;
                break;
            case 3:
                this.light3 = active;
                break;
            case 2:
                this.light2 = active;
                break;
            case 1:
                this.light1 = active;
                break;
            case 0:
                this.light0 = active;
                break;
            
            default:
        }
    }

    updateActiveLights(){
        switch(this.numberLights){
            case 8:
                if (this.light7)
                    this.lights[7].enable();
                else    
                    this.lights[7].disable();
                this.lights[7].update();
            case 7:
                if (this.light6)
                    this.lights[6].enable();
                else    
                    this.lights[6].disable();
                this.lights[6].update();
            case 6:
                if (this.light5)
                    this.lights[5].enable();
                else    
                    this.lights[5].disable();
                this.lights[5].update();
            case 5:
                if (this.light4)
                    this.lights[4].enable();
                else    
                    this.lights[4].disable();
                this.lights[4].update();
            case 4:
                if (this.light3)
                    this.lights[3].enable();
                else    
                    this.lights[3].disable();
                this.lights[3].update();
            case 3:
                if (this.light2)
                    this.lights[2].enable();
                else    
                    this.lights[2].disable();
                this.lights[2].update();
            case 2:
                if (this.light1)
                    this.lights[1].enable();
                else    
                    this.lights[1].disable();
                this.lights[1].update();
            case 1:
                if (this.light0)
                    this.lights[0].enable();
                else    
                    this.lights[0].disable();
                this.lights[0].update();
            default:
        }
    }
}