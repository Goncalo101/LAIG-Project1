
class MySecurityCamera extends CGFobject {

    constructor(scene) {

        super(scene);

        this.scene = scene;

        this.timefactor = 0.0;

        this.rectangle = new MyRectangle(this.scene, 0, 0.25, 1, -1, -0.25);

        this.shader = new CGFshader(this.scene.gl, "shaders/texture1.vert", "shaders/texture1.frag");

        this.texture = new CGFtexture(this.scene, "scenes/images/vidral.jpg");

        this.shader.setUniformsValues({ uSampler2: 1 });
        this.shader.setUniformsValues({ uSampler3: 2 });
        

    }

    display(){

        this.scene.gl.disable(this.scene.gl.DEPTH_TEST)

        this.scene.setActiveShader(this.shader);

        // this.scene.gl.bindTexture(this.scene.gl.TEXTURE_2D, this.scene.gl.createTexture());

        this.shader.setUniformsValues({ timefactor: this.timefactor });

        this.texture.bind(1);
        this.texture.bind(2);
        this.scene.rtt.bind();
        

        this.rectangle.display();

        this.scene.gl.enable(this.scene.gl.DEPTH_TEST);

        this.scene.setActiveShader(this.scene.defaultShader);

        
    }


} 