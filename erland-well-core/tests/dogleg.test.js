import { describe, it, expect } from "vitest";
import {
  calculateDoglegRad,
  calculateDoglegDeg,
} from "../src/index.js";

describe("Dogleg / Dogleg", () => {
  it("devuelve 0 cuando no hay cambio de inclinación ni azimut / returns 0 when there is no inclination or azimuth change", () => {
    const doglegDeg = calculateDoglegDeg(0, 0, 0, 0);
    const doglegRad = calculateDoglegRad(0, 0, 0, 0);

    expect(doglegDeg).toBeCloseTo(0, 12);
    expect(doglegRad).toBeCloseTo(0, 12);
  });

  it("calcula 2 grados cuando pasa de INC 0° a INC 2° / calculates 2 degrees when going from INC 0° to INC 2°", () => {
    const doglegDeg = calculateDoglegDeg(0, 0, 2, 180);

    expect(doglegDeg).toBeCloseTo(2, 10);
  });

  it("calcula correctamente un cambio direccional conocido / correctly calculates a known directional change", () => {
    const doglegDeg = calculateDoglegDeg(2, 180, 5, 182);

    expect(doglegDeg).toBeCloseTo(3.0020278305108063, 10);
  });

  it("maneja correctamente azimuts cercanos a 360 grados / correctly handles azimuths near 360 degrees", () => {
    const doglegDeg = calculateDoglegDeg(10, 359, 10, 1);

    expect(doglegDeg).toBeGreaterThan(0);
    expect(doglegDeg).toBeLessThan(1);
  });
});