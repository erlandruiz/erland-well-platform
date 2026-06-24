import { describe, expect, test } from "vitest";
import {
  calculateTrajectoryWithVerticalSection,
  comparePlannedActualByInterpolatedMd,
} from "../src/index.js";

describe("comparePlannedActualByInterpolatedMd / comparar plan vs real con MD interpolado", () => {
  test("compara surveys reales contra plan calculado / compares actual surveys against calculated plan", () => {
    const plannedSurveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 1000, inc: 10, azi: 90 },
      { md: 2000, inc: 20, azi: 90 },
      { md: 3000, inc: 30, azi: 90 },
    ];

    const actualSurveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 947.35, inc: 11.2, azi: 91.5 },
      { md: 1888.7, inc: 19.4, azi: 88.8 },
      { md: 2765.45, inc: 31.1, azi: 92.2 },
    ];

    const plannedTrajectory = calculateTrajectoryWithVerticalSection(
      plannedSurveys,
      {
        dlsCourseLength: 100,
        verticalSectionDirection: 90,
      },
    );

    const actualTrajectory = calculateTrajectoryWithVerticalSection(
      actualSurveys,
      {
        dlsCourseLength: 100,
        verticalSectionDirection: 90,
      },
    );

    const comparison = comparePlannedActualByInterpolatedMd(
      plannedTrajectory,
      actualTrajectory,
    );

    expect(comparison.matched).toHaveLength(actualTrajectory.length);
    expect(comparison.unmatchedActual).toHaveLength(0);

    for (const matchedStation of comparison.matched) {
      expect(matchedStation.planned).toBeDefined();
      expect(matchedStation.actual).toBeDefined();

      expect(matchedStation.planned.md).toBeCloseTo(
        matchedStation.actual.md,
        12,
      );

      expect(typeof matchedStation.deltaInc).toBe("number");
      expect(typeof matchedStation.deltaAzi).toBe("number");
      expect(typeof matchedStation.deltaTvd).toBe("number");
      expect(typeof matchedStation.deltaNorth).toBe("number");
      expect(typeof matchedStation.deltaEast).toBe("number");
      expect(typeof matchedStation.deltaVerticalSection).toBe("number");
      expect(typeof matchedStation.deltaClosureDistance).toBe("number");
    }
  });

  test("interpola el plan cuando el MD real no coincide / interpolates planned trajectory when actual MD does not match", () => {
    const plannedSurveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 1000, inc: 10, azi: 90 },
      { md: 2000, inc: 20, azi: 90 },
    ];

    const actualSurveys = [
      { md: 500, inc: 6, azi: 91 },
      { md: 1500, inc: 16, azi: 89 },
    ];

    const plannedTrajectory = calculateTrajectoryWithVerticalSection(
      plannedSurveys,
      {
        dlsCourseLength: 100,
        verticalSectionDirection: 90,
      },
    );

    const actualTrajectory = calculateTrajectoryWithVerticalSection(
      actualSurveys,
      {
        dlsCourseLength: 100,
        verticalSectionDirection: 90,
      },
    );

    const comparison = comparePlannedActualByInterpolatedMd(
      plannedTrajectory,
      actualTrajectory,
    );

    expect(comparison.matched).toHaveLength(2);

    for (const matchedStation of comparison.matched) {
      expect(matchedStation.plannedWasInterpolated).toBe(true);
      expect(matchedStation.planned.md).toBeCloseTo(
        matchedStation.actual.md,
        12,
      );
    }
  });

  test("calcula diferencia angular corta para azimuth / calculates shortest angular difference for azimuth", () => {
    const plannedTrajectory = [
      {
        md: 100,
        azi: 359,
      },
      {
        md: 200,
        azi: 359,
      },
    ];

    const actualTrajectory = [
      {
        md: 150,
        azi: 1,
      },
    ];

    const comparison = comparePlannedActualByInterpolatedMd(
      plannedTrajectory,
      actualTrajectory,
    );

    expect(comparison.matched[0].deltaAzi).toBeCloseTo(2, 12);
  });

  test("reporta estaciones reales fuera del rango del plan / reports actual stations outside planned range", () => {
    const plannedSurveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 1000, inc: 10, azi: 90 },
    ];

    const actualSurveys = [
      { md: 1200, inc: 12, azi: 91 },
    ];

    const plannedTrajectory = calculateTrajectoryWithVerticalSection(
      plannedSurveys,
      {
        dlsCourseLength: 100,
        verticalSectionDirection: 90,
      },
    );

    const actualTrajectory = calculateTrajectoryWithVerticalSection(
      actualSurveys,
      {
        dlsCourseLength: 100,
        verticalSectionDirection: 90,
      },
    );

    const comparison = comparePlannedActualByInterpolatedMd(
      plannedTrajectory,
      actualTrajectory,
    );

    expect(comparison.matched).toHaveLength(0);
    expect(comparison.unmatchedActual).toHaveLength(1);
  });
});