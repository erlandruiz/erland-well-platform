import {
  calculateMinimumCurvature,
  formatFixed,
} from "../src/index.js";

const surveys = [
  { md: 0, inc: 0, azi: 0 },
  { md: 100, inc: 2, azi: 180 },
  { md: 200, inc: 5, azi: 182 },
];

const results = calculateMinimumCurvature(surveys);

const formattedResults = results.map((row) => ({
  md: row.md,
  inc: row.inc,
  azi: row.azi,
  deltaMd: formatFixed(row.deltaMd, 15),
  doglegDeg: formatFixed(row.doglegDeg, 15),
  ratioFactor: formatFixed(row.ratioFactor, 15),
  deltaTvd: formatFixed(row.deltaTvd, 15),
  tvd: formatFixed(row.tvd, 15),
  deltaNorth: formatFixed(row.deltaNorth, 15),
  north: formatFixed(row.north, 15),
  deltaEast: formatFixed(row.deltaEast, 15),
  east: formatFixed(row.east, 15),
  dls: formatFixed(row.dls, 15),
}));

console.table(formattedResults);