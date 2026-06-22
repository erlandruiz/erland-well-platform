import { describe, it, expect } from "vitest";
import { DLS_COURSE_LENGTH } from "../src/index.js";

describe("Units / Unidades", () => {
  it("define longitud de curso DLS en pies / define DLS course length in feet", () => {
    expect(DLS_COURSE_LENGTH.FEET).toBe(100);
  });

  it("define longitud de curso DLS en metros / define DLS course length in meters", () => {
    expect(DLS_COURSE_LENGTH.METERS).toBe(30);
  });
});