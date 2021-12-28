const test = require("flug");
const { readFileSync } = require("fs");
const readWorldFile = require("../index.js");

function checkResults({ eq, results }) {
  eq(results.xScale, 2445.9849051249894);
  eq(results.ySkew, 0);
  eq(results.xSkew, 0);
  eq(results.yScale, -2445.98490512499);
  eq(results.xOrigin, 7699959.850241235);
  eq(results.yOrigin, 1323859.6754601842);
}

test("Should parse file in Buffer Format", ({ eq }) => {
  const buffer = readFileSync("./test/data/gadas-export.pgw");
  const results = readWorldFile(buffer);
  checkResults({ eq, results });
});

test("Should parse file in ArrayBuffer Format", ({ eq }) => {
  const data = readFileSync("./test/data/gadas-export.pgw");
  const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const results = readWorldFile(arrayBuffer);
  checkResults({ eq, results });
});
test("Should parse file in Uint8Array Format", ({ eq }) => {
  const buffer = readFileSync("./test/data/gadas-export.pgw");
  const uint8Array = new Uint8Array(buffer);
  const results = readWorldFile(uint8Array);
  checkResults({ eq, results });
});

test("Should parse file in DataView Format", ({ eq }) => {
  const data = readFileSync("./test/data/gadas-export.pgw");
  const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const dataView = new DataView(arrayBuffer);
  const results = readWorldFile(dataView);
  checkResults({ eq, results });
});

test("Should parse file in String Format", ({ eq }) => {
  const data = `
  2445.9849051249894
  0
  0
  -2445.98490512499
  7699959.850241235
  1323859.6754601842
  `;
  const results = readWorldFile(data);
  checkResults({ eq, results });
});

test("Should parse file in String format", ({ eq }) => {
  const data = `
  2445.9849051249894
  0
  0
  -2445.98490512499
  7699959.850241235
  1323859.6754601842
  `;
  const results = readWorldFile(data, { raw: true });
  eq(results.xScale, "2445.9849051249894");
  eq(results.ySkew, "0");
  eq(results.xSkew, "0");
  eq(results.yScale, "-2445.98490512499");
  eq(results.xOrigin, "7699959.850241235");
  eq(results.yOrigin, "1323859.6754601842");
});
