(function(){
  var program;
  function text2dim(len){
    var w, h, ref$;
    len <= 50 || (len = 50);
    w = len;
    if (w > 4) {
      w = Math.ceil(len / Math.sqrt(len * 0.5));
    }
    h = (ref$ = Math.ceil(len / w)) < w ? ref$ : w;
    return [w, h];
  }
  function text2png(text, font){
    var ref$, w, h, ansiCanvas, canvas, margin, padding, ctx, row, idx, ch, offset;
    text = text.slice(0, 50);
    ref$ = text2dim(text.length), w = ref$[0], h = ref$[1];
    ansiCanvas = require('ansi-canvas');
    canvas = ansiCanvas();
    margin = 2;
    padding = 0;
    ctx = canvas.getContext('2d');
    row = 1;
    while (text.length) {
      idx = 0;
      while (idx < w && text.length) {
        ch = text.slice(0, 1);
        text = text.slice(1);
        ctx.font = "35px " + font;
        if (/[\u3000\uFF01-\uFF5E]/.exec(ch) && /EBAS/.exec(font)) {
          ctx.font = "35px TW-Kai";
        }
        while (text.length && /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/.exec(text[0])) {
          ctx.font = '35px Arial Unicode MS';
          ch += text[0];
          text = text.slice(1);
        }
        drawBackground(ctx, margin + idx * 40, 10 + (padding + row - 1) * 55, 35);
        offset = /[\u3000\uFF01-\uFF5E]/.exec(ch) ? 0.17 : 0.23;
        ctx.fillText(ch, margin + idx * 40, (padding + row - offset) * 55);
        idx++;
      }
      row++;
    }
    return canvas.render();
  }
  function drawBackground(ctx, x, y, dim){
    ctx.strokeStyle = '#A33';
    ctx.fillStyle = '#F9F6F6';
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + dim);
    ctx.lineTo(x + dim, y + dim);
    ctx.lineTo(x + dim, y);
    ctx.lineTo(x - ctx.lineWidth / 2, y);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x, y + dim / 3);
    ctx.lineTo(x + dim, y + dim / 3);
    ctx.moveTo(x, y + dim / 3 * 2);
    ctx.lineTo(x + dim, y + dim / 3 * 2);
    ctx.moveTo(x + dim / 3, y);
    ctx.lineTo(x + dim / 3, y + dim);
    ctx.moveTo(x + dim / 3 * 2, y);
    ctx.lineTo(x + dim / 3 * 2, y + dim);
    return ctx.stroke();
  }
  program = require('commander');
  program.version('0.0.1');
  program.command('*').description('draw moedict canvas (max 3 words)').action(function(it){
    return text2png(it);
  });
  program.parse(process.argv);
}).call(this);
