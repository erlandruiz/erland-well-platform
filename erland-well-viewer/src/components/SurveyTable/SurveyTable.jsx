import { formatFixed } from "erland-well-core";
import { getUnitConfig } from "../../config/units";
import "./SurveyTable.css";

function SurveyTable({ results, unitSystem }) {
  const unitConfig = getUnitConfig(unitSystem);

  return (
    <div className="survey-table">
      <table className="survey-table__table">
        <thead>
          <tr>
            <th className="survey-table__th">
              MD
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              INC
              <br />
              <span>{unitConfig.angleUnit}</span>
            </th>

            <th className="survey-table__th">
              AZI
              <br />
              <span>{unitConfig.angleUnit}</span>
            </th>

            <th className="survey-table__th">
              Delta MD
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              Dogleg
              <br />
              <span>{unitConfig.angleUnit}</span>
            </th>

            <th className="survey-table__th">
              Ratio Factor
              <br />
              <span>-</span>
            </th>

            <th className="survey-table__th">
              Delta TVD
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              TVD
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              Delta North
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              North
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              Delta East
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              East
              <br />
              <span>{unitConfig.lengthUnit}</span>
            </th>

            <th className="survey-table__th">
              DLS
              <br />
              <span>{unitConfig.dlsUnit}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {results.map((row) => (
            <tr key={row.md}>
              <td className="survey-table__td">{formatFixed(row.md, 2)}</td>

              <td className="survey-table__td">{formatFixed(row.inc, 2)}</td>

              <td className="survey-table__td">{formatFixed(row.azi, 2)}</td>

              <td className="survey-table__td">
                {formatFixed(row.deltaMd, 15)}
              </td>

              <td className="survey-table__td">
                {formatFixed(row.doglegDeg, 15)}
              </td>

              <td className="survey-table__td">
                {formatFixed(row.ratioFactor, 15)}
              </td>

              <td className="survey-table__td">
                {formatFixed(row.deltaTvd, 15)}
              </td>

              <td className="survey-table__td">{formatFixed(row.tvd, 15)}</td>

              <td className="survey-table__td">
                {formatFixed(row.deltaNorth, 15)}
              </td>

              <td className="survey-table__td">
                {formatFixed(row.north, 15)}
              </td>

              <td className="survey-table__td">
                {formatFixed(row.deltaEast, 15)}
              </td>

              <td className="survey-table__td">{formatFixed(row.east, 15)}</td>

              <td className="survey-table__td">{formatFixed(row.dls, 15)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyTable;