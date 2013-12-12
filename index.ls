#!/usr/bin/env node
function text2dim (len)
  len <?= 50
  w = len
  w = Math.ceil(len / Math.sqrt(len * 0.5)) if w > 4
  h = Math.ceil(len / w) <? w
  return [w, h]

function text2png (text, font)
  text.=slice(0, 50)
  #png-file = "png/#text.#font.png"
  #return fs.createReadStream png-file if fs.existsSync png-file

  [w, h] = text2dim text.length
  #padding = (w - h) / 2

  ansi-canvas = require \ansi-canvas
  canvas = ansi-canvas!
  #canvas = new Canvas (w * 375) , (w * 375)
  
  #margin = (w * 15) / 2
  margin = 2
  padding = 0
  ctx = canvas.getContext \2d
  row = 1
  while text.length
    idx = 0
    while idx < w and text.length
      ch = text.slice 0, 1
      text.=slice 1
      ctx.font = "35px #font"
      ctx.font = "35px TW-Kai" if ch is /[\u3000\uFF01-\uFF5E]/ and font is /EBAS/
      while text.length and text.0 is /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/
        ctx.font = '35px Arial Unicode MS'
        ch += text.0
        text.=slice 1
      drawBackground ctx, (margin + idx * 40), (10 + (padding + row - 1)* 55), 35
      offset = if ch is /[\u3000\uFF01-\uFF5E]/ then 0.17 else 0.23
      ctx.fillText ch, (margin + idx * 40), (padding + row - offset)* 55
      idx++
    row++
  canvas.render!
  #return canvas.pngStream!

function drawBackground (ctx, x, y, dim)
  ctx.strokeStyle = \#A33
  ctx.fillStyle = \#F9F6F6
  ctx.beginPath!
  ctx.lineWidth = 8
  ctx.moveTo(x, y)
  ctx.lineTo(x, y+ dim)
  ctx.lineTo(x+ dim, y+ dim)
  ctx.lineTo(x+ dim, y)
  ctx.lineTo(x - (ctx.lineWidth / 2), y)
  ctx.stroke!
  ctx.fill!
  ctx.fillStyle = \#000
  ctx.beginPath!
  ctx.lineWidth = 2
  ctx.moveTo(x, y+ dim / 3)
  ctx.lineTo(x+ dim, y+ dim / 3)
  ctx.moveTo(x, y+ dim / 3 * 2)
  ctx.lineTo(x+ dim, y+ dim / 3 * 2)
  ctx.moveTo(x+ dim / 3, y)
  ctx.lineTo(x+ dim / 3, y+ dim)
  ctx.moveTo(x+ dim / 3 * 2, y)
  ctx.lineTo(x+ dim / 3 * 2, y+ dim)
  ctx.stroke!

program = require \commander

program
  .version \0.0.1

program
  .command 'moedict [words]' 
  .description 'draw moedict canvas (max 3 words)'
  .action ->
    text2png it

program
  .command \*
  .action ->
    console.log 'please enter a valid command'

program.parse process.argv

