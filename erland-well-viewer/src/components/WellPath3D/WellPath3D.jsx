import Plot from "react-plotly.js";
import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./WellPath3D.css";

const TRAJECTORY_DISPLAY_MODES = {
  PLANNED: "planned",
  ACTUAL: "actual",
  BOTH: "both",
};

const TRAJECTORY_COLORS = {
  planned: "#38bdf8",
  actual: "#f59e0b",
  wellhead: "#22c55e",
};

function createHoverText(results, unitConfig, label) {
  return results.map(
    (row, index) =>
      `${label}<br>` +
      `Station: ${index + 1}<br>` +
      `MD: ${formatFixed(row.md, 2)} ${unitConfig.lengthUnit}<br>` +
      `INC: ${formatFixed(row.inc, 2)} ${unitConfig.angleUnit}<br>` +
      `AZI: ${formatFixed(row.azi, 2)} ${unitConfig.angleUnit}<br>` +
      `TVD: ${formatFixed(row.tvd, 15)} ${unitConfig.lengthUnit}<br>` +
      `North: ${formatFixed(row.north, 15)} ${unitConfig.lengthUnit}<br>` +
      `East: ${formatFixed(row.east, 15)} ${unitConfig.lengthUnit}<br>` +
      `DLS: ${formatFixed(row.dls, 15)} ${unitConfig.dlsUnit}`,
  );
}

function createTrajectoryTrace({
  results,
  unitConfig,
  name,
  color,
  dash = "solid",
}) {
  return {
    x: results.map((row) => row.east),
    y: results.map((row) => row.north),
    z: results.map((row) => row.tvd),
    text: createHoverText(results, unitConfig, name),
    type: "scatter3d",
    mode: "lines+markers",
    name,
    line: {
      width: 7,
      color,
      dash,
    },
    marker: {
      size: 4,
      color,
    },
    hovertemplate: "%{text}<extra></extra>",
  };
}

function createTdTrace({ station, unitConfig, name, color }) {
  if (!station) {
    return null;
  }

  return {
    x: [station.east],
    y: [station.north],
    z: [station.tvd],
    type: "scatter3d",
    mode: "markers+text",
    name,
    text: [name],
    textposition: "bottom center",
    marker: {
      size: 8,
      color,
    },
    hovertemplate:
      `${name}<br>` +
      `MD: ${formatFixed(station.md, 2)} ${unitConfig.lengthUnit}<br>` +
      `East: %{x} ${unitConfig.lengthUnit}<br>` +
      `North: %{y} ${unitConfig.lengthUnit}<br>` +
      `TVD: %{z} ${unitConfig.lengthUnit}<extra></extra>`,
  };
}

function WellPath3D({
  results = [],
  plannedResults,
  actualResults,
  unitSystem,
  trajectoryDisplayMode = TRAJECTORY_DISPLAY_MODES.ACTUAL,
}) {
  const unitConfig = getUnitConfig(unitSystem);

  /*
   * Español:
   * Compatibilidad temporal:
   * Si App.jsx todavía envía solo `results`, usamos esos datos como trayectoria actual.
   *
   * English:
   * Temporary compatibility:
   * If App.jsx still sends only `results`, we use those data as the actual trajectory.
   */
  const plannedTrajectory = plannedResults ?? results;
  const actualTrajectory = actualResults ?? results;

  const showPlanned =
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.PLANNED ||
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.BOTH;

  const showActual =
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.ACTUAL ||
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.BOTH;

  const firstStation =
    actualTrajectory[0] ?? plannedTrajectory[0] ?? results[0] ?? null;

  const plannedLastStation = plannedTrajectory[plannedTrajectory.length - 1];
  const actualLastStation = actualTrajectory[actualTrajectory.length - 1];

  const plotData = [
    showPlanned &&
      plannedTrajectory.length > 0 &&
      createTrajectoryTrace({
        results: plannedTrajectory,
        unitConfig,
        name: "Planned",
        color: TRAJECTORY_COLORS.planned,
        dash: "dash",
      }),

    showActual &&
      actualTrajectory.length > 0 &&
      createTrajectoryTrace({
        results: actualTrajectory,
        unitConfig,
        name: "Actual",
        color: TRAJECTORY_COLORS.actual,
      }),

    {
      x: [firstStation?.east ?? 0],
      y: [firstStation?.north ?? 0],
      z: [firstStation?.tvd ?? 0],
      type: "scatter3d",
      mode: "markers+text",
      name: "Wellhead",
      text: ["Wellhead"],
      textposition: "top center",
      marker: {
        size: 8,
        color: TRAJECTORY_COLORS.wellhead,
      },
      hovertemplate:
        `Wellhead<br>` +
        `East: %{x} ${unitConfig.lengthUnit}<br>` +
        `North: %{y} ${unitConfig.lengthUnit}<br>` +
        `TVD: %{z} ${unitConfig.lengthUnit}<extra></extra>`,
    },

    showPlanned &&
      createTdTrace({
        station: plannedLastStation,
        unitConfig,
        name: "TD Planned",
        color: TRAJECTORY_COLORS.planned,
      }),

    showActual &&
      createTdTrace({
        station: actualLastStation,
        unitConfig,
        name: "TD Actual",
        color: TRAJECTORY_COLORS.actual,
      }),
  ].filter(Boolean);

  return (
    <section className="well-path-3d">
      <div className="well-path-3d__header">
        <div>
          <h2 className="well-path-3d__title">Vista 3D / 3D Well Path</h2>

          <p className="well-path-3d__description">
            Trayectoria espacial del pozo usando East, North y TVD.
          </p>
        </div>

        <div className="well-path-3d__summary">
          <span>Planned: {plannedTrajectory.length}</span>
          <span>Actual: {actualTrajectory.length}</span>

          <span>
            TD Actual: {formatFixed(actualLastStation?.md ?? 0, 2)}{" "}
            {unitConfig.lengthUnit}
          </span>
        </div>
      </div>

      <Plot
        data={plotData}
        layout={{
          autosize: true,
          title: {
            text: `3D Well Path - East / North / TVD (${unitConfig.lengthUnit})`,
          },
          scene: {
            xaxis: {
              title: {
                text: `East (${unitConfig.lengthUnit})`,
              },
              backgroundcolor: "#111827",
              gridcolor: "#334155",
              zerolinecolor: "#64748b",
              showspikes: false,
            },
            yaxis: {
              title: {
                text: `North (${unitConfig.lengthUnit})`,
              },
              backgroundcolor: "#111827",
              gridcolor: "#334155",
              zerolinecolor: "#64748b",
              showspikes: false,
            },
            zaxis: {
              title: {
                text: `TVD (${unitConfig.lengthUnit})`,
              },
              backgroundcolor: "#111827",
              gridcolor: "#334155",
              zerolinecolor: "#64748b",
              autorange: "reversed",
              showspikes: false,
            },
            aspectmode: "data",
            camera: {
              eye: {
                x: 1.7,
                y: 1.7,
                z: 1.15,
              },
            },
          },
          legend: {
            orientation: "h",
            x: 0,
            y: 1.08,
          },
          margin: {
            l: 0,
            r: 0,
            t: 80,
            b: 0,
          },
          paper_bgcolor: "#0f172a",
          plot_bgcolor: "#111827",
          font: {
            color: "#e5e7eb",
          },
        }}
        config={{
          responsive: true,
          displaylogo: false,
          scrollZoom: true,
        }}
        className="well-path-3d__chart"
        useResizeHandler
      />
    </section>
  );
}

export default WellPath3D;