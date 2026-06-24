import { describe, expect, test } from "vitest";
import {
  calculateTrajectoryWithVerticalSection,
  interpolateTrajectoryAtMd,
} from "../src/index.js";

describe("interpolateTrajectoryAtMd / interpolar trayectoria en MD", () => {
  test("interpola una trayectoria calculada desde surveys MD, INC y AZI / interpolates a trajectory calculated from MD, INC, and AZI surveys", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 1000, inc: 10, azi: 90 },
      { md: 2000, inc: 20, azi: 90 },
    ];

    const trajectory = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength: 100,
      verticalSectionDirection: 90,
    });

    const result = interpolateTrajectoryAtMd(trajectory, 500);

    expect(result).not.toBeNull();
    expect(result.interpolated).toBe(true);
    expect(result.md).toBe(500);
    expect(result.sourceMdStart).toBe(0);
    expect(result.sourceMdEnd).toBe(1000);

    expect(typeof result.inc).toBe("number");
    expect(typeof result.azi).toBe("number");
    expect(typeof result.tvd).toBe("number");
    expect(typeof result.north).toBe("number");
    expect(typeof result.east).toBe("number");
    expect(typeof result.verticalSection).toBe("number");
    expect(typeof result.dls).toBe("number");
  });

  test("devuelve estación exacta si el MD coincide / returns exact station if MD matches", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 1000, inc: 10, azi: 90 },
      { md: 2000, inc: 20, azi: 90 },
    ];

    const trajectory = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength: 100,
      verticalSectionDirection: 90,
    });

    const result = interpolateTrajectoryAtMd(trajectory, 1000);

    expect(result).not.toBeNull();
    expect(result.interpolated).toBe(false);
    expect(result.md).toBe(1000);
    expect(result.sourceMdStart).toBe(1000);
    expect(result.sourceMdEnd).toBe(1000);
  });

  test("devuelve null si el MD está fuera de rango / returns null if MD is out of range", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 1000, inc: 10, azi: 90 },
    ];

    const trajectory = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength: 100,
      verticalSectionDirection: 90,
    });

    const result = interpolateTrajectoryAtMd(trajectory, 1200);

    expect(result).toBeNull();
  });

  test("interpola azimuth correctamente cruzando 360 grados / interpolates azimuth correctly crossing 360 degrees", () => {
    const trajectory = [
      {
        md: 100,
        azi: 350,
      },
      {
        md: 200,
        azi: 10,
      },
    ];

    const result = interpolateTrajectoryAtMd(trajectory, 150);

    expect(result.azi).toBeCloseTo(0, 12);
  });
});