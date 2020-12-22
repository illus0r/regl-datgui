// TODO в 9 и 17 строки надо как-то импортнуть шейдеры из файлов shader.frag и shader.vert
import shaderFrag from "./shader.frag";

const regl = require('regl')({
	container: document.body,
	pixelRatio: 1/8,
})
const dat = require('dat.gui')
const gui = new dat.GUI()

let params = {}

//params['red'] = {value: 0.0,}
//params['green'] = {value: 0.0,}
//params['blue'] = {value: 0.0,}
//params['threshold'] = {min: -1.0, value: 0.0,}
//params['time_'] = {max: 1000.0, value: 0.0,}
//params['spotSeed'] = {max: 1000.0, value: 0.0,}
//params['colorShift_'] = {max: 1.0, value: 0.02,}
//params['spotRadius'] = {max: 2.0, value: 0.5,}
//params['spotDetails'] = {max: 50.0, value: 0.5,}
//params['spotAmplitude'] = {max: 5.0, value: 0.5,}
//params['blur'] = {max: 1.5, value: 0.1,}

params['threshold'] = 0.0
params['time_'] = 0.0
params['spotSeed'] = 0.0
params['colorShift_'] = 0.02
params['spotRadius'] = 0.5
params['spotDetails'] = 0.5
params['spotAmplitude'] = 0.5
params['blur'] = 0.1


for(let key in params) {
	console.log(key, params[key])
	let p = params[key]
	//gui.add(params, 'red', ('min' in p)?p.min:0, ('max' in p)?p.max:1);
	gui.add(params, key, 0, 1);
	
}



const setupQuad = regl({
	frag: shaderFrag,
	vert: `precision mediump float;attribute vec2 position;varying vec2 uv;void main() {uv=position;gl_Position = vec4(position, 0, 1);}`,

	attributes: {
		position: [ -4, -4, 4, -4, 0, 4 ]
	},

	uniforms: {
		tick: regl.context('tick'),
		red: () => {return params.red},
		green: () => {return params.green},
		blue: () => {return params.blue},
		threshold: () => {return params['threshold']},
		time_: () => {return params['time_']},
		spotSeed: () => {return params['spotSeed']},
		colorShift_: () => {return params['colorShift_']},
		spotRadius: () => {return params['spotRadius']},
		spotDetails: () => {return params['spotDetails']},
		spotAmplitude: () => {return params['spotAmplitude']},
		blur: () => {return params['blur']},
		TIME: regl.context('time'),
		width: regl.context('viewportWidth'),
    height: regl.context('viewportHeight'),
	},

	depth: { enable: false },

	count: 3
})

regl.frame(() => {
	setupQuad(() => {
		regl.draw()
	})
})

