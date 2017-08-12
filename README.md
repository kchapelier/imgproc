# imgproc

An experimental and unpolished image processing utility for the command line

```sh
./cli.js img/trees.png -o outputs/red-channel-only.png --red="r1"
```

```sh
./cli.js img/trees.png -o outputs/invert-colors.png --red="sub(1,r1)" --green="sub(1,g1)" --blue="sub(1,b1)" --alpha="a1"
```

```sh
./cli.js img/trees.png -o outputs/desaturate.png --red="avg(r1,g1,b1)" --green="avg(r1,g1,b1)" --blue="avg(r1,g1,b1)" --alpha="a1"
```

```sh
./cli.js img/trees.png -o outputs/desaturate-seventy-percents.png --red="mix(r1,avg(r1,g1,b1),0.7)" --green="mix(g1,avg(r1,g1,b1),0.7)" --blue="mix(b1,avg(r1,g1,b1),0.7)" --alpha="a1"
```

```sh
./cli.js img/trees.png -o outputs/desaturate-all-but-blue.png --red="avg(r1,g1,b1)" --green="avg(r1,g1,b1)" --blue="max(b1,avg(r1,g1,b1))" --alpha="a1"
```

```sh
./cli.js img/trees.png -o outputs/darken.png --red="pow(r1,1.3)" --green="pow(g1,1.3)" --blue="pow(b1,1.3)" --alpha="a1"
```

```sh
./cli.js img/trees.png -o outputs/lighten.png --red="add(0.25,mul(0.8,pow(r1, 0.5)))" --green="add(0.25,mul(0.8,pow(g1, 0.5)))" --blue="add(0.25,mul(0.8,pow(b1, 0.4)))" --alpha="a1"
```

```sh
./cli.js img/trees.png -o outputs/gameboy.png --red="add(0.07,div(floor(mul(pow(avg(r1,g1,b1),0.7),4)),3.8))" --green="add(0.1,div(floor(mul(pow(avg(r1,g1,b1),0.7),4)),3.3))" --blue="add(0.02,div(floor(mul(pow(avg(r1,g1,b1),0.7),4)),3.8))" --alpha="a1"
```

```sh
./cli.js img/trees.png img/mask.png -o outputs/mix.png --red="mix(r1,r2,0.5)" --green="mix(g1,g2,0.5)" --blue="mix(b1,b2,0.5)" --alpha="mix(a1,a2,0.5)"
```

```sh
./cli.js img/trees.png img/mask.png -o outputs/mask-alpha.png --red="r1" --green="g1" --blue="b1" --alpha="avg(r2,g2,b2)"
```

```sh
./cli.js img/trees.png img/mask.png -o outputs/mask-black.png --red="mul(r1,r2)" --green="mul(g1,g2)" --blue="mul(b1,b2)" --alpha="a1"
```

