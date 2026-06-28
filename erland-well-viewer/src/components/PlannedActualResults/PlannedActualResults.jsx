import { useState } from "react";
import SurveyTable from "../SurveyTable/SurveyTable";
import PlannedActualComparisonTable from "../PlannedActualComparisonTable/PlannedActualComparisonTable";
import "./PlannedActualResults.css";

const RESULT_TABS = {
  PLANNED: "planned",
  ACTUAL: "actual",
  COMPARISON: "comparison",
};

function PlannedActualResults({
  plannedResults,
  actualResults,
  comparison,
  unitSystem,
}) {
  const [activeResultTab, setActiveResultTab] = useState(RESULT_TABS.ACTUAL);

  const isPlannedActive = activeResultTab === RESULT_TABS.PLANNED;
  const isActualActive = activeResultTab === RESULT_TABS.ACTUAL;
  const isComparisonActive = activeResultTab === RESULT_TABS.COMPARISON;

  

  return (
    <section className="planned-actual-results">
      <header className="planned-actual-results__header">
        <div>
          <h2 className="planned-actual-results__title">
            Planned vs Actual Results
          </h2>

          <p className="planned-actual-results__description">
            Review calculated results for the planned survey, actual survey, and
            comparison between both trajectories.
          </p>
        </div>
      </header>

      <div
        className="planned-actual-results__tabs"
        role="tablist"
        aria-label="Seleccionar resultados"
      >
        <button
          type="button"
          className={
            isPlannedActive
              ? "planned-actual-results__tab planned-actual-results__tab--planned planned-actual-results__tab--active"
              : "planned-actual-results__tab planned-actual-results__tab--planned"
          }
          onClick={() => setActiveResultTab(RESULT_TABS.PLANNED)}
        >
          Propuesto
        </button>

        <button
          type="button"
          className={
            isActualActive
              ? "planned-actual-results__tab planned-actual-results__tab--actual planned-actual-results__tab--active"
              : "planned-actual-results__tab planned-actual-results__tab--actual"
          }
          onClick={() => setActiveResultTab(RESULT_TABS.ACTUAL)}
        >
          Real
        </button>

        <button
          type="button"
          className={
            isComparisonActive
              ? "planned-actual-results__tab planned-actual-results__tab--comparison planned-actual-results__tab--active"
              : "planned-actual-results__tab planned-actual-results__tab--comparison"
          }
          onClick={() => setActiveResultTab(RESULT_TABS.COMPARISON)}
        >
          Comparación
        </button>
      </div>

      {isPlannedActive && (
        <div className="planned-actual-results__panel planned-actual-results__panel--planned">
          {/*
           * Español:
           * Esta pestaña muestra los resultados calculados de la trayectoria propuesta.
           *
           * English:
           * This tab shows the calculated results for the planned trajectory.
           */}
          <SurveyTable results={plannedResults} unitSystem={unitSystem} />
        </div>
      )}

      {isActualActive && (
        <div className="planned-actual-results__panel planned-actual-results__panel--actual">
          {/*
           * Español:
           * Esta pestaña muestra los resultados calculados de la trayectoria real.
           *
           * English:
           * This tab shows the calculated results for the actual trajectory.
           */}
          <SurveyTable results={actualResults} unitSystem={unitSystem} />
        </div>
      )}

      {isComparisonActive && (
        <div className="planned-actual-results__panel planned-actual-results__panel--comparison">
          {/*
           * Español:
           * Esta pestaña muestra la comparación real contra plan.
           * El plan se interpola al mismo MD de cada estación real.
           *
           * English:
           * This tab shows the actual versus planned comparison.
           * The planned trajectory is interpolated at the same MD as each actual station.
           */}
          <PlannedActualComparisonTable
            comparison={comparison}
            unitSystem={unitSystem}
          />
        </div>
      )}
    </section>
  );
}

export default PlannedActualResults;
