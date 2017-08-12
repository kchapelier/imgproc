"use strict";

var compileExpressions = require('./src/expression-compiler');

/*
 // recipe remove alpha by fading to black
 var func = compileExpressions(
 'mix(0, r1, div(a1, 255))',
 'mix(0, g1, div(a1, 255))',
 'mix(0, b1, div(a1, 255))',
 '255'
 );
 */

/*
 // mix two images
 var func = compileExpressions(
 'mix(r1, r2, 0.5)',
 'mix(g1, g2, 0.5)',
 'mix(b1, b2, 0.5)',
 'mix(a1, a2, 0.5)'
 );
 */

/*
 //mix two images by using the multiply blend mode
 var func = compileExpressions(
 'div(mul(r1, r2), 255)',
 'div(mul(g1, g2), 255)',
 'div(mul(b1, b2), 255)',
 'avg(a1, a2)'
 );
 */

/*
 //mix two images by using the screen blend mode
 var func = compileExpressions(
 'sub(255, div(mul(sub(255,r1),sub(255,r2)),255))',
 'sub(255, div(mul(sub(255,g1),sub(255,g2)),255))',
 'sub(255, div(mul(sub(255,b1),sub(255,b2)),255))',
 'avg(a1, a2)'
 );
 */

/*
 //mix two images by using a third B/W image as a mask
 var func = compileExpressions(
 'mix(r1, r2, div(avg(r3,g3,b3), 255))',
 'mix(g1, g2, div(avg(r3,g3,b3), 255))',
 'mix(b1, b2, div(avg(r3,g3,b3), 255))',
 'mix(a1, a2, div(avg(r3,g3,b3), 255))'
 );
 */

// storing the values of 3 B/W images in the different channels of a single image
var func = compileExpressions(
    'avg(r1,g1,b1)',
    'avg(r2,g2,b2)',
    'avg(r3,g3,b3)',
    '1'
);

/*
// Gameboy filter
var func = compileExpressions(
    'div(floor(mul(avg(r1,g1,b1),4)),3)',
    'div(floor(mul(avg(r1,g1,b1),4)),3)',
    'div(floor(mul(avg(r1,g1,b1),4)),3)',
    '1'
);
*/

var image1 = new Uint8Array([255,255,250,8,  100,100,100,255]);
var image2 = new Uint8Array([100,100,100,8,  100,100,100,255]);
var image3 = new Uint8Array([127,255,255,255,128,255,255,255]);

var output = new Uint8Array(8);

var npPixels = image1.length / 4;

for (var pixel = 0; pixel < npPixels; pixel++) {
    func([image1, image2, image3], output, pixel);
}

console.log(output);
