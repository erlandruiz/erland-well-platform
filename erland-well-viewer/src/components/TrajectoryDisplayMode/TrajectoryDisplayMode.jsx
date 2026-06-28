import "./TrajectoryDisplayMode.css";

const DISPLAY_MODE_OPTIONS = [
  {
    value: "planned",
    label: "Propuesto",
    description: "Mostrar solo la trayectoria planificada.",
  },
  {
    value: "actual",
    label: "Real",
    description: "Mostrar solo la trayectoria real.",
  },
  {
    value: "both",
    label: "Ambos",
    description: "Mostrar trayectoria propuesta y real.",
  },
];

function TrajectoryDisplayMode({ value, onChange }) {
  return (
    <section className="trajectory-display-mode">
      <div>
        <h3 className="trajectory-display-mode__title">
          Visualización de trayectoria
        </h3>

        <p className="trajectory-display-mode__description">
          Selecciona qué trayectoria deseas mostrar en las gráficas.
        </p>
      </div>

      <div
        className="trajectory-display-mode__buttons"
        role="group"
        aria-label="Seleccionar trayectoria visible"
      >
        {DISPLAY_MODE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              value === option.value
                ? "trajectory-display-mode__button trajectory-display-mode__button--active"
                : "trajectory-display-mode__button"
            }
            title={option.description}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default TrajectoryDisplayMode;