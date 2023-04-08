//create a file with 100 lines Linux
// for i in `seq 1 20`; do node -e "process.stdout.write('hello world.repeat(1e7)\n')" >> big.file; done

/* import { createWriteStream } from "fs";
let resultados = "";

for (var k = 0; k < 1e7; k++) {
  resultados += "hello world";
}

const writeFile = createWriteStream("big.file");

writeFile.write(resultados); */

import { promises, createReadStream, statSync } from "node:fs";
const filename = "./big.file";

try {
  const file = await promises.readFile(filename);
  console.log("fileBuffer", file);
  console.log("file size", file.byteLength / 1e9, "GB", "\n");
} catch (error) {
  console.log("error: max 2GB reached..", error.message);
}

const { size } = statSync(filename);
console.log("file szie", size / 1e9, "GB", "\n");

let chunkConsumed = 0;
const stream = createReadStream(filename)
  // 65K per readable!
  // triggered by the first strem.read()
  .once("data", (msg) => {
    console.log("on data lenght", msg.toString().length);
  })
  .once("readable", (_) => {
    // this stream.read(11) will trigger the on(data) event
    console.log("read 11 chunk bytes", stream.read(11).toString());
    console.log("read 05 chunk bytes", stream.read(5).toString());

    chunkConsumed += 11 + 5;
  })
  .on("readable", (_) => {
    let chunk;
    //stream.read() reads max 65Kbytes
    while (null !== (chunk = stream.read())) {
      chunkConsumed += chunk.length;
    }
  })
  .on("end", () => {
    console.log(`Read ${chunkConsumed / 1e9} bytes of data`);
  });
