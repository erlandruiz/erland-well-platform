/**
 * Convierte grados a radianes.
 * Converts degrees to radians.
 *
 * JavaScript Math functions such as Math.sin(), Math.cos()
 * and Math.tan() work with radians, not degrees.
 */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Convierte radianes a grados.
 * Converts radians to degrees.
 */
export function radToDeg(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Limita un valor entre un mínimo y un máximo.
 * Clamps a value between a minimum and a maximum.
 *
 * Esto ayuda a evitar errores matemáticos por redondeo.
 * This helps prevent math errors caused by floating-point rounding.
 *
 * Ejemplo / Example:
 * Math.acos(1.0000000000000002) produce error NaN.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

