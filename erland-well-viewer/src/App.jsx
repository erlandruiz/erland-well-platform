import { useEffect, useMemo, useState } from "react";
import { calculateMinimumCurvature } from "erland-well-core";

import Navbar from "./components/Navbar/Navbar";
import ViewTabs from "./components/ViewTabs/ViewTabs";
import SurveyInput from "./components/SurveyInput/SurveyInput";
import SurveyTable from "./components/SurveyTable/SurveyTable";
import PlanView2D from "./components/PlanView2D/PlanView2D";
import VerticalView2D from "./components/VerticalView2D/VerticalView2D";
import WellPath3D from "./components/WellPath3D/WellPath3D";
import { DEMO_WELLS } from "./data/demoWells";

import { getUnitConfig } from "./config/units";

import "./App.css";

const STORAGE_KEY = "erland-well-viewer-project";

const initialSurveys = [{ md: 0.0, inc: 0.0, azi: 0.0 }];

const initialProject = {
  unitSystem: "feet",
  surveys: initialSurveys,
  verticalSectionDirection: 0,
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

function App() {
  const savedProject = loadProjectFromStorage();

  const [activeView, setActiveView] = useState("input");
  const [unitSystem, setUnitSystem] = useState(savedProject.unitSystem);
  const [surveys, setSurveys] = useState(savedProject.surveys);
  const [verticalSectionDirection, setVerticalSectionDirection] = useState(
    savedProject.verticalSectionDirection,
  );

  const unitConfig = getUnitConfig(unitSystem);

  const isUnitLocked = surveys.length > 1;

  const calculation = useMemo(() => {
    try {
      const results = calculateMinimumCurvature(surveys, {
        dlsCourseLength: unitConfig.dlsCourseLength,
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
  }, [surveys, unitConfig.dlsCourseLength]);

  useEffect(() => {
    const projectToSave = {
      unitSystem,
      surveys,
      verticalSectionDirection,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projectToSave));
  }, [unitSystem, surveys, verticalSectionDirection]);

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
    setSurveys(initialProject.surveys);
    setVerticalSectionDirection(initialProject.verticalSectionDirection);
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
    setSurveys(selectedDemoWell.surveys);
    setVerticalSectionDirection(selectedDemoWell.verticalSectionDirection);
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

      {activeView === "input" && (
        <SurveyInput
          surveys={surveys}
          onChangeSurveys={setSurveys}
          unitSystem={unitSystem}
        />
      )}

      {activeView === "results" && !calculation.error && (
        <SurveyTable results={calculation.results} unitSystem={unitSystem} />
      )}

      {activeView === "plan" && !calculation.error && (
        <PlanView2D results={calculation.results} unitSystem={unitSystem} />
      )}

      {activeView === "vertical" && !calculation.error && (
        <VerticalView2D
          results={calculation.results}
          unitSystem={unitSystem}
          verticalSectionDirection={verticalSectionDirection}
          onChangeVerticalSectionDirection={setVerticalSectionDirection}
        />
      )}

      {activeView === "threeD" && !calculation.error && (
        <WellPath3D results={calculation.results} unitSystem={unitSystem} />
      )}
    </main>
  );
}

export default App;
