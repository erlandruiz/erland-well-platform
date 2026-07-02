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

function getMaxMdFromTrajectories(...trajectories) {
  const mdValues = trajectories
    .flat()
    .map((row) => row.md)
    .filter((md) => Number.isFinite(md));

  return Math.max(...mdValues, 0);
}

/*
 * Español:
 * Devuelve una escala de color para la barra MD según el modo.
 *
 * English:
 * Returns an MD color scale based on the display mode.
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
 * En iPhone usamos una barra más compacta.
 * En desktop mantenemos una barra más visible.
 *
 * English:
 * On iPhone we use a more compact colorbar.
 * On desktop we keep a more visible colorbar.
 */
function getColorbarResponsiveStyle() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 430;

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

/*
 * Español:
 * Ajusta la posición de la leyenda solo en celular.
 * En desktop mantenemos la posición original.
 *
 * English:
 * Adjusts the legend position only on mobile.
 * On desktop, we keep the original position.
 */
function getPlotResponsiveStyle() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 430;

  if (isMobile) {
    return {
      legendX: 0,
      legendY: -0.18,
      legendYAnchor: "top",
      legendFontSize: 8,
      marginTop: 85,
      marginLeft: 55,
      marginBottom: 95,
    };
  }

  return {
    legendX: 0,
    legendY: 1.12,
    legendYAnchor: "bottom",
    legendFontSize: 12,
    marginTop: 90,
    marginLeft: 70,
    marginBottom: 70,
  };
}

/*
 * Español:
 * Ajusta el tamaño de los marcadores según el dispositivo.
 *
 * English:
 * Adjusts marker sizes depending on the device.
 */
function getMarkerResponsiveStyle() {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 430;

  if (isMobile) {
    return {
      trajectoryMarkerSize: 4,
      tdMarkerSize: 6,
      wellheadMarkerSize: 6,
    };
  }

  return {
    trajectoryMarkerSize: 7,
    tdMarkerSize: 12,
    wellheadMarkerSize: 12,
  };
}

function createMdColorbarTrace({ maxMd, unitConfig, trajectoryDisplayMode }) {
  const colorbarStyle = getColorbarResponsiveStyle();

  return {
    x: [0, 0],
    y: [0, 0],
    type: "scatter",
    mode: "markers",
    name: "MD Scale",
    showlegend: false,
    hoverinfo: "skip",
    marker: {
      size: 0.1,
      opacity: 0,

      /*
       * Español:
       * Esta traza solo crea la barra visual de MD.
       * No cambia los colores de las trayectorias.
       *
       * English:
       * This trace only creates the visual MD colorbar.
       * It does not change the trajectory colors.
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
  markerSize,
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
      size: markerSize,
      color,
    },
    hovertemplate: "%{text}<extra></extra>",
  };
}

function createTdTrace({ station, unitConfig, name, color, markerSize }) {
  return {
    x: [station?.east ?? 0],
    y: [station?.north ?? 0],
    type: "scatter",
    mode: "markers+text",
    name,
    text: [name],
    textposition: "bottom center",
    marker: {
      size: markerSize,
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
  const plotResponsiveStyle = getPlotResponsiveStyle();
  const markerStyle = getMarkerResponsiveStyle();

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

  const visibleMaxMd = getMaxMdFromTrajectories(
    shouldShowPlanned ? plannedTrajectory : [],
    shouldShowActual ? actualTrajectory : [],
  );

  const visibleTrajectories = [
    ...(shouldShowPlanned ? plannedTrajectory : []),
    ...(shouldShowActual ? actualTrajectory : []),
  ];

  const firstStation =
    actualTrajectory[0] ?? plannedTrajectory[0] ?? visibleTrajectories[0];

  const lastPlannedStation = plannedTrajectory[plannedTrajectory.length - 1];
  const lastActualStation = actualTrajectory[actualTrajectory.length - 1];

  const plannedMaxMd = lastPlannedStation?.md ?? 0;
  const actualMaxMd = lastActualStation?.md ?? 0;

  const actualProgressPercent =
    plannedMaxMd > 0 ? Math.min((actualMaxMd / plannedMaxMd) * 100, 100) : 0;

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
        markerSize: markerStyle.trajectoryMarkerSize,
        dash: "dash",
      }),
    );

    plotData.push(
      createTdTrace({
        station: lastPlannedStation,
        unitConfig,
        name: "TD Planned",
        color: TRAJECTORY_COLORS.planned,
        markerSize: markerStyle.tdMarkerSize,
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
        markerSize: markerStyle.trajectoryMarkerSize,
        dash: "solid",
      }),
    );

    plotData.push(
      createTdTrace({
        station: lastActualStation,
        unitConfig,
        name: "TD Actual",
        color: TRAJECTORY_COLORS.actual,
        markerSize: markerStyle.tdMarkerSize,
      }),
    );
  }

  if (visibleMaxMd > 0) {
    plotData.push(
      createMdColorbarTrace({
        maxMd: visibleMaxMd,
        unitConfig,
        trajectoryDisplayMode,
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
      size: markerStyle.wellheadMarkerSize,
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
            TD Planned: {formatFixed(plannedMaxMd, 2)} {unitConfig.lengthUnit}
          </span>

          <span>
            TD Actual: {formatFixed(actualMaxMd, 2)} {unitConfig.lengthUnit}
          </span>

          {trajectoryDisplayMode === TRAJECTORY_DISPLAY_MODES.ACTUAL && (
            <span>Real Progress: {formatFixed(actualProgressPercent, 2)}%</span>
          )}

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
            x: plotResponsiveStyle.legendX,
            y: plotResponsiveStyle.legendY,
            yanchor: plotResponsiveStyle.legendYAnchor,
            font: {
              size: plotResponsiveStyle.legendFontSize,
            },
            itemsizing: "trace",
            itemwidth: 22,
            bgcolor: "rgba(15, 23, 42, 0.85)",
          },

          margin: {
            l: plotResponsiveStyle.marginLeft,
            r: 85,
            t: plotResponsiveStyle.marginTop,
            b: plotResponsiveStyle.marginBottom,
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
