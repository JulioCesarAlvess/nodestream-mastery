import { afterAll, describe, expect, it, jest } from "@jest/globals";
import readline from "node:readline";
import { log } from "../../src/utils";

describe("Log Suite Test", () => {
  readline.cursorTo = jest.fn().mockImplementation();
  process.stdout.write = jest.fn().mockImplementation();
  afterAll(() => jest.clearAllMocks());
  it("writeInput", () => {
    const msg = "teste";
    log(msg);
    expect(readline.cursorTo).toBeCalledWith(process.stdout, 0);
    expect(process.stdout.write).toBeCalledWith(msg);
  });
});
