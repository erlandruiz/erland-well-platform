import { degToRad } from "../math/angles.js";

/**
 * Calcula la sección vertical proyectando North/East sobre una dirección dada.
 * Calculates vertical section by projecting North/East onto a given direction.
 *
 * Fórmula / Formula:
 * VS = North * cos(direction) + East * sin(direction)
 *
 * @param {number} north - Coordenada norte / North coordinate.
 * @param {number} east - Coordenada este / East coordinate.
 * @param {number} verticalSectionDirectionDeg - Dirección de sección vertical en grados / Vertical section direction in degrees.
 * @returns {number} Sección vertical calculada / Calculated vertical section.
 */
export function calculateVerticalSection(
  north,
  east,
  verticalSectionDirectionDeg,
) {
  const directionRad = degToRad(verticalSectionDirectionDeg);

  return north * Math.cos(directionRad) + east * Math.sin(directionRad);
}