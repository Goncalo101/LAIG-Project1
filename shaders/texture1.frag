#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D uSampler2;
uniform sampler2D uSampler3;
uniform float timefactor;

void main() {

	 vec4 color = texture2D(uSampler, vTextureCoord);
	 vec4 color2 = texture2D(uSampler2, vTextureCoord);

	vec3 color3 = vec3(1.0,1.0,1.0);

	float dist = (0.5-vTextureCoord.x)*(0.5-vTextureCoord.x) + (0.5-vTextureCoord.y)*(0.5-vTextureCoord.y);

	if (mod(vTextureCoord.y + timefactor, 0.20) < 0.06 ){
		vec3 colorLine = color3 * (1.0-(abs(0.03-mod(vTextureCoord.y+timefactor, 0.20))*(1.0/0.03)));
		// gl_FragColor = vec4(color.rgb + (colorLine/3.0), 1.0);
		color.rgb += (colorLine/3.0);
	} 
	// else {
		gl_FragColor = vec4(color.rgb - (color3*dist*1.0), 1.0);
	// }

// 0 -> 1
// 0.015 -> 0


	// gl_FragColor = vec4(color.rgb + color3*(dist*2.0), 1.0);
	// gl_FragColor = color;
	

	

}