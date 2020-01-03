/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {

	constructor(scene, id, x1, x2, x3, y1, y2, y3, z1, z2, z3) {
		super(scene);
		this.x1 = x1;
		this.x2 = x2;
		this.x3 = x3;
		this.y1 = y1;
		this.y2 = y2;
		this.y3 = y3;
		this.z1 = z1;
		this.z2 = z2;
		this.z3 = z3;

		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			this.x1, this.y1, this.z1,	//0
			this.x2, this.y2, this.z2,	//1
			this.x3, this.y3, this.z3,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2,1,0,
		];

		this.normals = [];


		var ax = this.x2-this.x1;
		var ay = this.y2-this.y1;
		var az = this.z2-this.z1;
		var bx = this.x3-this.x1;
		var by = this.y3-this.y1;
		var bz = this.z3-this.z1;

		this.normals.push(ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx);
		this.normals.push(ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx);
		this.normals.push(ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx);


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
		a = Math.sqrt(Math.pow(this.x1-this.x2, 2) + Math.pow(this.y1-this.y2, 2) + Math.pow(this.z1-this.z2, 2));
		b = Math.sqrt(Math.pow(this.x3-this.x2, 2) + Math.pow(this.y3-this.y2, 2) + Math.pow(this.z3-this.z2, 2));
		c = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2) + Math.pow(this.z1-this.z3, 2));

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
