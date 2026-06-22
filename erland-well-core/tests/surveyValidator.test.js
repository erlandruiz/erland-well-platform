import { describe, it, expect } from "vitest";
import {
  validateSurveyStation,
  validateSurveyList,
} from "../src/index.js";

describe("Survey Validator / Validador de surveys", () => {
  it("acepta una estación de survey válida / accepts a valid survey station", () => {
    const station = { md: 100, inc: 10, azi: 180 };

    expect(() => validateSurveyStation(station, 0)).not.toThrow();
  });

  it("rechaza una estación que no es objeto / rejects a station that is not an object", () => {
    expect(() => validateSurveyStation(null, 0)).toThrow();
  });

  it("rechaza MD negativo / rejects negative MD", () => {
    const station = { md: -100, inc: 10, azi: 180 };

    expect(() => validateSurveyStation(station, 0)).toThrow();
  });

  it("rechaza INC fuera de rango / rejects out-of-range INC", () => {
    const station = { md: 100, inc: 181, azi: 180 };

    expect(() => validateSurveyStation(station, 0)).toThrow();
  });

  it("rechaza AZI fuera de rango / rejects out-of-range AZI", () => {
    const station = { md: 100, inc: 10, azi: 360 };

    expect(() => validateSurveyStation(station, 0)).toThrow();
  });

  it("acepta una lista válida de surveys / accepts a valid survey list", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 2, azi: 180 },
      { md: 200, inc: 5, azi: 182 },
    ];

    expect(() => validateSurveyList(surveys)).not.toThrow();
  });

  it("rechaza una lista vacía / rejects an empty list", () => {
    expect(() => validateSurveyList([])).toThrow();
  });

  it("rechaza una lista donde el MD no aumenta / rejects a list where MD does not increase", () => {
    const surveys = [
      { md: 0, inc: 0, azi: 0 },
      { md: 100, inc: 2, azi: 180 },
      { md: 100, inc: 5, azi: 182 },
    ];

    expect(() => validateSurveyList(surveys)).toThrow();
  });
});