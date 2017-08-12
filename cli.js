#!/usr/bin/env node

"use strict";

var yargs = require('yargs');
var Jimp = require('jimp');
var compileExpressions = require('./src/expression-compiler');

var args = yargs.usage('Usage: image inputFiles -o outputFile [options]')
    .describe('o', 'Output file')
    .alias('o', 'out')
    .describe('red', 'Red component')
    .describe('green', 'Green component')
    .describe('blue', 'Blue component')
    .describe('alpha', 'Alpha component')
    .describe('q', 'Quiet mode. Silence the output.')
    .alias('q', 'quiet')
    .boolean(['quiet'])
    .demandOption(['o'])
    .help('h')
    .alias('h', 'help')
    .argv;

var promises = args._.map(path => Jimp.read(path));

Promise.all(promises).then(images => {
    var func = compileExpressions(
        args.red,
        args.green,
        args.blue,
        args.alpha
    );

    var inputs = images.map(img => img.bitmap.data);

    var nbPixels = images[0].bitmap.width * images[0].bitmap.height;

    var output = new Uint8Array(nbPixels * 4);

    for (var pixel = 0; pixel < nbPixels; pixel++) {
        func(inputs, output, pixel);
    }

    var newImage = new Jimp(images[0].bitmap.width, images[0].bitmap.height);
    newImage.bitmap.data = Buffer.from(output.buffer);

    newImage.write(args.o);
}).catch(reason => {
    console.log(reason)
});
