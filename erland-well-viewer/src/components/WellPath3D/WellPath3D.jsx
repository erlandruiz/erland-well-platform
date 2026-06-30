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

/*
 * Español:
 * Devuelve una escala de color para la barra vertical MD
 * según el modo de visualización seleccionado.
 *
 * English:
 * Returns a color scale for the vertical MD colorbar
 * based on the selected display mode.
 */
function getMdColorScale(trajectoryDisplayMode) {
  if (trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.PLANNED) {
    return [
      [0, "#0f172a"],
      [0.2, "#1e3a8a"],
      [0.45, "#2563eb"],
      [0.7, "#38bdf8"],
      [1, "#e0f2fe"],
    ];
  }

  if (trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.ACTUAL) {
    return [
      [0, "#1c1917"],
      [0.2, "#9a3412"],
      [0.45, "#ea580c"],
      [0.7, "#f59e0b"],
      [1, "#fef3c7"],
    ];
  }

  return "Viridis";
}

/*
 * Español:
 * Devuelve el título de la barra MD para que también sea más claro.
 *
 * English:
 * Returns the MD colorbar title so it is also clearer.
 */
function getMdColorbarTitle(trajectoryDisplayMode, unitConfig) {
  if (trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.PLANNED) {
    return `Planned<br>MD<br>(${unitConfig.lengthUnit})`;
  }

  if (trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.ACTUAL) {
    return `Actual<br>MD<br>(${unitConfig.lengthUnit})`;
  }

  return `MD<br>(${unitConfig.lengthUnit})`;
}

/*
 * Español:
 * Ajusta el tamaño de la barra MD según el ancho de pantalla.
 * En celular usamos valores más compactos para evitar que el gráfico
 * se desplace demasiado hacia la izquierda.
 *
 * English:
 * Adjusts the MD colorbar size based on screen width.
 * On mobile, we use more compact values to prevent the chart
 * from shifting too far to the left.
 */
function getColorbarResponsiveStyle() {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 430;

  if (isMobile) {
    return {
      titleFontSize: 10,
      tickFontSize: 9,
      thickness: 12,
      xpad: 4,
    };
  }

  return {
    titleFontSize: 13,
    tickFontSize: 12,
    thickness: 24,
    xpad: 10,
  };
}

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

function getMaxMdFromTrajectories(...trajectories) {
  const mdValues = trajectories
    .flat()
    .map((row) => row.md)
    .filter((md) => Number.isFinite(md));

  return Math.max(...mdValues, 0);
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

    /*
     * Español:
     * La línea mantiene el color técnico de la trayectoria:
     * Planned azul, Actual naranja.
     *
     * English:
     * The line keeps the technical trajectory color:
     * Planned blue, Actual orange.
     */
    line: {
      width: 7,
      color,
      dash,
    },

    /*
     * Español:
     * Los marcadores recuperan la escala visual por MD.
     * La barra aparece una sola vez según el modo seleccionado.
     *
     * English:
     * Markers restore the visual MD scale.
     * The colorbar appears only once depending on the selected mode.
     */
    marker: {
      size: 5,
      color,
    },

    hovertemplate: "%{text}<extra></extra>",
  };
}

function createMdColorbarTrace({ maxMd, unitConfig, trajectoryDisplayMode }) {
  const colorbarStyle = getColorbarResponsiveStyle();
  return {
    x: [0, 0],
    y: [0, 0],
    z: [0, 0],
    type: "scatter3d",
    mode: "markers",
    name: "MD Scale",
    showlegend: false,
    hoverinfo: "skip",
    marker: {
      size: 0.1,
      opacity: 0,

      /*
       * Español:
       * Esta traza solo crea una escala visual de MD.
       * No pinta las trayectorias Planned ni Actual.
       *
       * English:
       * This trace only creates a visual MD scale.
       * It does not color the Planned or Actual trajectories.
       */
      color: [-maxMd, 0],
      cmin: -maxMd,
      cmax: 0,
      colorscale: getMdColorScale(trajectoryDisplayMode),
      showscale: true,
      colorbar: {
        title: {
          text: getMdColorbarTitle(trajectoryDisplayMode, unitConfig),
          font: {
            size: colorbarStyle.titleFontSize,
          },
        },
        tickfont: {
          size: colorbarStyle.tickFontSize,
        },
        thickness: colorbarStyle.thickness,
        xpad: colorbarStyle.xpad,
        tickvals: [-maxMd, -maxMd / 2, 0],
        ticktext: [formatFixed(maxMd, 2), formatFixed(maxMd / 2, 2), "0.00"],
      },
    },
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

  const plannedMaxMd = getMaxMdFromTrajectories(plannedTrajectory);
  const actualMaxMd = getMaxMdFromTrajectories(actualTrajectory);

  const visibleMaxMd = getMaxMdFromTrajectories(
    showPlanned ? plannedTrajectory : [],
    showActual ? actualTrajectory : [],
  );

  const actualProgressPercent =
    plannedMaxMd > 0 ? Math.min((actualMaxMd / plannedMaxMd) * 100, 100) : 0;

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

    visibleMaxMd > 0 &&
      createMdColorbarTrace({
        maxMd: visibleMaxMd,
        unitConfig,
        trajectoryDisplayMode,
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
            TD Planned: {formatFixed(plannedMaxMd, 2)} {unitConfig.lengthUnit}
          </span>

          <span>
            TD Actual: {formatFixed(actualMaxMd, 2)} {unitConfig.lengthUnit}
          </span>

          {trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.ACTUAL && (
            <span>Real Progress: {formatFixed(actualProgressPercent, 2)}%</span>
          )}
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
