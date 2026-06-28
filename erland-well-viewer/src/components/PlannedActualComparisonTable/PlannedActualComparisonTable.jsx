import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./PlannedActualComparisonTable.css";

/*
 * Español:
 * Formatea valores numéricos que pueden venir como null o undefined.
 *
 * English:
 * Formats numeric values that may come as null or undefined.
 */
function formatNullable(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return formatFixed(value, decimals);
}

/*
 * Español:
 * La tabla compara el survey real contra el survey propuesto interpolado
 * al mismo MD del survey real.
 *
 * English:
 * The table compares the actual survey against the planned survey interpolated
 * at the same MD as the actual survey.
 */
function PlannedActualComparisonTable({ comparison, unitSystem }) {
  const unitConfig = getUnitConfig(unitSystem);

  const matched = comparison?.matched ?? [];
  const unmatchedActual = comparison?.unmatchedActual ?? [];

  if (matched.length === 0 && unmatchedActual.length === 0) {
    return (
      <section className="planned-actual-comparison-table">
        <div className="planned-actual-comparison-table__empty">
          <h3>No comparison data available</h3>

          <p>
            Ingresa surveys propuestos y reales para calcular la comparación.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="planned-actual-comparison-table">
      <header className="planned-actual-comparison-table__header">
        <div>
          <h3 className="planned-actual-comparison-table__title">
            Planned vs Actual Comparison
          </h3>

          <p className="planned-actual-comparison-table__description">
            Diferencias calculadas entre el survey real y el survey propuesto
            interpolado al mismo MD.
          </p>
        </div>

        <div className="planned-actual-comparison-table__summary">
          <span>Matched: {matched.length}</span>
          <span>Unmatched: {unmatchedActual.length}</span>
        </div>
      </header>

      {unmatchedActual.length > 0 && (
        <div className="planned-actual-comparison-table__warning">
          Algunas estaciones reales están fuera del rango del plan y no pudieron
          ser comparadas.
        </div>
      )}

      <div className="planned-actual-comparison-table__wrapper">
        <table className="planned-actual-comparison-table__table">
          <thead>
            <tr>
              <th>
                MD
                <span>{unitConfig.lengthUnit}</span>
              </th>
              <th>Plan Reference</th>
              <th>
                Delta INC
                <span>{unitConfig.angleUnit}</span>
              </th>
              <th>
                Delta AZI
                <span>{unitConfig.angleUnit}</span>
              </th>
              <th>
                Delta TVD
                <span>{unitConfig.lengthUnit}</span>
              </th>
              <th>
                Delta North
                <span>{unitConfig.lengthUnit}</span>
              </th>
              <th>
                Delta East
                <span>{unitConfig.lengthUnit}</span>
              </th>
              <th>
                Delta VS
                <span>{unitConfig.lengthUnit}</span>
              </th>
              <th>
                Delta DLS
                <span>{unitConfig.dlsUnit}</span>
              </th>
              <th>
                Closure Distance
                <span>{unitConfig.lengthUnit}</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {matched.map((row) => (
              <tr key={row.md}>
                <td>{formatFixed(row.md, 2)}</td>

                <td>
                  {row.plannedWasInterpolated ? (
                    <span className="planned-actual-comparison-table__badge planned-actual-comparison-table__badge--yes">
                      Interpolated
                    </span>
                  ) : (
                    <span className="planned-actual-comparison-table__badge">
                      Exact MD
                    </span>
                  )}
                </td>

                <td>{formatNullable(row.deltaInc, 15)}</td>

                <td>{formatNullable(row.deltaAzi, 15)}</td>

                <td>{formatNullable(row.deltaTvd, 15)}</td>

                <td>{formatNullable(row.deltaNorth, 15)}</td>

                <td>{formatNullable(row.deltaEast, 15)}</td>

                <td>{formatNullable(row.deltaVerticalSection, 15)}</td>

                <td>{formatNullable(row.deltaDls, 15)}</td>

                <td>{formatNullable(row.deltaClosureDistance, 15)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {unmatchedActual.length > 0 && (
        <div className="planned-actual-comparison-table__unmatched">
          <h4>Unmatched Actual Stations</h4>

          <p>
            Estas estaciones reales no se compararon porque su MD está fuera del
            rango de la trayectoria propuesta.
          </p>

          <div className="planned-actual-comparison-table__unmatched-list">
            {unmatchedActual.map((station) => (
              <span key={station.md}>
                MD {formatFixed(station.md, 2)} {unitConfig.lengthUnit}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default PlannedActualComparisonTable;
