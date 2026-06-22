import Plot from "react-plotly.js";
import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./WellPath3D.css";

function WellPath3D({ results, unitSystem }) {
  const unitConfig = getUnitConfig(unitSystem);

  const eastValues = results.map((row) => row.east);
  const northValues = results.map((row) => row.north);
  const tvdValues = results.map((row) => row.tvd);
  const mdValues = results.map((row) => row.md);

  const maxMd = Math.max(...mdValues);
  const mdColorValues = mdValues.map((md) => -md);

  const firstStation = results[0];
  const lastStation = results[results.length - 1];

  const hoverText = results.map(
    (row, index) =>
      `Station: ${index + 1}<br>` +
      `MD: ${formatFixed(row.md, 2)} ${unitConfig.lengthUnit}<br>` +
      `INC: ${formatFixed(row.inc, 2)} ${unitConfig.angleUnit}<br>` +
      `AZI: ${formatFixed(row.azi, 2)} ${unitConfig.angleUnit}<br>` +
      `TVD: ${formatFixed(row.tvd, 15)} ${unitConfig.lengthUnit}<br>` +
      `North: ${formatFixed(row.north, 15)} ${unitConfig.lengthUnit}<br>` +
      `East: ${formatFixed(row.east, 15)} ${unitConfig.lengthUnit}<br>` +
      `DLS: ${formatFixed(row.dls, 15)} ${unitConfig.dlsUnit}`,
  );

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
          <span>Stations: {results.length}</span>
          <span>
            TD: {formatFixed(lastStation?.md ?? 0, 2)} {unitConfig.lengthUnit}
          </span>
        </div>
      </div>

      <Plot
        data={[
          {
            x: eastValues,
            y: northValues,
            z: tvdValues,
            text: hoverText,
            type: "scatter3d",
            mode: "lines+markers",
            name: "Well Path",
            line: {
              width: 7,
              color: "#38bdf8",
            },

            marker: {
              size: 5,
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
            z: [firstStation?.tvd ?? 0],
            type: "scatter3d",
            mode: "markers+text",
            name: "Wellhead",
            text: ["Wellhead"],
            textposition: "top center",
            marker: {
              size: 8,
              color: "#22c55e",
            },
            hovertemplate:
              `Wellhead<br>` +
              `East: %{x} ${unitConfig.lengthUnit}<br>` +
              `North: %{y} ${unitConfig.lengthUnit}<br>` +
              `TVD: %{z} ${unitConfig.lengthUnit}<extra></extra>`,
          },
          {
            x: [lastStation?.east ?? 0],
            y: [lastStation?.north ?? 0],
            z: [lastStation?.tvd ?? 0],
            type: "scatter3d",
            mode: "markers+text",
            name: "TD",
            text: ["TD"],
            textposition: "bottom center",
            marker: {
              size: 8,
              color: "#f97316",
            },
            hovertemplate:
              `TD<br>` +
              `MD: ${formatFixed(lastStation?.md ?? 0, 2)} ${
                unitConfig.lengthUnit
              }<br>` +
              `East: %{x} ${unitConfig.lengthUnit}<br>` +
              `North: %{y} ${unitConfig.lengthUnit}<br>` +
              `TVD: %{z} ${unitConfig.lengthUnit}<extra></extra>`,
          },
        ]}
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
