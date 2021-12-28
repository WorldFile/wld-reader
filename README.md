# wld-reader
Read World Files (e.g., .gfw, .jgw, .j2w, .pgw, .tfw, and .wld)

## basic usage
```javascript
const readWorldFile = require('wld-reader');

const worldFile = `
2445.9849051249894
0
0
-2445.98490512499
7699959.850241235
1323859.6754601842
`;

const result = readWorldFile(worldFile);
{
  xScale: 2445.9849051249894,
  ySkew: 0,
  xSkew: 0,
  yScale: -2445.98490512499,
  xOrigin: 7699959.850241235,
  yOrigin: 1323859.6754601842
}
```

## advanced usage
If you want to preserve the raw string of text:
```js
const result = readWorldFile(worldFile, { raw: true });
{
  xScale: "2445.9849051249894",
  ySkew: "0",
  xSkew: "0",
  yScale: "-2445.98490512499",
  xOrigin: "7699959.850241235",
  yOrigin: "1323859.6754601842"
}
```
## Reference
https://en.wikipedia.org/wiki/World_file

## Support
Post an issue at http://github.com/worldfile/wld-reader/issues or email the package author at daniel.j.dufour@gmail.com
