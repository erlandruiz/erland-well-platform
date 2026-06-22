import { describe, it, expect } from "vitest";
import {
  calculateDls,
  DLS_COURSE_LENGTH,
} from "../src/index.js";

describe("DLS / Dogleg Severity", () => {
  it("calcula DLS en grados por 100 pies / calculates DLS in degrees per 100 feet", () => {
    const dls = calculateDls(2, 100, DLS_COURSE_LENGTH.FEET);

    expect(dls).toBeCloseTo(2, 10);
  });

  it("calcula DLS en grados por 30 metros / calculates DLS in degrees per 30 meters", () => {
    const dls = calculateDls(2, 100, DLS_COURSE_LENGTH.METERS);

    expect(dls).toBeCloseTo(0.6, 10);
  });

  it("rechaza deltaMd menor o igual a cero / rejects deltaMd less than or equal to zero", () => {
    expect(() => calculateDls(2, 0, DLS_COURSE_LENGTH.FEET)).toThrow();
    expect(() => calculateDls(2, -100, DLS_COURSE_LENGTH.FEET)).toThrow();
  });
});