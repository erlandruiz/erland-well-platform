import Plot from "react-plotly.js";
import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./VerticalView2D.css";

function VerticalView2D({
  results,
  unitSystem,
  verticalSectionDirection,
  onChangeVerticalSectionDirection,
}) {
  const unitConfig = getUnitConfig(unitSystem);

  const directionNumber = Number(verticalSectionDirection) || 0;
  const directionRad = (directionNumber * Math.PI) / 180;

  const mdValues = results.map((row) => row.md);
  const maxMd = Math.max(...mdValues, 0);
  const mdColorValues = mdValues.map((md) => -md);

  const firstStation = results[0];
  const lastStation = results[results.length - 1];

  const verticalSectionValues = results.map(
    (row) =>
      row.north * Math.cos(directionRad) +
      row.east * Math.sin(directionRad)
  );

  const tvdValues = results.map((row) => row.tvd);

  const lastVerticalSection =
    (lastStation?.north ?? 0) * Math.cos(directionRad) +
    (lastStation?.east ?? 0) * Math.sin(directionRad);

  const hoverText = results.map((row, index) => {
    const verticalSection =
      row.north * Math.cos(directionRad) +
      row.east * Math.sin(directionRad);

    return (
      `Station: ${index + 1}<br>` +
      `MD: ${formatFixed(row.md, 2)} ${unitConfig.lengthUnit}<br>` +
      `INC: ${formatFixed(row.inc, 2)} ${unitConfig.angleUnit}<br>` +
      `AZI: ${formatFixed(row.azi, 2)} ${unitConfig.angleUnit}<br>` +
      `Vertical Section Direction: ${formatFixed(
        directionNumber,
        2
      )} ${unitConfig.angleUnit}<br>` +
      `Vertical Section: ${formatFixed(
        verticalSection,
        15
      )} ${unitConfig.lengthUnit}<br>` +
      `TVD: ${formatFixed(row.tvd, 15)} ${unitConfig.lengthUnit}<br>` +
      `North: ${formatFixed(row.north, 15)} ${unitConfig.lengthUnit}<br>` +
      `East: ${formatFixed(row.east, 15)} ${unitConfig.lengthUnit}<br>` +
      `DLS: ${formatFixed(row.dls, 15)} ${unitConfig.dlsUnit}`
    );
  });

  return (
    <section className="vertical-view-2d">
      <div className="vertical-view-2d__header">
        <div>
          <h2 className="vertical-view-2d__title">
            Vista Vertical 2D / Vertical Section View
          </h2>

          <p className="vertical-view-2d__description">
            Perfil vertical proyectado usando Vertical Section Direction.
          </p>
        </div>

        <div className="vertical-view-2d__side">
          <label className="vertical-view-2d__control">
            <span>Vertical Section Direction ({unitConfig.angleUnit})</span>

            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              value={verticalSectionDirection}
              onWheel={(event) => event.currentTarget.blur()}
              onChange={(event) =>
                onChangeVerticalSectionDirection(event.target.value)
              }
            />
          </label>

          <div className="vertical-view-2d__summary">
            <span>
              TD: {formatFixed(lastStation?.md ?? 0, 2)}{" "}
              {unitConfig.lengthUnit}
            </span>
            <span>
              VS at TD: {formatFixed(lastVerticalSection, 2)}{" "}
              {unitConfig.lengthUnit}
            </span>
          </div>
        </div>
      </div>

      <Plot
        data={[
          {
            x: verticalSectionValues,
            y: tvdValues,
            text: hoverText,
            type: "scatter",
            mode: "lines+markers",
            name: "Vertical Section",
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
            x: [0],
            y: [firstStation?.tvd ?? 0],
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
              `Vertical Section: %{x} ${unitConfig.lengthUnit}<br>` +
              `TVD: %{y} ${unitConfig.lengthUnit}<extra></extra>`,
          },
          {
            x: [lastVerticalSection],
            y: [lastStation?.tvd ?? 0],
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
              `Vertical Section: %{x} ${unitConfig.lengthUnit}<br>` +
              `TVD: %{y} ${unitConfig.lengthUnit}<extra></extra>`,
          },
        ]}
        layout={{
          autosize: true,
          title: {
            text: `Vertical Section vs TVD - Direction ${formatFixed(
              directionNumber,
              2
            )}°`,
          },
          xaxis: {
            title: {
              text: `Vertical Section (${unitConfig.lengthUnit})`,
            },
            zeroline: true,
            zerolinecolor: "#64748b",
            gridcolor: "#334155",
          },
          yaxis: {
            title: {
              text: `TVD (${unitConfig.lengthUnit})`,
            },
            zeroline: true,
            zerolinecolor: "#64748b",
            gridcolor: "#334155",
            autorange: "reversed",
          },
          legend: {
            orientation: "h",
            x: 0,
            y: 1.12,
          },
          margin: {
            l: 80,
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
        className="vertical-view-2d__chart"
        useResizeHandler
      />
    </section>
  );
}

export default VerticalView2D;