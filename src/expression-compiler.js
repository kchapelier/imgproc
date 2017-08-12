"use strict";

var constantRegex = /^\-?[0-9]+\.?[0-9]*$/,
    inputRegex = /^(r|g|b|a)([0-9])$/,
    expressionRegex = /^(max|min|add|sub|mul|div|avg|abs|mod|pow|rand|sin|cos|floor|ceil|mix)\((.*)\)$/,
    channels = ['r', 'g', 'b', 'a'];

function parseArguments (string) {
    var buffer = '',
        parens = 0,
        values = [],
        char;

    for(var i = 0; i < string.length; i++) {
        char = string[i];

        if (parens === 0 && char === ',') {
            values.push(buffer);
            buffer = '';
        } else {
            buffer += char;

            if (char === '(') {
                parens++;
            } else if (char === ')') {
                parens--;
            }
        }
    }

    values.push(buffer);

    return values;
}

function tokenizeRule (rule) {
    rule = rule.trim();
    var result;

    var match;

    var hasParen = rule.indexOf('(') !== -1;

    if (hasParen && (match = rule.match(expressionRegex))) {
        var args = [],
            values = parseArguments(match[2]),
            value;

        for (var i = 0; i < values.length; i++) {
            value = values[i].trim();
            //console.log('- ', value);
            args.push(tokenizeRule(value));
        }

        result = {
            type: 'expression',
            string: match[1],
            args: args
        };
    } else if (!hasParen) {
        if (constantRegex.test(rule)) {
            result = {
                type: 'constant',
                constant: parseFloat(rule),
                children: null
            };
        } else if (match = rule.match(inputRegex)) {
            result = {
                type: 'input',
                channel: channels.indexOf(match[1]),
                image: parseInt(match[2], 10) - 1,
                children: null
            };
        } else {
            throw new Error('Unknown expression: ' + rule)
        }
    } else {
        throw new Error('Unknown expression: ' + rule);
    }

    return result;
}

function buildExpression (expression) {
    if (expression != null) {
        if (expression.type === 'constant') {
            return expression.constant.toString();
        } else if (expression.type === 'input') {
            return 'images[' + expression.image + '][pixel * 4 + ' + expression.channel + '] / 255';
        } else if (expression.type === 'expression') {
            var argsString = expression.args.map(buildExpression).join(', ');
            return 'methods.' + expression.string + '(' + argsString + ')';
        }
    }

    return '0.';
}

var methods = {
    max: function (...args) {
        return Math.max(...args);
    },
    min: function (...args) {
        return Math.min(...args);
    },
    avg: function (...args) {
        var sum = 0;

        for (var i = 0; i < args.length; i++) {
            sum+= args[i];
        }

        return sum / args.length;
    },
    add: function (...args) {
        var sum = 0;

        for (var i = 0; i < args.length; i++) {
            sum+= args[i];
        }

        return sum;
    },
    sub: function (...args) {
        var sum = args[0] || 0;

        for (var i = 1; i < args.length; i++) {
            sum-= args[i];
        }

        return sum;
    },
    mul: function (...args) {
        var sum = args[0] || 0;

        for (var i = 1; i < args.length; i++) {
            sum*= args[i];
        }

        return sum;
    },
    div: function (...args) {
        var sum = args[0] || 0;

        for (var i = 1; i < args.length; i++) {
            sum/= args[i];
        }

        return sum;
    },
    abs: function (value) {
        return Math.abs(value);
    },
    mod: function (value, mod) {
        return value % (mod || 256);
    },
    pow: function (value, pow) {
        return Math.pow(value, pow || 2);
    },
    rand: function (value) {
        return Math.random() * value;
    },
    sin: function (value) {
        return Math.sin(value);
    },
    cos: function (value) {
        return Math.cos(value);
    },
    floor: function (value) {
        return Math.floor(value);
    },
    ceil: function (value) {
        return Math.ceil(value);
    },
    mix: function (value1, value2, ratio) {
        return value1 * (1 - ratio) + value2 * ratio;
    }
};

function createFunction (rTokens, gTokens, bTokens, aTokens) {
    var bodyFunction = [
        '  output[pixel * 4] = Math.min(255, 255 * Math.max(0, ' + buildExpression(rTokens) + '));',
        '  output[pixel * 4 + 1] = Math.min(255, 255 * Math.max(0, ' + buildExpression(gTokens) + '));',
        '  output[pixel * 4 + 2] = Math.min(255, 255 * Math.max(0, ' + buildExpression(bTokens) + '));',
        '  output[pixel * 4 + 3] = Math.min(255, 255 * Math.max(0, ' + buildExpression(aTokens) + '));'
    ];

    var func = new Function('images', 'output', 'pixel', 'methods', bodyFunction.join('\n'));

    return function (images, output, pixel) {
        return func(images, output, pixel, methods);
    };
}

function compile (rExpression, gExpression, bExpression, aExpression) {
    return createFunction(
        tokenizeRule(rExpression ? rExpression.toString() : '0'),
        tokenizeRule(gExpression ? gExpression.toString() : '0'),
        tokenizeRule(bExpression ? bExpression.toString() : '0'),
        tokenizeRule(aExpression ? aExpression.toString() : '1')
    );
}

module.exports = compile;
