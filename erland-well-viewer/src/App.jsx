import { useEffect, useMemo, useState } from "react";
import {
  calculateTrajectoryWithVerticalSection,
  comparePlannedActualByInterpolatedMd,
} from "erland-well-core";

import Navbar from "./components/Navbar/Navbar";
import ViewTabs from "./components/ViewTabs/ViewTabs";

import PlannedActualInput from "./components/PlannedActualInput/PlannedActualInput";
import PlannedActualResults from "./components/PlannedActualResults/PlannedActualResults";
import TrajectoryDisplayMode from "./components/TrajectoryDisplayMode/TrajectoryDisplayMode";
import PlanView2D from "./components/PlanView2D/PlanView2D";
import VerticalView2D from "./components/VerticalView2D/VerticalView2D";
import WellPath3D from "./components/WellPath3D/WellPath3D";

import { DEMO_WELLS } from "./data/demoWells";

import { getUnitConfig } from "./config/units";

import "./App.css";

const STORAGE_KEY = "erland-well-viewer-project";

const TRAJECTORY_DISPLAY_MODES = {
  PLANNED: "planned",
  ACTUAL: "actual",
  BOTH: "both",
};

const initialSurveys = [{ md: 0.0, inc: 0.0, azi: 0.0 }];

const initialProject = {
  unitSystem: "feet",
  plannedSurveys: initialSurveys,
  actualSurveys: initialSurveys,
  verticalSectionDirection: 0,
  trajectoryDisplayMode: TRAJECTORY_DISPLAY_MODES.BOTH,
};

function loadProjectFromStorage() {
  const savedProject = localStorage.getItem(STORAGE_KEY);

  if (!savedProject) {
    return initialProject;
  }

  try {
    return JSON.parse(savedProject);
  } catch {
    return initialProject;
  }
}

function calculateTrajectorySafely(
  surveys,
  dlsCourseLength,
  verticalSectionDirection,
) {
  try {
    const results = calculateTrajectoryWithVerticalSection(surveys, {
      dlsCourseLength,
      verticalSectionDirection,
    });

    return {
      results,
      error: null,
    };
  } catch (error) {
    return {
      results: [],
      error: error.message,
    };
  }
}

