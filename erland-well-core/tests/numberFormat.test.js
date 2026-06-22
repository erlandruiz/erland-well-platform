import { describe, it, expect } from "vitest";
import {
  cleanFloatingPoint,
  roundTo,
  formatFixed,
} from "../src/index.js";

describe("Number Format / Formato numérico", () => {
  it("limpia valores muy cercanos a cero / cleans values very close to zero", () => {
    expect(cleanFloatingPoint(0.0000000000001)).toBe(0);
    expect(cleanFloatingPoint(-0.0000000000001)).toBe(0);
  });

  it("limpia valores muy cercanos a enteros / cleans values very close to integers", () => {
    expect(cleanFloatingPoint(1.999999999999948)).toBe(2);
    expect(cleanFloatingPoint(3.000000000000001)).toBe(3);
  });

  it("formatea valores con 15 decimales / formats values with 15 decimal places", () => {
    expect(formatFixed(2, 15)).toBe("2.000000000000000");
    expect(formatFixed(0, 15)).toBe("0.000000000000000");
  });

  it("redondea valores a una cantidad específica de decimales / rounds values to a specific number of decimals", () => {
    expect(roundTo(1.23456789, 3)).toBe(1.235);
    expect(roundTo(1.2344, 3)).toBe(1.234);
  });
});