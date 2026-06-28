import Plot from "react-plotly.js";
import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./PlanView2D.css";

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
    text: createHoverText(results, unitConfig, name),
    type: "scatter",
    mode: "lines+markers",
    name,
    line: {
      width: 3,
      color,
      dash,
    },
    marker: {
      size: 7,
      color,
    },
    hovertemplate: "%{text}<extra></extra>",
  };
}

function createTdTrace({ station, unitConfig, name, color }) {
  return {
    x: [station?.east ?? 0],
    y: [station?.north ?? 0],
    type: "scatter",
    mode: "markers+text",
    name,
    text: [name],
    textposition: "bottom center",
    marker: {
      size: 12,
      color,
    },
    hovertemplate:
      `${name}<br>` +
      `MD: ${formatFixed(station?.md ?? 0, 2)} ${unitConfig.lengthUnit}<br>` +
      `East: %{x} ${unitConfig.lengthUnit}<br>` +
      `North: %{y} ${unitConfig.lengthUnit}<extra></extra>`,
  };
}

function PlanView2D({
  results = [],
  plannedResults,
  actualResults,
  unitSystem,
  trajectoryDisplayMode = TRAJECTORY_DISPLAY_MODES.ACTUAL,
}) {
  const unitConfig = getUnitConfig(unitSystem);

  /*
   * Compatibilidad temporal:
   * Si App.jsx todavía envía solo `results`, usamos eso como actual.
   *
   * Temporary compatibility:
   * If App.jsx still sends only `results`, we use it as actual.
   */
  const plannedTrajectory = plannedResults ?? results;
  const actualTrajectory = actualResults ?? results;

  const shouldShowPlanned =
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.PLANNED ||
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.BOTH;

  const shouldShowActual =
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.ACTUAL ||
    trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.BOTH;

  const visibleTrajectories = [
    ...(shouldShowPlanned ? plannedTrajectory : []),
    ...(shouldShowActual ? actualTrajectory : []),
  ];

  const firstStation =
    actualTrajectory[0] ?? plannedTrajectory[0] ?? visibleTrajectories[0];

  const lastPlannedStation = plannedTrajectory[plannedTrajectory.length - 1];
  const lastActualStation = actualTrajectory[actualTrajectory.length - 1];

  const horizontalOffsets = visibleTrajectories.map((row) =>
    Math.sqrt(row.north ** 2 + row.east ** 2),
  );

  const maxHorizontalOffset = Math.max(...horizontalOffsets, 0);

  const plotData = [];

  if (shouldShowPlanned && plannedTrajectory.length > 0) {
    plotData.push(
      createTrajectoryTrace({
        results: plannedTrajectory,
        unitConfig,
        name: "Planned",
        color: TRAJECTORY_COLORS.planned,
        dash: "dash",
      }),
    );

    plotData.push(
      createTdTrace({
        station: lastPlannedStation,
        unitConfig,
        name: "TD Planned",
        color: TRAJECTORY_COLORS.planned,
      }),
    );
  }

  if (shouldShowActual && actualTrajectory.length > 0) {
    plotData.push(
      createTrajectoryTrace({
        results: actualTrajectory,
        unitConfig,
        name: "Actual",
        color: TRAJECTORY_COLORS.actual,
        dash: "solid",
      }),
    );

    plotData.push(
      createTdTrace({
        station: lastActualStation,
        unitConfig,
        name: "TD Actual",
        color: TRAJECTORY_COLORS.actual,
      }),
    );
  }

  plotData.push({
    x: [firstStation?.east ?? 0],
    y: [firstStation?.north ?? 0],
    type: "scatter",
    mode: "markers+text",
    name: "Wellhead",
    text: ["Wellhead"],
    textposition: "top center",
    marker: {
      size: 12,
      color: TRAJECTORY_COLORS.wellhead,
    },
    hovertemplate:
      `Wellhead<br>` +
      `East: %{x} ${unitConfig.lengthUnit}<br>` +
      `North: %{y} ${unitConfig.lengthUnit}<extra></extra>`,
  });

  return (
    <section className="plan-view-2d">
      <div className="plan-view-2d__header">
        <div>
          <h2 className="plan-view-2d__title">
            Vista Planta 2D / Plan View 2D
          </h2>

          <p className="plan-view-2d__description">
            Trayectoria horizontal del pozo usando East vs North.
          </p>
        </div>

        <div className="plan-view-2d__summary">
          <span>Planned: {plannedTrajectory.length}</span>
          <span>Actual: {actualTrajectory.length}</span>
          <span>
            Max Offset: {formatFixed(maxHorizontalOffset, 2)}{" "}
            {unitConfig.lengthUnit}
          </span>
        </div>
      </div>

      <Plot
        data={plotData}
        layout={{
          autosize: true,
          title: {
            text: `Plan View<br><sup>East vs North (${unitConfig.lengthUnit})</sup>`,
            x: 0.5,
            xanchor: "center",
            font: {
              size: 14,
            },
          },
          xaxis: {
            title: {
              text: `East (${unitConfig.lengthUnit})`,
            },
            zeroline: true,
            zerolinecolor: "#64748b",
            gridcolor: "#334155",
          },
          yaxis: {
            title: {
              text: `North (${unitConfig.lengthUnit})`,
            },
            zeroline: true,
            zerolinecolor: "#64748b",
            gridcolor: "#334155",
            scaleanchor: "x",
            scaleratio: 1,
          },
          legend: {
            orientation: "h",
            x: 0,
            y: 1.12,
          },
          margin: {
            l: 70,
            r: 30,
            t: 90,
            b: 70,
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
        className="plan-view-2d__chart"
        useResizeHandler
      />
    </section>
  );
}

export default PlanView2D;