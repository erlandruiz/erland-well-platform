/**
 * Valida una estación de survey.
 * Validates a survey station.
 *
 * ESPAÑOL:
 * Cada estación debe tener MD, INC y AZI como números válidos.
 *
 * ENGLISH:
 * Each station must have valid numeric MD, INC and AZI values.
 */
export function validateSurveyStation(station, index = 0) {
  if (typeof station !== "object" || station === null) {
    throw new Error(
      `Survey inválido en la fila ${index + 1} / Invalid survey at row ${index + 1}.`
    );
  }

  if (typeof station.md !== "number" || Number.isNaN(station.md)) {
    throw new Error(
      `MD inválido en la fila ${index + 1} / Invalid MD at row ${index + 1}.`
    );
  }

  if (typeof station.inc !== "number" || Number.isNaN(station.inc)) {
    throw new Error(
      `INC inválido en la fila ${index + 1} / Invalid INC at row ${index + 1}.`
    );
  }

  if (typeof station.azi !== "number" || Number.isNaN(station.azi)) {
    throw new Error(
      `AZI inválido en la fila ${index + 1} / Invalid AZI at row ${index + 1}.`
    );
  }

  if (station.md < 0) {
    throw new Error(
      `MD no puede ser negativo en la fila ${index + 1} / MD cannot be negative at row ${index + 1}.`
    );
  }

  if (station.inc < 0 || station.inc > 180) {
    throw new Error(
      `INC fuera de rango en la fila ${index + 1} / INC out of range at row ${index + 1}.`
    );
  }

  if (station.azi < 0 || station.azi >= 360) {
    throw new Error(
      `AZI fuera de rango en la fila ${index + 1} / AZI out of range at row ${index + 1}.`
    );
  }
}

/**
 * Valida una lista completa de surveys.
 * Validates a complete survey list.
 */
export function validateSurveyList(surveys) {
  if (!Array.isArray(surveys)) {
    throw new Error("surveys debe ser un arreglo / surveys must be an array.");
  }

  if (surveys.length === 0) {
    throw new Error(
      "Debes ingresar al menos una estación de survey / At least one survey station is required."
    );
  }

  surveys.forEach((station, index) => {
    validateSurveyStation(station, index);

    if (index > 0) {
      const previousStation = surveys[index - 1];

      if (station.md <= previousStation.md) {
        throw new Error(
          `MD inválido en la fila ${index + 1}. El MD debe ser mayor que el anterior / Invalid MD at row ${index + 1}. MD must be greater than the previous one.`
        );
      }
    }
  });
}