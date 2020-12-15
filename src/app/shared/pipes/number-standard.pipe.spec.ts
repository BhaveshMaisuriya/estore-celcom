import { NumberStandardFilter } from "./number-standard.pipe";

describe("Number-Standard Pipe", () => {
  it("should prefix with 0 if starts with `60`", () => {
    let standardNumber = "60182917929";
    const pipe = new NumberStandardFilter();
    let result = pipe.transform(standardNumber);
    expect(result).toBe("0182917929");
    standardNumber = "0182917929";
    result = pipe.transform(standardNumber);
    expect(result).toBe("0182917929");
  });
  
});

