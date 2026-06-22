import "./ViewTabs.css";

function ViewTabs({ activeView, onChangeView }) {
  return (
    <nav className="view-tabs" aria-label="Main view selector">
      <button
        type="button"
        className={
          activeView === "input"
            ? "view-tabs__button view-tabs__button--active"
            : "view-tabs__button"
        }
        onClick={() => onChangeView("input")}
      >
        Entrada Survey
      </button>

      <button
        type="button"
        className={
          activeView === "results"
            ? "view-tabs__button view-tabs__button--active"
            : "view-tabs__button"
        }
        onClick={() => onChangeView("results")}
      >
        Resultados
      </button>

      <button
        type="button"
        className={
          activeView === "plan"
            ? "view-tabs__button view-tabs__button--active"
            : "view-tabs__button"
        }
        onClick={() => onChangeView("plan")}
      >
        Vista Planta 2D
      </button>

      <button
        type="button"
        className={
          activeView === "vertical"
            ? "view-tabs__button view-tabs__button--active"
            : "view-tabs__button"
        }
        onClick={() => onChangeView("vertical")}
      >
        Vista Vertical 2D
      </button>

      <button
        type="button"
        className={
          activeView === "threeD"
            ? "view-tabs__button view-tabs__button--active"
            : "view-tabs__button"
        }
        onClick={() => onChangeView("threeD")}
      >
        Vista 3D
      </button>
    </nav>
  );
}

export default ViewTabs;