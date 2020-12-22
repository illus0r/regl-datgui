// TODO как-то импортнуть шейдеры в строки. Это нерабочий кусок, остался от вебпака
import shaderFrag from 'raw-loader!glslify-loader!./shader.frag'
import shaderVert from 'raw-loader!glslify-loader!./shader.vert'

const regl = require('regl')()

const drawTriangle = regl({

  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: shaderFrag,
  vert: shaderVert,

  attributes: {
    position: [[-1, 3], [3, -1], [-1, -1]]
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: regl.prop('color')
  },

  // This tells regl the number of vertices to draw in this command
  count: 3
})

// regl.frame() wraps requestAnimationFrame and also handles viewport changes
regl.frame(({time}) => {
  // clear contents of the drawing buffer
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  // draw a triangle using the command defined above
  drawTriangle({
    color: [
      Math.cos(time * 0.1),
      Math.sin(time * 0.8),
      Math.cos(time * 0.3),
      1
    ]
  })
})
