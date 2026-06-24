import { describe, expect, test } from "vitest";
import { calculateTrajectoryWithVerticalSection } from "../src/index.js";

describe("calculateTrajectoryWithVerticalSection / calcular trayectoria con sección vertical", () => {
  test("agrega verticalSection a cada estación calculada / adds verticalSection to each calculated station", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 10, azi: 90 },
      { md: 200, inc: 20, azi: 90 },
    ];

    const results = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength: 100,
      verticalSectionDirection: 90,
    });

    expect(results).toHaveLength(3);

    for (const station of results) {
      expect(station).toHaveProperty("verticalSection");
      expect(typeof station.verticalSection).toBe("number");
    }
  });

  test("cuando verticalSectionDirection es 0, verticalSection coincide con north / when verticalSectionDirection is 0, verticalSection matches north", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 10, azi: 0 },
      { md: 200, inc: 20, azi: 0 },
    ];

    const results = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength: 100,
      verticalSectionDirection: 0,
    });

    for (const station of results) {
      expect(station.verticalSection).toBeCloseTo(station.north, 12);
    }
  });

  test("cuando verticalSectionDirection es 90, verticalSection coincide con east / when verticalSectionDirection is 90, verticalSection matches east", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 10, azi: 90 },
      { md: 200, inc: 20, azi: 90 },
    ];

    const results = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength: 100,
      verticalSectionDirection: 90,
    });

    for (const station of results) {
      expect(station.verticalSection).toBeCloseTo(station.east, 12);
    }
  });
});