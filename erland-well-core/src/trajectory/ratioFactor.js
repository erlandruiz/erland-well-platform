/**
 * Calcula el Ratio Factor para el método Minimum Curvature.
 * Calculates the Ratio Factor for the Minimum Curvature method.
 *
 * ESPAÑOL:
 * El Ratio Factor suaviza la trayectoria entre dos estaciones de survey.
 * Si el Dogleg es casi cero, el RF debe ser 1 para evitar división entre cero.
 *
 * ENGLISH:
 * The Ratio Factor smooths the trajectory between two survey stations.
 * If the Dogleg is almost zero, RF must be 1 to avoid division by zero.
 *
 * Fórmula / Formula:
 * RF = (2 / DL) * tan(DL / 2)
 *
 * Donde / Where:
 * DL = Dogleg Angle en radianes / Dogleg Angle in radians
 */
export function calculateRatioFactor(doglegRad) {
  if (Math.abs(doglegRad) < 1e-12) {
    return 1;
  }

  return (2 / doglegRad) * Math.tan(doglegRad / 2);
}