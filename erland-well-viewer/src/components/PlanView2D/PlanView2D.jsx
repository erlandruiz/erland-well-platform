import Plot from "react-plotly.js";
import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./PlanView2D.css";

function PlanView2D({ results, unitSystem }) {
  const unitConfig = getUnitConfig(unitSystem);

  const eastValues = results.map((row) => row.east);
  const northValues = results.map((row) => row.north);
  const mdValues = results.map((row) => row.md);

  const firstStation = results[0];
  const lastStation = results[results.length - 1];

  const maxMd = Math.max(...mdValues, 0);
  const mdColorValues = mdValues.map((md) => -md);

  const horizontalOffsets = results.map((row) =>
    Math.sqrt(row.north ** 2 + row.east ** 2)
  );

  const maxHorizontalOffset = Math.max(...horizontalOffsets, 0);

  const hoverText = results.map(
    (row, index) =>
      `Station: ${index + 1}<br>` +
      `MD: ${formatFixed(row.md, 2)} ${unitConfig.lengthUnit}<br>` +
      `INC: ${formatFixed(row.inc, 2)} ${unitConfig.angleUnit}<br>` +
      `AZI: ${formatFixed(row.azi, 2)} ${unitConfig.angleUnit}<br>` +
      `TVD: ${formatFixed(row.tvd, 15)} ${unitConfig.lengthUnit}<br>` +
      `North: ${formatFixed(row.north, 15)} ${unitConfig.lengthUnit}<br>` +
      `East: ${formatFixed(row.east, 15)} ${unitConfig.lengthUnit}<br>` +
      `DLS: ${formatFixed(row.dls, 15)} ${unitConfig.dlsUnit}`
  );

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
          <span>Stations: {results.length}</span>
          <span>
            TD: {formatFixed(lastStation?.md ?? 0, 2)} {unitConfig.lengthUnit}
          </span>
          <span>
            Max Offset: {formatFixed(maxHorizontalOffset, 2)}{" "}
            {unitConfig.lengthUnit}
          </span>
        </div>
      </div>

      <Plot
        data={[
          {
            x: eastValues,
            y: northValues,
            text: hoverText,
            type: "scatter",
            mode: "lines+markers",
            name: "Well Path",
            line: {
              width: 3,
              color: "#38bdf8",
            },
            marker: {
              size: 8,
              color: mdColorValues,
              cmin: -maxMd,
              cmax: 0,
              colorscale: "Viridis",
              colorbar: {
                title: {
                  text: `MD (${unitConfig.lengthUnit})`,
                },
                tickvals: [-maxMd, -maxMd / 2, 0],
                ticktext: [
                  formatFixed(maxMd, 2),
                  formatFixed(maxMd / 2, 2),
                  "0.00",
                ],
              },
            },
            hovertemplate: "%{text}<extra></extra>",
          },
          {
            x: [firstStation?.east ?? 0],
            y: [firstStation?.north ?? 0],
            type: "scatter",
            mode: "markers+text",
            name: "Wellhead",
            text: ["Wellhead"],
            textposition: "top center",
            marker: {
              size: 12,
              color: "#22c55e",
            },
            hovertemplate:
              `Wellhead<br>` +
              `East: %{x} ${unitConfig.lengthUnit}<br>` +
              `North: %{y} ${unitConfig.lengthUnit}<extra></extra>`,
          },
          {
            x: [lastStation?.east ?? 0],
            y: [lastStation?.north ?? 0],
            type: "scatter",
            mode: "markers+text",
            name: "TD",
            text: ["TD"],
            textposition: "bottom center",
            marker: {
              size: 12,
              color: "#f97316",
            },
            hovertemplate:
              `TD<br>` +
              `MD: ${formatFixed(lastStation?.md ?? 0, 2)} ${
                unitConfig.lengthUnit
              }<br>` +
              `East: %{x} ${unitConfig.lengthUnit}<br>` +
              `North: %{y} ${unitConfig.lengthUnit}<extra></extra>`,
          },
        ]}
        layout={{
          autosize: true,
          title: {
            text: `Plan View - East vs North (${unitConfig.lengthUnit})`,
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