import { degToRad, radToDeg, clamp } from "../math/angles.js";

/**
 * Calcula el Dogleg Angle en radianes.
 * Calculates the Dogleg Angle in radians.
 *
 * El Dogleg representa el cambio angular entre dos estaciones de survey.
 * Dogleg represents the angular change between two survey stations.
 *
 * Entradas / Inputs:
 * - inc1Deg: inclinación inicial en grados / initial inclination in degrees
 * - azi1Deg: azimut inicial en grados / initial azimuth in degrees
 * - inc2Deg: inclinación final en grados / final inclination in degrees
 * - azi2Deg: azimut final en grados / final azimuth in degrees
 */
export function calculateDoglegRad(inc1Deg, azi1Deg, inc2Deg, azi2Deg) {
  const inc1 = degToRad(inc1Deg);
  const inc2 = degToRad(inc2Deg);
  const azi1 = degToRad(azi1Deg);
  const azi2 = degToRad(azi2Deg);

  const cosDogleg =
    Math.cos(inc1) * Math.cos(inc2) +
    Math.sin(inc1) * Math.sin(inc2) * Math.cos(azi2 - azi1);

  return Math.acos(clamp(cosDogleg, -1, 1));
}

/**
 * Calcula el Dogleg Angle en grados.
 * Calculates the Dogleg Angle in degrees.
 */
export function calculateDoglegDeg(inc1Deg, azi1Deg, inc2Deg, azi2Deg) {
  const doglegRad = calculateDoglegRad(inc1Deg, azi1Deg, inc2Deg, azi2Deg);

  return radToDeg(doglegRad);
}