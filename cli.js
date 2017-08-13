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

    if (images.length < 1) {
        throw new Error('Requires at least one input image.');
    }

    var inputs = [],
        width = images[0].bitmap.width,
        height = images[0].bitmap.height,
        nbPixels = width * height;

    for (var i = 0; i < images.length; i++) {
        if (images[i].bitmap.width !== width || images[i].bitmap.height !== height) {
            throw new Error('All the input image must have the same size.');
        }

        inputs.push(images[i].bitmap.data);
    }

    var output = new Uint8Array(nbPixels * 4);

    for (var pixel = 0; pixel < nbPixels; pixel++) {
        func(inputs, output, pixel);
    }

    var newImage = new Jimp(width, height);
    newImage.bitmap.data = Buffer.from(output.buffer);

    newImage.write(args.o);
}).catch(reason => {
    console.log(reason)
});
