import "./Navbar.css";

function Navbar({
  unitSystem,
  onChangeUnitSystem,
  isUnitLocked,
  onResetProject,
  demoWells,
  onLoadDemoWell,
}) {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">EW</span>

        <div>
          <h1 className="navbar__title">Erland Well Viewer</h1>
          <p className="navbar__subtitle">Directional well trajectory viewer</p>
        </div>
      </div>

      <div className="navbar__meta">
        <label className="navbar__unit-selector">
          <span>Units</span>

          <select
            value={unitSystem}
            disabled={isUnitLocked}
            onChange={(event) => onChangeUnitSystem(event.target.value)}
          >
            <option value="feet">Feet / ft</option>
            <option value="meters">Meters / m</option>
          </select>

          {isUnitLocked && (
            <small className="navbar__unit-help">
              Units locked after survey input
            </small>
          )}
        </label>

        <label className="navbar__demo-selector">
          <span>Demo wells</span>

          <select
            defaultValue=""
            onChange={(event) => {
              onLoadDemoWell(event.target.value);
              event.target.value = "";
            }}
          >
            <option value="" disabled>
              Cargar modelo
            </option>

            {demoWells.map((demoWell) => (
              <option key={demoWell.id} value={demoWell.id}>
                {demoWell.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="navbar__reset"
          onClick={onResetProject}
        >
          Nuevo proyecto
        </button>

        <span className="navbar__badge">v0.4.0</span>
      </div>
    </header>
  );
}

export default Navbar;
