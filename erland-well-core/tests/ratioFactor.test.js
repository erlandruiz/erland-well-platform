import { describe, it, expect } from "vitest";
import { calculateRatioFactor } from "../src/index.js";

describe("Ratio Factor / Factor de proporción", () => {
  it("devuelve 1 cuando el Dogleg es 0 / returns 1 when Dogleg is 0", () => {
    const ratioFactor = calculateRatioFactor(0);

    expect(ratioFactor).toBe(1);
  });

  it("devuelve 1 cuando el Dogleg es extremadamente pequeño / returns 1 when Dogleg is extremely small", () => {
    const ratioFactor = calculateRatioFactor(1e-13);

    expect(ratioFactor).toBe(1);
  });

  it("calcula el Ratio Factor para Dogleg de 2 grados / calculates the Ratio Factor for a 2-degree Dogleg", () => {
    const doglegRad = (2 * Math.PI) / 180;
    const ratioFactor = calculateRatioFactor(doglegRad);

    expect(ratioFactor).toBeCloseTo(1.000101551513691, 12);
  });

  it("calcula el Ratio Factor para Dogleg de 3.0020278305108063 grados / calculates the Ratio Factor for a 3.0020278305108063-degree Dogleg", () => {
    const doglegDeg = 3.0020278305108063;
    const doglegRad = (doglegDeg * Math.PI) / 180;
    const ratioFactor = calculateRatioFactor(doglegRad);

    expect(ratioFactor).toBeCloseTo(1.000228834846893, 12);
  });
});