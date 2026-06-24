/**
 * Convierte grados a radianes.
 * Converts degrees to radians.
 *
 * @param {number} degrees - Ángulo en grados / Angle in degrees.
 * @returns {number} Ángulo en radianes / Angle in radians.
 */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Convierte radianes a grados.
 * Converts radians to degrees.
 *
 * @param {number} radians - Ángulo en radianes / Angle in radians.
 * @returns {number} Ángulo en grados / Angle in degrees.
 */
export function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Limita un valor entre un mínimo y un máximo.
 * Clamps a value between a minimum and a maximum.
 *
 * @param {number} value - Valor de entrada / Input value.
 * @param {number} min - Valor mínimo / Minimum value.
 * @param {number} max - Valor máximo / Maximum value.
 * @returns {number} Valor limitado / Clamped value.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Normaliza un ángulo al rango 0° <= angle < 360°.
 * Normalizes an angle to the range 0° <= angle < 360°.
 *
 * @param {number} angleDeg - Ángulo en grados / Angle in degrees.
 * @returns {number} Ángulo normalizado / Normalized angle.
 */
export function normalizeAngleDeg(angleDeg) {
  return ((angleDeg % 360) + 360) % 360;
}

/**
 * Calcula la diferencia angular más corta entre dos ángulos.
 * Calculates the shortest angular difference between two angles.
 *
 * Fórmula / Formula:
 * difference = actual - reference
 *
 * Resultado / Result:
 * -180° <= difference < 180°
 *
 * Ejemplo / Example:
 * actual = 1°, reference = 359° => +2°
 *
 * @param {number} actualDeg - Ángulo actual / Actual angle.
 * @param {number} referenceDeg - Ángulo de referencia / Reference angle.
 * @returns {number} Diferencia angular / Angular difference.
 */
export function calculateAngleDifferenceDeg(actualDeg, referenceDeg) {
  const actual = normalizeAngleDeg(actualDeg);
  const reference = normalizeAngleDeg(referenceDeg);

  return ((actual - reference + 540) % 360) - 180;
}

/**
 * Interpola angularmente usando la diferencia angular más corta.
 * Interpolates angles using the shortest angular difference.
 *
 * Esto evita errores cuando el azimuth cruza 0°/360°.
 * This avoids errors when azimuth crosses 0°/360°.
 *
 * @param {number} startDeg - Ángulo inicial / Start angle.
 * @param {number} endDeg - Ángulo final / End angle.
 * @param {number} factor - Factor entre 0 y 1 / Factor between 0 and 1.
 * @returns {number} Ángulo interpolado / Interpolated angle.
 */
export function interpolateAngleDeg(startDeg, endDeg, factor) {
  const angularDifference = calculateAngleDifferenceDeg(endDeg, startDeg);

  return normalizeAngleDeg(startDeg + angularDifference * factor);
}

