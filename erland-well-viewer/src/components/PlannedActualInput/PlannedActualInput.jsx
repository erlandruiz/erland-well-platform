import { useState } from "react";
import SurveyInput from "../SurveyInput/SurveyInput";
import "./PlannedActualInput.css";

const SURVEY_INPUT_TABS = {
  PLANNED: "planned",
  ACTUAL: "actual",
};

function PlannedActualInput({
  plannedSurveys,
  actualSurveys,
  onChangePlannedSurveys,
  onChangeActualSurveys,
  unitSystem,
}) {
  const [activeSurveyTab, setActiveSurveyTab] = useState(
    SURVEY_INPUT_TABS.ACTUAL,
  );

  const isPlannedActive = activeSurveyTab === SURVEY_INPUT_TABS.PLANNED;
  const isActualActive = activeSurveyTab === SURVEY_INPUT_TABS.ACTUAL;

  const activeSurveys = isPlannedActive ? plannedSurveys : actualSurveys;

  const handleChangeActiveSurveys = isPlannedActive
    ? onChangePlannedSurveys
    : onChangeActualSurveys;

  return (
    <section className="planned-actual-input">
      <header className="planned-actual-input__header">
        <div className="planned-actual-input__wellhead">
          <span
            className="planned-actual-input__wellhead-icon"
            aria-label="Oil drilling rig"
            role="img"
          >
            <svg
              viewBox="0 0 64 64"
              width="36"
              height="36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 6L17 58H23L26 47H38L41 58H47L32 6Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              <path
                d="M27 19H37"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M24.5 29H39.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M21.5 40H42.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M29 19L24.5 29L35 40L26 47"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <path
                d="M35 19L39.5 29L29 40L38 47"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />

              <path
                d="M14 58H50"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <path
                d="M32 12V53"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />

              <path d="M28 53H36L32 60L28 53Z" fill="currentColor" />

              <circle cx="32" cy="10" r="3" fill="currentColor" />

              <path
                d="M50 18C53 15 53 11 50 8C47 11 47 15 50 18Z"
                fill="currentColor"
                opacity="0.85"
              />
            </svg>
          </span>
        </div>

        <div>
          <h2 className="planned-actual-input__title">
            Planned vs Actual Surveys
          </h2>

          <p className="planned-actual-input__description">
            Both trajectories start from the same wellhead. Select which survey
            table you want to edit.
          </p>
        </div>
      </header>

      <div
        className="planned-actual-input__tabs"
        role="tablist"
        aria-label="Seleccionar tabla de surveys"
      >
        <button
          type="button"
          className={
            isPlannedActive
              ? "planned-actual-input__tab planned-actual-input__tab--planned planned-actual-input__tab--active"
              : "planned-actual-input__tab planned-actual-input__tab--planned"
          }
          onClick={() => setActiveSurveyTab(SURVEY_INPUT_TABS.PLANNED)}
        >
          Planned Surveys / Propuesto
        </button>

        <button
          type="button"
          className={
            isActualActive
              ? "planned-actual-input__tab planned-actual-input__tab--actual planned-actual-input__tab--active"
              : "planned-actual-input__tab planned-actual-input__tab--actual"
          }
          onClick={() => setActiveSurveyTab(SURVEY_INPUT_TABS.ACTUAL)}
        >
          Actual Surveys / Real
        </button>
      </div>

      <div
        className={
          isPlannedActive
            ? "planned-actual-input__panel planned-actual-input__panel--planned"
            : "planned-actual-input__panel planned-actual-input__panel--actual"
        }
      >
        <div className="planned-actual-input__panel-header">
          <span
            className={
              isPlannedActive
                ? "planned-actual-input__dot planned-actual-input__dot--planned"
                : "planned-actual-input__dot planned-actual-input__dot--actual"
            }
          />

          <div>
            <h3>
              {isPlannedActive
                ? "Planned Surveys / Propuesto"
                : "Actual Surveys / Real"}
            </h3>

            <p>
              {isPlannedActive
                ? "Programmed trajectory from the well plan."
                : "Measured trajectory from field survey stations."}
            </p>
          </div>
        </div>

        <SurveyInput
          surveys={activeSurveys}
          onChangeSurveys={handleChangeActiveSurveys}
          unitSystem={unitSystem}
        />
      </div>
    </section>
  );
}

export default PlannedActualInput;