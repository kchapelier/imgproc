# imgproc

An experimental and unpolished image processing utility for the command line.

Allow to manipulate and combine images using a simple SDL limited to channel access and basic functions.

## Installing

With [npm](http://npmjs.org) do:

```
npm install imgproc -g
```

## SDL

**Input variables :** r1 is the red channel of the first input image, g2 is the green channel of the second input image, b3 is the blue channel of the third input image, a9 is the alpha channel of the ninth input image, etc.

**Numerical constants :** 0, 0.001, 1923., -5, etc.

**Functions :**

 * min
 * max
 * add
 * sub
 * mul
 * div
 * avg
 * mod
 * pow
 * rand
 * sin
 * cos
 * floor
 * ceil
 * mix

## Recipes

### Limit to a single channel

```sh
imgproc img/trees.png -o outputs/red-channel-only.png --red="r1"
```

![Example](/outputs/red-channel-only.png)

### Invert colors

```sh
imgproc img/trees.png -o outputs/invert-colors.png --red="sub(1,r1)" --green="sub(1,g1)" --blue="sub(1,b1)" --alpha="a1"
```

![Example](/outputs/invert-colors.png)

### Desaturate (crudely)

```sh
imgproc img/trees.png -o outputs/desaturate.png --red="avg(r1,g1,b1)" --green="avg(r1,g1,b1)" --blue="avg(r1,g1,b1)" --alpha="a1"
```

![Example](/outputs/desaturate.png)

### Desaturate by 70 percents

```sh
imgproc img/trees.png -o outputs/desaturate-seventy-percents.png --red="mix(r1,avg(r1,g1,b1),0.7)" --green="mix(g1,avg(r1,g1,b1),0.7)" --blue="mix(b1,avg(r1,g1,b1),0.7)" --alpha="a1"
```

![Example](/outputs/desaturate-seventy-percents.png)

### Desaturate all but blue

```sh
imgproc img/trees.png -o outputs/desaturate-all-but-blue.png --red="avg(r1,g1,b1)" --green="avg(r1,g1,b1)" --blue="max(b1,avg(r1,g1,b1))" --alpha="a1"
```

![Example](/outputs/desaturate-all-but-blue.png)

### Darken

```sh
imgproc img/trees.png -o outputs/darken.png --red="pow(r1,1.3)" --green="pow(g1,1.3)" --blue="pow(b1,1.3)" --alpha="a1"
```

![Example](/outputs/darken.png)

### Lighten

```sh
imgproc img/trees.png -o outputs/lighten.png --red="add(0.25,mul(0.8,pow(r1, 0.5)))" --green="add(0.25,mul(0.8,pow(g1, 0.5)))" --blue="add(0.25,mul(0.8,pow(b1, 0.4)))" --alpha="a1"
```

![Example](/outputs/lighten.png)

### Gameboy filter

```sh
imgproc img/trees.png -o outputs/gameboy.png --red="add(0.07,div(floor(mul(pow(avg(r1,g1,b1),0.7),4)),3.8))" --green="add(0.1,div(floor(mul(pow(avg(r1,g1,b1),0.7),4)),3.3))" --blue="add(0.02,div(floor(mul(pow(avg(r1,g1,b1),0.7),4)),3.8))" --alpha="a1"
```

![Example](/outputs/gameboy.png)

### Blend two images

```sh
imgproc img/trees.png img/mask.png -o outputs/mix.png --red="mix(r1,r2,0.5)" --green="mix(g1,g2,0.5)" --blue="mix(b1,b2,0.5)" --alpha="mix(a1,a2,0.5)"
```

![Example](/outputs/mix.png)

### Use a B/W image as an alpha mask

```sh
imgproc img/trees.png img/mask.png -o outputs/mask-alpha.png --red="r1" --green="g1" --blue="b1" --alpha="avg(r2,g2,b2)"
```

![Example](/outputs/mask-alpha.png)

### Combine two heightmaps in a single image

```sh
imgproc img/trees.png img/mask.png -o outputs/combined.png --red="avg(r1,g1,b1)" --green="avg(r2,g2,b2)" --blue="0.5" --alpha="1"
```

![Example](/outputs/combined.png)

### Mix two images using the multiply blend mode

```sh
imgproc img/trees.png img/mask.png -o outputs/multiply.png --red="mul(r1,r2)" --green="mul(g1,g2)" --blue="mul(b1,b2)" --alpha="avg(a1,a2)"
```

![Example](/outputs/multiply.png)

### Mix two images using the screen blend mode

```sh
imgproc img/trees.png img/mask.png -o outputs/screen.png --red="sub(1,mul(sub(1,r1),sub(1,r2)))" --green="sub(1,mul(sub(1,g1),sub(1,g2)))" --blue="sub(1,mul(sub(1,b1),sub(1,b2)))" --alpha="avg(a1,a2)"
```

![Example](/outputs/screen.png)

## Changelog

### 0.1.0 (2017.08.13) :

 * First release.

# License

MIT
