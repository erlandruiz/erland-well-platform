import { calculateAngleDifferenceDeg } from "../math/angles.js";
import { interpolateTrajectoryAtMd } from "../interpolation/trajectoryInterpolation.js";

const DEFAULT_COMPARISON_FIELDS = [
  "inc",
  "azi",
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
 * Calcula delta normal: actual - planned.
 * Calculates regular delta: actual - planned.
 *
 * @param {number | undefined} actualValue - Valor real / Actual value.
 * @param {number | undefined} plannedValue - Valor planificado / Planned value.
 * @returns {number | null} Delta calculado / Calculated delta.
 */
function calculateDelta(actualValue, plannedValue) {
  if (!isValidNumber(actualValue) || !isValidNumber(plannedValue)) {
    return null;
  }

  return actualValue - plannedValue;
}

/**
 * Calcula delta para un campo específico.
 * Calculates delta for a specific field.
 *
 * Para AZI usa diferencia angular corta.
 * For AZI it uses shortest angular difference.
 *
 * @param {string} field - Nombre del campo / Field name.
 * @param {object} actualStation - Estación real / Actual station.
 * @param {object} plannedStation - Estación planificada interpolada / Interpolated planned station.
 * @returns {number | null} Delta calculado / Calculated delta.
 */
function calculateFieldDelta(field, actualStation, plannedStation) {
  if (field === "azi") {
    if (!isValidNumber(actualStation.azi) || !isValidNumber(plannedStation.azi)) {
      return null;
    }

    return calculateAngleDifferenceDeg(actualStation.azi, plannedStation.azi);
  }

  return calculateDelta(actualStation[field], plannedStation[field]);
}

/**
 * Compara una trayectoria real contra una trayectoria propuesta interpolada.
 * Compares an actual trajectory against an interpolated planned trajectory.
 *
 * Esta función está pensada para casos reales donde MD, INC y AZI no coinciden.
 * This function is designed for real cases where MD, INC, and AZI do not match.
 *
 * Flujo / Flow:
 * 1. Toma cada estación real.
 * 2. Interpola la trayectoria propuesta al MD real.
 * 3. Compara actual calculado vs propuesto interpolado.
 *
 * 1. Takes each actual station.
 * 2. Interpolates the planned trajectory at the actual MD.
 * 3. Compares calculated actual vs interpolated planned.
 *
 * @param {Array<object>} plannedTrajectory - Trayectoria propuesta calculada / Calculated planned trajectory.
 * @param {Array<object>} actualTrajectory - Trayectoria real calculada / Calculated actual trajectory.
 * @param {object} options - Opciones / Options.
 * @param {Array<string>} [options.fields] - Campos a comparar / Fields to compare.
 * @param {number} [options.mdPrecision=6] - Precisión MD / MD precision.
 * @returns {object} Resultado de comparación / Comparison result.
 */
export function comparePlannedActualByInterpolatedMd(
  plannedTrajectory,
  actualTrajectory,
  options = {},
) {
  const { fields = DEFAULT_COMPARISON_FIELDS, mdPrecision = 6 } = options;

  if (!Array.isArray(plannedTrajectory)) {
    throw new Error(
      "plannedTrajectory debe ser un array / plannedTrajectory must be an array.",
    );
  }

  if (!Array.isArray(actualTrajectory)) {
    throw new Error(
      "actualTrajectory debe ser un array / actualTrajectory must be an array.",
    );
  }

  const matched = [];
  const unmatchedActual = [];

  for (const actualStation of actualTrajectory) {
    const plannedStation = interpolateTrajectoryAtMd(
      plannedTrajectory,
      actualStation.md,
      {
        mdPrecision,
      },
    );

    if (!plannedStation) {
      unmatchedActual.push(actualStation);
      continue;
    }

    const deltas = {};

    for (const field of fields) {
      deltas[field] = calculateFieldDelta(
        field,
        actualStation,
        plannedStation,
      );
    }

    const deltaNorth = deltas.north;
    const deltaEast = deltas.east;

    const deltaClosureDistance =
      isValidNumber(deltaNorth) && isValidNumber(deltaEast)
        ? Math.sqrt(deltaNorth ** 2 + deltaEast ** 2)
        : null;

    matched.push({
      md: actualStation.md,
      planned: plannedStation,
      actual: actualStation,
      plannedWasInterpolated: plannedStation.interpolated,

      deltas,

      deltaInc: deltas.inc,
      deltaAzi: deltas.azi,
      deltaTvd: deltas.tvd,
      deltaNorth: deltas.north,
      deltaEast: deltas.east,
      deltaVerticalSection: deltas.verticalSection,
      deltaDls: deltas.dls,
      deltaClosureDistance,
    });
  }

  return {
    matched,
    unmatchedActual,
  };
}