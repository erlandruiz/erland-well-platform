import { calculateMinimumCurvature } from "./minimumCurvature.js";
import { calculateVerticalSection } from "./verticalSection.js";

/**
 * Calcula la trayectoria usando Minimum Curvature y agrega Vertical Section.
 * Calculates the trajectory using Minimum Curvature and adds Vertical Section.
 *
 * Esta función mantiene intacto el resultado original de Minimum Curvature
 * y añade el campo `verticalSection` a cada estación calculada.
 *
 * This function keeps the original Minimum Curvature result intact
 * and adds the `verticalSection` field to each calculated station.
 *
 * @param {Array<object>} surveys - Lista de estaciones survey / Survey station list.
 * @param {object} options - Opciones de cálculo / Calculation options.
 * @param {number} [options.verticalSectionDirection=0] - Dirección VS en grados / VS direction in degrees.
 * @returns {Array<object>} Trayectoria con Vertical Section / Trajectory with Vertical Section.
 */
export function calculateTrajectoryWithVerticalSection(surveys, options = {}) {
  const { verticalSectionDirection = 0, ...minimumCurvatureOptions } = options;

  const trajectory = calculateMinimumCurvature(surveys, minimumCurvatureOptions);

  return trajectory.map((station) => ({
    ...station,
    verticalSection: calculateVerticalSection(
      station.north,
      station.east,
      verticalSectionDirection,
    ),
  }));
}