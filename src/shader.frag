precision mediump float;
varying vec2 uv;
uniform float red;
uniform float green;
uniform float blue;
void main() {
	gl_FragColor = vec4(red, green, blue, 1.);
}
