import { describe, it, expect } from "vitest";
import { calculateMinimumCurvature, DLS_COURSE_LENGTH } from "../src/index.js";

describe("Minimum Curvature / Curvatura mínima", () => {
  it("calcula correctamente un pozo vertical / correctly calculates a vertical well", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 0, azi: 0 },
      { md: 200, inc: 0, azi: 0 },
    ];

    const result = calculateMinimumCurvature(surveys);

    expect(result).toHaveLength(3);

    expect(result[0].tvd).toBeCloseTo(0, 10);
    expect(result[1].tvd).toBeCloseTo(100, 10);
    expect(result[2].tvd).toBeCloseTo(200, 10);

    expect(result[2].north).toBeCloseTo(0, 10);
    expect(result[2].east).toBeCloseTo(0, 10);
    expect(result[2].dls).toBeCloseTo(0, 10);
  });

  it("calcula una trayectoria direccional básica / calculates a basic directional trajectory", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 2, azi: 180 },
      { md: 200, inc: 5, azi: 182 },
    ];

    const result = calculateMinimumCurvature(surveys);

    expect(result).toHaveLength(3);

    expect(result[0].md).toBe(0);
    expect(result[1].md).toBe(100);
    expect(result[2].md).toBe(200);

    expect(result[2].tvd).toBeGreaterThan(0);
    expect(result[2].north).not.toBe(0);
    expect(result[2].dls).toBeGreaterThan(0);
  });

  it("calcula valores esperados para una trayectoria direccional conocida / calculates expected values for a known directional trajectory", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 2, azi: 180 },
      { md: 200, inc: 5, azi: 182 },
    ];

    const result = calculateMinimumCurvature(surveys);

    expect(result[1].deltaMd).toBeCloseTo(100, 10);
    expect(result[1].doglegDeg).toBeCloseTo(2.0, 10);
    expect(result[1].ratioFactor).toBeCloseTo(1.0001015515136908, 10);
    expect(result[1].deltaTvd).toBeCloseTo(99.97969340920197, 10);
    expect(result[1].tvd).toBeCloseTo(99.97969340920197, 10);
    expect(result[1].deltaNorth).toBeCloseTo(-1.745152039960908, 10);
    expect(result[1].north).toBeCloseTo(-1.745152039960908, 10);
    expect(result[1].deltaEast).toBeCloseTo(0, 10);
    expect(result[1].east).toBeCloseTo(0, 10);
    expect(result[1].dls).toBeCloseTo(2.0, 10);

    expect(result[2].deltaMd).toBeCloseTo(100, 10);
    expect(result[2].doglegDeg).toBeCloseTo(3.0020278305108063, 10);
    expect(result[2].ratioFactor).toBeCloseTo(1.0002288348468926, 10);
    expect(result[2].deltaTvd).toBeCloseTo(99.80210923094705, 10);
    expect(result[2].tvd).toBeCloseTo(199.781802640149, 10);
    expect(result[2].deltaNorth).toBeCloseTo(-6.101503243453379, 10);
    expect(result[2].north).toBeCloseTo(-7.846655283414288, 10);
    expect(result[2].deltaEast).toBeCloseTo(-0.15211938008237819, 10);
    expect(result[2].east).toBeCloseTo(-0.15211938008237796, 10);
    expect(result[2].dls).toBeCloseTo(3.0020278305108063, 10);
  });

  it("permite calcular DLS usando pies o metros / allows calculating DLS using feet or meters", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 2, azi: 180 },
    ];

    const resultFeet = calculateMinimumCurvature(surveys, {
      dlsCourseLength: DLS_COURSE_LENGTH.FEET,
    });

    const resultMeters = calculateMinimumCurvature(surveys, {
      dlsCourseLength: DLS_COURSE_LENGTH.METERS,
    });

    expect(resultFeet[1].dls).toBeCloseTo(2, 10);
    expect(resultMeters[1].dls).toBeCloseTo(0.6, 10);
  });
});
