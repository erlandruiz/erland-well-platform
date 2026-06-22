import { getUnitConfig } from "../../config/units";
import "./SurveyInput.css";

function SurveyInput({ surveys, onChangeSurveys, unitSystem }) {
  const unitConfig = getUnitConfig(unitSystem);

  function updateStation(index, field, value) {
    const numericValue = value === "" ? 0 : Number(value);

    onChangeSurveys((currentSurveys) =>
      currentSurveys.map((station, stationIndex) =>
        stationIndex === index
          ? {
              ...station,
              [field]: numericValue,
            }
          : station,
      ),
    );
  }

  function addStation() {
    const lastStation = surveys[surveys.length - 1];

    const newStation = {
      md: lastStation.md + unitConfig.addMdInterval,
      inc: lastStation.inc,
      azi: lastStation.azi,
    };

    onChangeSurveys((currentSurveys) => [...currentSurveys, newStation]);
  }

  function removeStation(index) {
    if (surveys.length <= 1) {
      return;
    }

    const station = surveys[index];

    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la estación ${index + 1}?\n\n` +
        `MD: ${station.md}\n` +
        `INC: ${station.inc}\n` +
        `AZI: ${station.azi}\n\n` +
        "Esta acción no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    onChangeSurveys((currentSurveys) =>
      currentSurveys.filter((_, stationIndex) => stationIndex !== index),
    );
  }

  return (
    <section className="survey-input">
      <div className="survey-input__header">
        <h2 className="survey-input__title">Entrada Survey / Survey Input</h2>

        <p className="survey-input__description">
          Ingresa MD, INC y AZI. Los resultados se calculan automáticamente.
        </p>
      </div>

      <div className="survey-input__table-wrapper">
        <table className="survey-input__table">
          <thead>
            <tr>
              <th>Station</th>
              <th>MD ({unitConfig.lengthUnit})</th>
              <th>INC ({unitConfig.angleUnit})</th>
              <th>AZI ({unitConfig.angleUnit})</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {surveys.map((station, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={station.md}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(event) =>
                      updateStation(index, "md", event.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={station.inc}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(event) =>
                      updateStation(index, "inc", event.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={station.azi}
                    onWheel={(event) => event.currentTarget.blur()}
                    onChange={(event) =>
                      updateStation(index, "azi", event.target.value)
                    }
                  />
                </td>

                <td>
                  <button
                    type="button"
                    className="survey-input__delete"
                    onClick={() => removeStation(index)}
                    disabled={surveys.length <= 1}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" className="survey-input__add" onClick={addStation}>
        Agregar estación
      </button>
    </section>
  );
}

export default SurveyInput;
