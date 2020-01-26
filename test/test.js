const { expect } = require('chai');
const { readFileSync } = require('fs');
const readWorldFile = require('../index.js');

function checkResults(results) {
  expect(results.xScale).to.equal(2445.9849051249894);
  expect(results.ySkew).to.equal(0);
  expect(results.xSkew).to.equal(0);
  expect(results.yScale).to.equal(-2445.98490512499);
  expect(results.xOrigin).to.equal(7699959.850241235);
  expect(results.yOrigin).to.equal(1323859.6754601842);
}

describe('Checking Binary Encodings', function() {
  it('Should parse file in Buffer Format', function() {
    const buffer = readFileSync('./test/data/gadas-export.pgw');
    checkResults(readWorldFile(buffer));
  });
  it('Should parse file in ArrayBuffer Format', function() {
    const data = readFileSync('./test/data/gadas-export.pgw');
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
    checkResults(readWorldFile(arrayBuffer));
  });
  it('Should parse file in Uint8Array Format', function() {
    const buffer = readFileSync('./test/data/gadas-export.pgw');
    const uint8Array = new Uint8Array(buffer);
    checkResults(readWorldFile(uint8Array));
  });
  it('Should parse file in DataView Format', function() {
    const data = readFileSync('./test/data/gadas-export.pgw');
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const dataView = new DataView(arrayBuffer);
    checkResults(readWorldFile(dataView));
  });
  it('Should parse file in String Format', function() {
    const data = `
    2445.9849051249894
    0
    0
    -2445.98490512499
    7699959.850241235
    1323859.6754601842
    `;
    checkResults(readWorldFile(data));
  });
})