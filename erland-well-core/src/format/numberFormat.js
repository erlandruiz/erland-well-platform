/**
 * Limpia pequeños errores de precisión decimal.
 * Cleans small floating-point precision errors.
 *
 * ESPAÑOL:
 * Si un número está muy cerca de cero, devuelve 0.
 * Si un número está muy cerca de un entero, devuelve ese entero.
 *
 * ENGLISH:
 * If a number is very close to zero, returns 0.
 * If a number is very close to an integer, returns that integer.
 */
export function cleanFloatingPoint(value, tolerance = 1e-12) {
  const number = Number(value);

  if (Math.abs(number) < tolerance) {
    return 0;
  }

  const nearestInteger = Math.round(number);

  if (Math.abs(number - nearestInteger) < tolerance) {
    return nearestInteger;
  }

  return number;
}

/**
 * Redondea un número a una cantidad específica de decimales.
 * Rounds a number to a specific number of decimal places.
 *
 * ESPAÑOL:
 * Esta función devuelve un número.
 * Usar principalmente para visualización o exportación.
 *
 * ENGLISH:
 * This function returns a number.
 * Use mainly for displaying or exporting results.
 */
export function roundTo(value, decimals = 15) {
  const cleanedValue = cleanFloatingPoint(value);
  const factor = 10 ** decimals;

  return Math.round(cleanedValue * factor) / factor;
}

/**
 * Formatea un número con decimales fijos.
 * Formats a number with fixed decimal places.
 *
 * ESPAÑOL:
 * Usar solo para mostrar o exportar resultados.
 * No usar para cálculos internos.
 *
 * ENGLISH:
 * Use only for displaying or exporting results.
 * Do not use for internal calculations.
 */
export function formatFixed(value, decimals = 15) {
  return roundTo(value, decimals).toFixed(decimals);
}