import { interpolateAngleDeg } from "../math/angles.js";

const DEFAULT_LINEAR_FIELDS = [
  "inc",
  "deltaMd",
  "doglegDeg",
  "doglegRad",
  "ratioFactor",
  "deltaTvd",
  "tvd",
  "deltaNorth",
  "north",
  "deltaEast",
  "east",
  "verticalSection",
  "dls",
];

const DEFAULT_ANGULAR_FIELDS = ["azi"];

/**
 * Verifica si un valor es un número válido.
 * Checks if a value is a valid number.
 *
 * @param {unknown} value - Valor a evaluar / Value to check.
 * @returns {boolean} Resultado de validación / Validation result.
 */
function isValidNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Interpola linealmente entre dos valores numéricos.
 * Linearly interpolates between two numeric values.
 *
 * @param {number} startValue - Valor inicial / Start value.
 * @param {number} endValue - Valor final / End value.
 * @param {number} factor - Factor entre 0 y 1 / Factor between 0 and 1.
 * @returns {number} Valor interpolado / Interpolated value.
 */
function interpolateNumber(startValue, endValue, factor) {
  return startValue + (endValue - startValue) * factor;
}

/**
 * Interpola una trayectoria calculada en un MD objetivo.
 * Interpolates a calculated trajectory at a target MD.
 *
 * Uso principal:
 * Main use case:
 *
 * - Tomar el MD de una estación real.
 * - Take the MD from an actual survey station.
 *
 * - Interpolar el pozo propuesto en ese mismo MD.
 * - Interpolate the planned well at that same MD.
 *
 * - Comparar actual vs planned interpolated.
 * - Compare actual vs planned interpolated.
 *
 * @param {Array<object>} trajectory - Trayectoria calculada / Calculated trajectory.
 * @param {number} targetMd - MD objetivo / Target MD.
 * @param {object} options - Opciones / Options.
 * @param {Array<string>} [options.linearFields] - Campos lineales / Linear fields.
 * @param {Array<string>} [options.angularFields] - Campos angulares / Angular fields.
 * @param {number} [options.mdPrecision=6] - Precisión MD / MD precision.
 * @returns {object | null} Estación interpolada / Interpolated station.
 */
export function interpolateTrajectoryAtMd(
  trajectory,
  targetMd,
  options = {},
) {
  const {
    linearFields = DEFAULT_LINEAR_FIELDS,
    angularFields = DEFAULT_ANGULAR_FIELDS,
    mdPrecision = 6,
  } = options;

  if (!Array.isArray(trajectory)) {
    throw new Error(
      "trajectory debe ser un array / trajectory must be an array.",
    );
  }

  if (!isValidNumber(targetMd)) {
    throw new Error(
      "targetMd debe ser un número válido / targetMd must be a valid number.",
    );
  }

  if (trajectory.length === 0) {
    return null;
  }

  const tolerance = 10 ** -mdPrecision;
  const sortedTrajectory = [...trajectory].sort((a, b) => a.md - b.md);

  const firstStation = sortedTrajectory[0];
  const lastStation = sortedTrajectory[sortedTrajectory.length - 1];

  if (
    targetMd < firstStation.md - tolerance ||
    targetMd > lastStation.md + tolerance
  ) {
    return null;
  }

  for (const station of sortedTrajectory) {
    if (Math.abs(station.md - targetMd) <= tolerance) {
      return {
        ...station,
        md: targetMd,
        interpolated: false,
        sourceMdStart: station.md,
        sourceMdEnd: station.md,
      };
    }
  }

  for (let index = 0; index < sortedTrajectory.length - 1; index += 1) {
    const startStation = sortedTrajectory[index];
    const endStation = sortedTrajectory[index + 1];

    if (targetMd >= startStation.md && targetMd <= endStation.md) {
      const deltaMd = endStation.md - startStation.md;

      if (Math.abs(deltaMd) <= tolerance) {
        return null;
      }

      const factor = (targetMd - startStation.md) / deltaMd;

      const interpolatedStation = {
        md: targetMd,
        interpolated: true,
        sourceMdStart: startStation.md,
        sourceMdEnd: endStation.md,
      };

      for (const field of linearFields) {
        const startValue = startStation[field];
        const endValue = endStation[field];

        if (isValidNumber(startValue) && isValidNumber(endValue)) {
          interpolatedStation[field] = interpolateNumber(
            startValue,
            endValue,
            factor,
          );
        }
      }

      for (const field of angularFields) {
        const startValue = startStation[field];
        const endValue = endStation[field];

        if (isValidNumber(startValue) && isValidNumber(endValue)) {
          interpolatedStation[field] = interpolateAngleDeg(
            startValue,
            endValue,
            factor,
          );
        }
      }

      return interpolatedStation;
    }
  }

  return null;
}