function App() {
  const savedProject = loadProjectFromStorage();

  /*
   * Compatibilidad con proyectos guardados antes de v0.4.0.
   * Compatibility with projects saved before v0.4.0.
   *
   * Antes guardábamos:
   * surveys
   *
   * Ahora guardaremos:
   * plannedSurveys
   * actualSurveys
   */
  const savedLegacySurveys = savedProject.surveys ?? initialSurveys;

  const [activeView, setActiveView] = useState("input");

  const [unitSystem, setUnitSystem] = useState(
    savedProject.unitSystem ?? initialProject.unitSystem,
  );

  const [plannedSurveys, setPlannedSurveys] = useState(
    savedProject.plannedSurveys ?? savedLegacySurveys,
  );

  const [actualSurveys, setActualSurveys] = useState(
    savedProject.actualSurveys ?? savedLegacySurveys,
  );

  const [verticalSectionDirection, setVerticalSectionDirection] = useState(
    savedProject.verticalSectionDirection ??
      initialProject.verticalSectionDirection,
  );

  const [trajectoryDisplayMode, setTrajectoryDisplayMode] = useState(
    savedProject.trajectoryDisplayMode ?? initialProject.trajectoryDisplayMode,
  );

  const unitConfig = getUnitConfig(unitSystem);

  const isUnitLocked = plannedSurveys.length > 1 || actualSurveys.length > 1;

  const plannedCalculation = useMemo(
    () =>
      calculateTrajectorySafely(
        plannedSurveys,
        unitConfig.dlsCourseLength,
        verticalSectionDirection,
      ),
    [plannedSurveys, unitConfig.dlsCourseLength, verticalSectionDirection],
  );

  const actualCalculation = useMemo(
    () =>
      calculateTrajectorySafely(
        actualSurveys,
        unitConfig.dlsCourseLength,
        verticalSectionDirection,
      ),
    [actualSurveys, unitConfig.dlsCourseLength, verticalSectionDirection],
  );

  const comparisonCalculation = useMemo(() => {
    if (plannedCalculation.error || actualCalculation.error) {
      return {
        comparison: null,
        error: plannedCalculation.error ?? actualCalculation.error,
      };
    }

    try {
      const comparison = comparePlannedActualByInterpolatedMd(
        plannedCalculation.results,
        actualCalculation.results,
      );

      return {
        comparison,
        error: null,
      };
    } catch (error) {
      return {
        comparison: null,
        error: error.message,
      };
    }
  }, [plannedCalculation, actualCalculation]);

  /*
   * Por ahora mantenemos las vistas existentes mostrando Actual Survey.
   * For now, existing views keep displaying the Actual Survey.
   */
  const calculation = actualCalculation;
  /*
   * Español:
   * Mostramos el selector de trayectoria en las vistas donde ya soportamos
   * Planned / Actual / Ambos.
   *
   * English:
   * We show the trajectory selector in the views that already support
   * Planned / Actual / Both.
   */

  const shouldShowTrajectoryDisplayMode =
    activeView === "plan" || activeView === "vertical";
  // const shouldShowTrajectoryDisplayMode =
  //   activeView === "plan" ||
  //   activeView === "vertical" ||
  //   activeView === "threeD";

  useEffect(() => {
    const projectToSave = {
      unitSystem,
      plannedSurveys,
      actualSurveys,
      verticalSectionDirection,
      trajectoryDisplayMode,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectToSave));
  }, [
    unitSystem,
    plannedSurveys,
    actualSurveys,
    verticalSectionDirection,
    trajectoryDisplayMode,
  ]);

  function handleChangeUnitSystem(nextUnitSystem) {
    if (isUnitLocked) {
      return;
    }

    setUnitSystem(nextUnitSystem);
  }

  function handleResetProject() {
    const confirmed = window.confirm(
      "¿Seguro que deseas crear un nuevo proyecto?\n\n" +
        "Se eliminarán todos los surveys ingresados.\n" +
        "Se limpiará la dirección de Vertical Section.\n" +
        "Se desbloquearán las unidades.\n\n" +
        "Esta acción no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    setUnitSystem(initialProject.unitSystem);
    setPlannedSurveys(initialProject.plannedSurveys);
    setActualSurveys(initialProject.actualSurveys);
    setVerticalSectionDirection(initialProject.verticalSectionDirection);
    setTrajectoryDisplayMode(initialProject.trajectoryDisplayMode);
    setActiveView("input");

    localStorage.removeItem(STORAGE_KEY);
  }

  function handleLoadDemoWell(demoWellId) {
    const selectedDemoWell = DEMO_WELLS.find(
      (demoWell) => demoWell.id === demoWellId,
    );

    if (!selectedDemoWell) {
      return;
    }

    const confirmed = window.confirm(
      `¿Deseas cargar el modelo "${selectedDemoWell.name}"?\n\n` +
        "Esto reemplazará los surveys actuales.\n\n" +
        "Esta acción no se puede deshacer.",
    );

    if (!confirmed) {
      return;
    }

    setUnitSystem(selectedDemoWell.unitSystem);

    /*
     * Por ahora cargamos el demo como planned y actual.
     * For now, the demo is loaded as both planned and actual.
     *
     * Después podremos crear demos donde planned y actual sean diferentes.
     */
    setPlannedSurveys(selectedDemoWell.surveys);
    setActualSurveys(selectedDemoWell.surveys);

    setVerticalSectionDirection(selectedDemoWell.verticalSectionDirection);
    setTrajectoryDisplayMode(TRAJECTORY_DISPLAY_MODES.BOTH);
    setActiveView("plan");
  }

  return (
    <main className="app">
      <Navbar
        unitSystem={unitSystem}
        onChangeUnitSystem={handleChangeUnitSystem}
        isUnitLocked={isUnitLocked}
        onResetProject={handleResetProject}
        demoWells={DEMO_WELLS}
        onLoadDemoWell={handleLoadDemoWell}
      />

      <ViewTabs activeView={activeView} onChangeView={setActiveView} />

      {calculation.error && (
        <div className="app__error">{calculation.error}</div>
      )}

      {comparisonCalculation.error && !calculation.error && (
        <div className="app__error">{comparisonCalculation.error}</div>
      )}

      {activeView === "input" && (
        <PlannedActualInput
          plannedSurveys={plannedSurveys}
          actualSurveys={actualSurveys}
          onChangePlannedSurveys={setPlannedSurveys}
          onChangeActualSurveys={setActualSurveys}
          unitSystem={unitSystem}
        />
      )}
      {shouldShowTrajectoryDisplayMode && !calculation.error && (
        <TrajectoryDisplayMode
          value={trajectoryDisplayMode}
          onChange={setTrajectoryDisplayMode}
        />
      )}

      {activeView === "results" && !calculation.error && (
        <PlannedActualResults
          plannedResults={plannedCalculation.results}
          actualResults={actualCalculation.results}
          comparison={comparisonCalculation.comparison}
          unitSystem={unitSystem}
        />
      )}

      {activeView === "plan" && !calculation.error && (
        <PlanView2D
          plannedResults={plannedCalculation.results}
          actualResults={actualCalculation.results}
          unitSystem={unitSystem}
          trajectoryDisplayMode={trajectoryDisplayMode}
        />
      )}

      {activeView === "vertical" && !calculation.error && (
        <VerticalView2D
          plannedResults={plannedCalculation.results}
          actualResults={actualCalculation.results}
          unitSystem={unitSystem}
          verticalSectionDirection={verticalSectionDirection}
          onChangeVerticalSectionDirection={setVerticalSectionDirection}
          trajectoryDisplayMode={trajectoryDisplayMode}
        />
      )}

      {activeView === "threeD" && !calculation.error && (
        <WellPath3D results={calculation.results} unitSystem={unitSystem} />
      )}
    </main>
  );
}

export default App;
