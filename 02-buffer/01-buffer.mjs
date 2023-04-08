const buffer = Buffer.alloc(5);
buffer.fill("hi", 0, 2);
buffer.fill(0x3a, 2, 3); //dexadecimal char code for:
buffer.fill(0x29, 4, 5); //hexadecimal char code for )

console.log("log buffer toString", buffer.toString());
console.log("log buffer", { buffer });
console.log("buffer size ", buffer, buffer.byteLength);

//error, when it reaches max value, it should be moved to another buffer
//buffer.fill("h", 5, 6);

const anotherBuffer = Buffer.alloc(6);
anotherBuffer.set(buffer, buffer.byteOffset);
anotherBuffer.fill("four", 5, 6);

console.log("anotherBuffer ", anotherBuffer.toString());
console.log("anotherBuffer size ", anotherBuffer, anotherBuffer.byteLength);

//or with full data
const msg = "Hey there!";
const preAllocated = Buffer.alloc(msg.length, msg);
console.log(
  "preAllocated size ",
  preAllocated.toString(),
  preAllocated,
  preAllocated.byteLength
);
//same thing of Buffer.from(msg)
const withBufferFrom = Buffer.from(msg);
console.log(
  "withBufferFrom size ",
  withBufferFrom.toString(),
  withBufferFrom,
  withBufferFrom.byteLength
);

// ----------
const str = "Hello World";

const charCodes = [];
const bytes = [];
for (const index in str) {
  //integer or decimals
  const code = str.charCodeAt(index);
  const byteCode = "0x" + Math.abs(code).toString(16);
  console.log(str.charAt(index), " code: ", { code }, " byteCode: ", {
    byteCode,
  });
  charCodes.push(code);
  bytes.push(byteCode);
}

console.log("\n", {
  charCodes,
  bytes,
  contentFromCharCodes: Buffer.from(charCodes).toString(),
  contentFromHexaBytes: Buffer.from(bytes).toString(),
});
