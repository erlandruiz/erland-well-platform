import { DLS_COURSE_LENGTH } from "../constants/units.js";
import { degToRad, radToDeg } from "../math/angles.js";
import { validateSurveyList } from "../validation/surveyValidator.js";
import { calculateDoglegRad } from "./dogleg.js";
import { calculateRatioFactor } from "./ratioFactor.js";
import { calculateDls } from "./dls.js";

/**
 * Calcula la trayectoria de un pozo usando el método Minimum Curvature.
 * Calculates a well trajectory using the Minimum Curvature method.
 *
 * ESPAÑOL:
 * Recibe estaciones de survey con MD, INC y AZI.
 * Devuelve TVD, North, East, Dogleg, Ratio Factor y DLS.
 *
 * ENGLISH:
 * Receives survey stations with MD, INC and AZI.
 * Returns TVD, North, East, Dogleg, Ratio Factor and DLS.
 *
 * @param {Array} surveys - Lista de surveys / Survey list
 * @param {Object} options - Opciones de cálculo / Calculation options
 * @returns {Array} Resultados calculados / Calculated results
 */
export function calculateMinimumCurvature(surveys, options = {}) {
  const {
    dlsCourseLength = DLS_COURSE_LENGTH.FEET,
    initialTvd = 0,
    initialNorth = 0,
    initialEast = 0,
  } = options;

  validateSurveyList(surveys);

  const results = [
    {
      md: surveys[0].md,
      inc: surveys[0].inc,
      azi: surveys[0].azi,
      deltaMd: 0,
      doglegDeg: 0,
      doglegRad: 0,
      ratioFactor: 1,
      deltaTvd: 0,
      tvd: initialTvd,
      deltaNorth: 0,
      north: initialNorth,
      deltaEast: 0,
      east: initialEast,
      dls: 0,
    },
  ];

  for (let i = 1; i < surveys.length; i++) {
    const previousSurvey = surveys[i - 1];
    const currentSurvey = surveys[i];

    const previousResult = results[i - 1];

    const deltaMd = currentSurvey.md - previousSurvey.md;

    if (deltaMd <= 0) {
      throw new Error(
        `MD inválido en la fila ${i + 1}. El MD debe ser mayor que el anterior / Invalid MD at row ${i + 1}. MD must be greater than the previous one.`,
      );
    }

    const inc1Rad = degToRad(previousSurvey.inc);
    const inc2Rad = degToRad(currentSurvey.inc);
    const azi1Rad = degToRad(previousSurvey.azi);
    const azi2Rad = degToRad(currentSurvey.azi);

    const doglegRad = calculateDoglegRad(
      previousSurvey.inc,
      previousSurvey.azi,
      currentSurvey.inc,
      currentSurvey.azi,
    );

    const doglegDeg = radToDeg(doglegRad);
    const ratioFactor = calculateRatioFactor(doglegRad);

    const deltaTvd =
      (deltaMd / 2) * (Math.cos(inc1Rad) + Math.cos(inc2Rad)) * ratioFactor;

    const deltaNorth =
      (deltaMd / 2) *
      (Math.sin(inc1Rad) * Math.cos(azi1Rad) +
        Math.sin(inc2Rad) * Math.cos(azi2Rad)) *
      ratioFactor;

    const deltaEast =
      (deltaMd / 2) *
      (Math.sin(inc1Rad) * Math.sin(azi1Rad) +
        Math.sin(inc2Rad) * Math.sin(azi2Rad)) *
      ratioFactor;

    const tvd = previousResult.tvd + deltaTvd;
    const north = previousResult.north + deltaNorth;
    const east = previousResult.east + deltaEast;

    const dls = calculateDls(doglegDeg, deltaMd, dlsCourseLength);

    results.push({
      md: currentSurvey.md,
      inc: currentSurvey.inc,
      azi: currentSurvey.azi,
      deltaMd,
      doglegDeg,
      doglegRad,
      ratioFactor,
      deltaTvd,
      tvd,
      deltaNorth,
      north,
      deltaEast,
      east,
      dls,
    });
  }

  return results;
}
