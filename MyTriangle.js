/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {

	constructor(scene, id, x1, x2, x3, y1, y2, y3) {
		super(scene);
		this.x1 = x1;
		this.x2 = x2;
		this.x3 = x3;
		this.y1 = y1;
		this.y2 = y2;
		this.y3 = y3;

		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			this.x1, this.y1, 0,	//0
			this.x2, this.y2, 0,	//1
			this.x3, this.y3, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];

		this.normals = [];
		for (var i = 0; i < 3; i++) {
			this.normals.push(0, 0, 1);
		}

		this.texCoords = [
			this.x1, this.y1,
			this.x2, this.y2,
			this.x3, this.y3
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(s_length, t_length) {

		var a, b, c, cosa, sina;
		a = Math.sqrt(Math.pow(this.x1-this.x2, 2) + Math.pow(this.y1-this.y2, 2));
		b = Math.sqrt(Math.pow(this.x3-this.x2, 2) + Math.pow(this.y3-this.y2, 2));
		c = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2));

		cosa = (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/(2*a*c);
		sina = Math.sqrt(1 - Math.pow(cosa, 2));

		this.texCoords = [
			0, 0,
			a/s_length, 0,
			c*cosa/s_length, c*sina/t_length
		];


		this.updateTexCoordsGLBuffers();
	}
}
