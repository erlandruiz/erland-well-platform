/**
 * Calcula el Dogleg Severity.
 * Calculates Dogleg Severity.
 *
 * ESPAÑOL:
 * El DLS indica qué tan severo es el cambio angular del pozo
 * en una distancia determinada.
 *
 * ENGLISH:
 * DLS indicates how severe the angular change of the well is
 * over a given course length.
 *
 * Fórmula / Formula:
 * DLS = (DoglegDeg * CourseLength) / DeltaMD
 *
 * Ejemplo / Example:
 * doglegDeg = 2
 * deltaMd = 100
 * courseLength = 100
 *
 * DLS = (2 * 100) / 100 = 2 grados / 100 ft
 */
export function calculateDls(doglegDeg, deltaMd, dlsCourseLength) {
  if (deltaMd <= 0) {
    throw new Error(
      "deltaMd debe ser mayor que 0 / deltaMd must be greater than 0."
    );
  }

  return (doglegDeg * dlsCourseLength) / deltaMd;
}