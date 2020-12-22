// TODO в 9 и 17 строки надо как-то импортнуть шейдеры из файлов shader.frag и shader.vert
import shaderFrag from "./shader.frag";

const regl = require('regl')(document.body)
const dat = require('dat.gui');
const gui = new dat.GUI();

let params = {red: 0, green: 1, blue: 0};
gui.add(params, 'red', 0, 1);
gui.add(params, 'green', 0, 1);
gui.add(params, 'blue', 0, 1);

const setupQuad = regl({
	frag: shaderFrag,
	vert: `precision mediump float;attribute vec2 position;void main() {gl_Position = vec4(position, 0, 1);}`,

	attributes: {
		position: [ -4, -4, 4, -4, 0, 4 ]
	},

	uniforms: {
		tick: regl.context('tick'),
		red: () => {return params.red},
		green: () => {return params.green},
		blue: () => {return params.blue},
	},

	depth: { enable: false },

	count: 3
})

regl.frame(() => {
	setupQuad(() => {
		regl.draw()
	})
})

