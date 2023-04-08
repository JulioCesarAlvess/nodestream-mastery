//create a file with 100 lines
// for i in `seq 1 100`; do node -e "process.stdout.write('$i-hello world\n')" >> text.txt; done

import { readFile } from "fs/promises";

// if it's a big file, it'd crash or make your program slow down
// - gonna fix in the next class with node.js streams
const data = (await readFile("./text.txt")).toString().split("\n");
const LINES_PER_ITERACTION = 10;
const interactions = data.length / LINES_PER_ITERACTION; //ten in ten lines (not bytes!)
let page = 0;

for (let index = 1; index < interactions; index++) {
  const chunk = data.slice(page, (page += LINES_PER_ITERACTION)).join("\n");

  // imagine this as the maximum 2BG buffer Node.js can handle per time
  const buffer = Buffer.from(chunk);

  const amountOfBytes = buffer.byteOffset;
  const bufferData = buffer.toString().split("\n");
  const amountOfLines = bufferData.length;

  // noew the bufferData would be splitted into small pieces and processed individualy, on demand
  console.log(
    "processing",
    bufferData,
    `lines: ${amountOfLines} , bytes: ${amountOfBytes}`
  );
}
