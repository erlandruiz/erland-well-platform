import { DLS_COURSE_LENGTH } from "erland-well-core";

const FT_TO_M = 0.3048;

export const UNIT_SYSTEMS = {
  feet: {
    label: "Feet",
    lengthUnit: "ft",
    angleUnit: "deg",
    dlsUnit: "deg/100 ft",
    dlsCourseLength: DLS_COURSE_LENGTH.FEET,
    addMdInterval: 100,
  },
  meters: {
    label: "Meters",
    lengthUnit: "m",
    angleUnit: "deg",
    dlsUnit: "deg/30 m",
    dlsCourseLength: DLS_COURSE_LENGTH.METERS,
    addMdInterval: 30,
  },
};

export function getUnitConfig(unitSystem) {
  return UNIT_SYSTEMS[unitSystem] ?? UNIT_SYSTEMS.feet;
}

export function convertLength(value, fromUnitSystem, toUnitSystem) {
  if (fromUnitSystem === toUnitSystem) {
    return value;
  }

  if (fromUnitSystem === "feet" && toUnitSystem === "meters") {
    return value * FT_TO_M;
  }

  if (fromUnitSystem === "meters" && toUnitSystem === "feet") {
    return value / FT_TO_M;
  }

  return value;
}