import { describe, expect, test } from "vitest";
import { calculateVerticalSection } from "../src/index.js";

describe("calculateVerticalSection / calcular sección vertical", () => {
  test("calcula vertical section hacia North cuando la dirección es 0 grados / calculates vertical section toward North when direction is 0 degrees", () => {
    const result = calculateVerticalSection(100, 0, 0);

    expect(result).toBeCloseTo(100, 12);
  });

  test("calcula vertical section hacia East cuando la dirección es 90 grados / calculates vertical section toward East when direction is 90 degrees", () => {
    const result = calculateVerticalSection(0, 100, 90);

    expect(result).toBeCloseTo(100, 12);
  });

  test("calcula vertical section negativa cuando la dirección es 180 grados / calculates negative vertical section when direction is 180 degrees", () => {
    const result = calculateVerticalSection(100, 0, 180);

    expect(result).toBeCloseTo(-100, 12);
  });

  test("calcula vertical section diagonal a 45 grados / calculates diagonal vertical section at 45 degrees", () => {
    const result = calculateVerticalSection(100, 100, 45);

    expect(result).toBeCloseTo(141.4213562373095, 12);
  });
});