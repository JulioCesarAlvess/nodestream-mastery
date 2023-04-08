import { describe, expect, it, jest } from "@jest/globals";
import Reporter from "../../src/streamComponents/reporter";

describe("Reporter Suite Test", () => {
  it("it should print progress status correctly", () => {
    const loggerMock = jest.fn();
    const reporter = new Reporter({
      logger: loggerMock,
    });
    const multiple = 10;
    const progress = reporter.progress(multiple);
    for (let i = 0; i < multiple; i++) {
      progress.Writable("1");
    }
    progress.emit("end");
    expect(loggerMock.mock.calls.length).toEqual(10);

    for (const index in loggerMock.mock.calls) {
      `processed %`;
    }
  });
});
