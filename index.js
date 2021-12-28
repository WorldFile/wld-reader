/* global TextDecoder */

const VALID_ENCODINGS = ["utf-8", "utf-16le", "macintosh"];

function parseText(text, { raw = false } = { raw: false }) {
  // check if text matches pattern found in world files
  const sep = /\r?\n/;
  let lines = text
    .split(sep)
    .filter(Boolean)
    .map((str) => str.trim());
  if (raw !== true) lines = lines.map((str) => Number(str));
  const [xScale, ySkew, xSkew, yScale, xOrigin, yOrigin] = lines;
  return { xScale, ySkew, xSkew, yScale, xOrigin, yOrigin };
}

module.exports = function readWorldFile(input, { debug = false, raw = false } = { debug: false, raw: false }) {
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(input)) {
    input = input.toString();
  }

  if (typeof ArrayBuffer !== "undefined" && input instanceof ArrayBuffer) {
    if (typeof TextDecoder !== "undefined" && typeof DataView !== "undefined") {
      const dataView = new DataView(input);
      for (let i = 0; i < VALID_ENCODINGS.length; i++) {
        try {
          const encoding = VALID_ENCODINGS[i];
          const decoder = new TextDecoder(encoding);
          const decoded = decoder.decode(dataView);
          const results = parseText(decoded, { raw });
          if (results) {
            return results;
          }
        } catch (error) {
          console.error("failed to parse with " + VALID_ENCODINGS[i] + " encoding");
        }
      }
    } else {
      const decoded = String.fromCharCode.apply(null, new Uint8Array(input));
      return parseText(decoded, { raw });
    }
  }

  if (input instanceof Uint8Array) {
    const decoded = String.fromCharCode.apply(null, input);
    return parseText(decoded, { raw });
  }

  if (typeof DataView !== "undefined" && input instanceof DataView) {
    const arrayBuffer = input.buffer;
    const decoded = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    return parseText(decoded, { raw });
  }

  if (typeof input === "string") {
    return parseText(input, { raw });
  }
};
