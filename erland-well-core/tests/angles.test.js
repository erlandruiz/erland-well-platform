import { describe, expect, test } from "vitest";
import {
  calculateAngleDifferenceDeg,
  interpolateAngleDeg,
  normalizeAngleDeg,
} from "../src/index.js";

describe("angle utilities / utilidades de ángulos", () => {
  test("normaliza ángulos al rango 0 a 360 / normalizes angles to 0 to 360 range", () => {
    expect(normalizeAngleDeg(370)).toBe(10);
    expect(normalizeAngleDeg(-10)).toBe(350);
    expect(normalizeAngleDeg(720)).toBe(0);
  });

  test("calcula diferencia angular normal / calculates normal angular difference", () => {
    expect(calculateAngleDifferenceDeg(100, 90)).toBe(10);
    expect(calculateAngleDifferenceDeg(80, 90)).toBe(-10);
  });

  test("calcula diferencia angular cruzando 360 grados / calculates angular difference crossing 360 degrees", () => {
    expect(calculateAngleDifferenceDeg(1, 359)).toBe(2);
    expect(calculateAngleDifferenceDeg(359, 1)).toBe(-2);
  });

  test("interpola azimuth cruzando 360 grados / interpolates azimuth crossing 360 degrees", () => {
    const result = interpolateAngleDeg(350, 10, 0.5);

    expect(result).toBeCloseTo(0, 12);
  });

  test("interpola azimuth en dirección negativa / interpolates azimuth in negative direction", () => {
    const result = interpolateAngleDeg(10, 350, 0.5);

    expect(result).toBeCloseTo(0, 12);
  });
});