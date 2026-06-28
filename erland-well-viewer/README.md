# Erland Well Viewer

**Español:**
Aplicación visual en React para ingresar, calcular y graficar surveys de pozos direccionales usando la librería privada `erland-well-core`.

**English:**
React visual application for entering, calculating, and plotting directional well surveys using the private `erland-well-core` library.

---

## Estado del proyecto / Project Status

**Español:**
Versión visual funcional en desarrollo. Actualmente permite ingresar surveys propuestos y reales, seleccionar unidades, calcular trayectorias completas, comparar Planned vs Actual, visualizar trayectorias en 2D/3D y cargar pozos modelo para demostración.

**English:**
Functional visual version in development. It currently allows entering planned and actual surveys, selecting units, calculating full trajectories, comparing Planned vs Actual, visualizing trajectories in 2D/3D, and loading demo wells.

```txt
Version: 0.4.0
```

---

## Objetivo / Goal

**Español:**
Crear una aplicación visual tipo visor técnico para pozos direccionales, capaz de ingresar datos de survey, calcular trayectoria usando Minimum Curvature y mostrar resultados en tablas y gráficas profesionales.

**English:**
Create a technical visual viewer for directional wells, capable of entering survey data, calculating trajectory using Minimum Curvature, and displaying results in professional tables and charts.

---

## Tecnologías / Technologies

* React
* Vite
* JavaScript
* Plotly
* LocalStorage
* `erland-well-core`

---

## Librería usada / Used Library

**Español:**
Este proyecto usa la librería local privada:

**English:**
This project uses the private local library:

```txt
erland-well-core
```

Instalación local:

Local installation:

```bash
npm install ../erland-well-core
```

---

## Funciones actuales / Current Features

### Entrada de Survey / Survey Input

**Español:**
Permite ingresar estaciones de survey con:

**English:**
Allows entering survey stations with:

* MD / Measured Depth
* INC / Inclination
* AZI / Azimuth

Los campos aceptan valores decimales, por ejemplo:

The fields accept decimal values, for example:

```txt
MD: 235.37
INC: 4.32
AZI: 127.78
```

**Español:**
Los campos numéricos no muestran flechas de incremento/decremento para evitar cambios accidentales.

**English:**
Numeric fields do not show increment/decrement arrows to avoid accidental changes.

---


### Planned vs Actual Surveys / Surveys Propuesto vs Real

**Español:**
La aplicación permite trabajar con dos trayectorias separadas:

**English:**
The application allows working with two separated trajectories:

* Planned Surveys / Propuesto
* Actual Surveys / Real

**Español:**
Ambas trayectorias parten desde el mismo wellhead. Esto permite comparar el plan direccional contra la trayectoria real del pozo.

**English:**
Both trajectories start from the same wellhead. This allows comparing the directional plan against the actual well trajectory.

**Español:**
La entrada de datos usa pestañas internas para editar el survey propuesto o el survey real sin mostrar dos tablas largas al mismo tiempo.

**English:**
The data input uses internal tabs to edit the planned survey or the actual survey without showing two long tables at the same time.

---

### Confirmación al eliminar / Delete Confirmation

**Español:**
Al eliminar una estación de survey, la aplicación muestra una confirmación para evitar borrar datos por accidente.

**English:**
When deleting a survey station, the application shows a confirmation message to avoid accidental deletion.

---

### Selector de unidades / Unit Selector

**Español:**
Permite elegir el sistema de unidades antes de ingresar surveys:

**English:**
Allows selecting the unit system before entering surveys:

* Feet / ft
* Meters / m

**Español:**
Después de agregar más de una estación, las unidades quedan bloqueadas para evitar cambios accidentales o inconsistencias.

**English:**
After adding more than one station, units are locked to avoid accidental changes or inconsistencies.

---

### Pozos modelo / Demo Wells

**Español:**
La aplicación permite cargar pozos modelo para demostración. Esto ayuda a mostrar las gráficas y resultados sin ingresar datos manualmente.

**English:**
The application allows loading demo wells. This helps show charts and results without manually entering data.

Pozos disponibles / Available wells:

```txt
Pozo Modelo 12000 ft
- Unit system: feet
- Vertical Section Direction: 68°
- TD: 12000 ft
- Stations: 401
```

```txt
Pozo Modelo 3360 m
- Unit system: meters
- Vertical Section Direction: 130°
- TD: 3360 m
- Stations: 113
```

**Español:**
Al cargar un pozo modelo, se reemplazan los surveys actuales, se configura automáticamente la unidad correcta y se establece la dirección de Vertical Section.

**English:**
When loading a demo well, the current surveys are replaced, the correct unit system is automatically configured, and the Vertical Section Direction is set.

---



### Resultados completos / Full Results

**Español:**
La vista de resultados muestra los cálculos completos generados por `erland-well-core` para la trayectoria propuesta y la trayectoria real.

**English:**
The results view displays the full calculations generated by `erland-well-core` for the planned trajectory and the actual trajectory.

La vista incluye pestañas internas / The view includes internal tabs:

* Propuesto / Planned
* Real / Actual
* Comparación / Comparison

**Español:**
Las pestañas `Propuesto` y `Real` muestran los resultados completos de cada trayectoria.

**English:**
The `Planned` and `Actual` tabs show the full results for each trajectory.

Incluye / Includes:

* MD
* INC
* AZI
* Delta MD
* Dogleg
* Ratio Factor
* Delta TVD
* TVD / True Vertical Depth
* Delta North
* North
* Delta East
* East
* Vertical Section
* DLS / Dogleg Severity

**Español:**
La pestaña `Comparación` muestra las diferencias entre la trayectoria real y la trayectoria propuesta usando la lógica `Actual - Planned`.

**English:**
The `Comparison` tab shows the differences between the actual trajectory and the planned trajectory using the `Actual - Planned` logic.

Incluye / Includes:

* Plan Reference
* Delta INC
* Delta AZI
* Delta TVD
* Delta North
* Delta East
* Delta Vertical Section
* Delta DLS
* Closure Distance


---

### Vista Planta 2D / 2D Plan View

**Español:**
Muestra la trayectoria horizontal del pozo usando:

**English:**
Displays the horizontal trajectory of the well using:

```txt
East vs North
```

**Español:**
La vista permite seleccionar qué trayectoria mostrar:

**English:**
The view allows selecting which trajectory to display:

* Propuesto / Planned
* Real / Actual
* Ambos / Both

Incluye / Includes:

* Wellhead
* TD Planned
* TD Actual
* Trayectoria propuesta con línea azul discontinua / Planned trajectory with blue dashed line
* Trayectoria real con línea naranja continua / Actual trajectory with orange solid line
* Resumen de estaciones / Station summary
* Max Offset
* Hover técnico completo / Full technical hover

---

### Vista Vertical 2D / 2D Vertical Section View

**Español:**
Muestra la sección vertical usando:

**English:**
Displays the vertical section using:

```txt
Vertical Section vs TVD
```

La vista permite ingresar:

The view allows entering:

```txt
Vertical Section Direction
```

Este ángulo define la dirección de proyección de la sección vertical.

This angle defines the projection direction of the vertical section.

Ejemplos / Examples:

```txt
0°    → North direction
90°   → East direction
180°  → South direction
270°  → West direction
```

**Español:**
La vista permite seleccionar qué trayectoria mostrar:

**English:**
The view allows selecting which trajectory to display:

* Propuesto / Planned
* Real / Actual
* Ambos / Both

Incluye / Includes:

* Wellhead
* TD Planned
* TD Actual
* Vertical Section Direction
* VS at TD
* Trayectoria propuesta con línea azul discontinua / Planned trajectory with blue dashed line
* Trayectoria real con línea naranja continua / Actual trajectory with orange solid line
* TVD hacia abajo / TVD downward
* Hover técnico completo / Full technical hover

---


### Vista 3D / 3D View

**Español:**
Muestra la trayectoria espacial del pozo usando:

**English:**
Displays the spatial well trajectory using:

```txt
East + North + TVD
```

Incluye / Includes:

* Wellhead
* TD
* Estaciones / Stations
* Color por MD / Color by MD
* Barra de MD invertida / Inverted MD colorbar
* Rotación / Rotation
* Zoom
* Pan
* Hover técnico completo / Full technical hover

---

### Persistencia local / Local Persistence

**Español:**
Los datos ingresados se guardan temporalmente en `localStorage`.
Esto permite actualizar la página sin perder los surveys ingresados ni la configuración principal del viewer.

**English:**
Entered data is temporarily saved in `localStorage`.
This allows refreshing the page without losing the entered surveys or the main viewer configuration.

Se guarda / It saves:

* Planned Surveys / Surveys propuestos
* Actual Surveys / Surveys reales
* Unit system
* Vertical Section Direction
* Trajectory display mode: Planned, Actual or Both


---

### Nuevo proyecto / New Project

**Español:**
El botón `Nuevo proyecto` limpia los datos guardados y reinicia el viewer.
Antes de borrar los datos, la aplicación muestra una confirmación.

**English:**
The `Nuevo proyecto` button clears the saved data and resets the viewer.
Before deleting the data, the application shows a confirmation message.

Al reiniciar / On reset:

* Se borran los surveys propuestos / Planned surveys are cleared.
* Se borran los surveys reales / Actual surveys are cleared.
* Ambas trayectorias vuelven a la estación inicial MD 0, INC 0, AZI 0 / Both trajectories return to the initial station MD 0, INC 0, AZI 0.
* Se desbloquean las unidades / Units are unlocked.
* Se reinicia el modo de visualización de trayectoria / The trajectory display mode is reset.
* Se limpia el `localStorage` / `localStorage` is cleared.

---


## Estructura actual / Current Structure

```txt
erland-well-viewer/
 ├── src/
 │   ├── components/
 │   │   ├── Navbar/
 │   │   │   ├── Navbar.jsx
 │   │   │   └── Navbar.css
 │   │   ├── ViewTabs/
 │   │   │   ├── ViewTabs.jsx
 │   │   │   └── ViewTabs.css
 │   │   ├── SurveyInput/
 │   │   │   ├── SurveyInput.jsx
 │   │   │   └── SurveyInput.css
 │   │   ├── SurveyTable/
 │   │   │   ├── SurveyTable.jsx
 │   │   │   └── SurveyTable.css
 │   │   ├── PlannedActualInput/
 │   │   │   ├── PlannedActualInput.jsx
 │   │   │   └── PlannedActualInput.css
 │   │   ├── PlannedActualResults/
 │   │   │   ├── PlannedActualResults.jsx
 │   │   │   └── PlannedActualResults.css
 │   │   ├── PlannedActualComparisonTable/
 │   │   │   ├── PlannedActualComparisonTable.jsx
 │   │   │   └── PlannedActualComparisonTable.css
 │   │   ├── TrajectoryDisplayMode/
 │   │   │   ├── TrajectoryDisplayMode.jsx
 │   │   │   └── TrajectoryDisplayMode.css
 │   │   ├── PlanView2D/
 │   │   │   ├── PlanView2D.jsx
 │   │   │   └── PlanView2D.css
 │   │   ├── VerticalView2D/
 │   │   │   ├── VerticalView2D.jsx
 │   │   │   └── VerticalView2D.css
 │   │   └── WellPath3D/
 │   │       ├── WellPath3D.jsx
 │   │       └── WellPath3D.css
 │   ├── config/
 │   │   └── units.js
 │   ├── data/
 │   │   └── demoWells.js
 │   ├── styles/
 │   │   └── global.css
 │   ├── App.jsx
 │   ├── App.css
 │   └── main.jsx
 ├── CHANGELOG.md
 ├── package.json
 ├── package-lock.json
 └── README.md
```


---

## Instalación / Installation

Instalar dependencias:

Install dependencies:

```bash
npm install
```

Instalar la librería local:

Install the local library:

```bash
npm install ../erland-well-core
```

---

## Ejecutar en desarrollo / Run Development Server

```bash
npm run dev
```

Luego abrir:

Then open:

```txt
http://localhost:5173/
```

---

## Flujo de uso / Usage Flow

**Español:**

1. Seleccionar unidades: Feet o Meters.
2. Ingresar datos en `Planned Surveys / Propuesto`.
3. Ingresar datos en `Actual Surveys / Real`.
4. Revisar los resultados completos en `Resultados`.
5. Usar las pestañas internas `Propuesto`, `Real` y `Comparación`.
6. Revisar la comparación Planned vs Actual para analizar deltas y `Closure Distance`.
7. Ver la trayectoria horizontal en `Vista Planta 2D`.
8. Seleccionar `Propuesto`, `Real` o `Ambos` para comparar visualmente las trayectorias.
9. Configurar `Vertical Section Direction` y revisar `Vista Vertical 2D`.
10. Revisar la trayectoria espacial en `Vista 3D`.
11. Usar `Nuevo proyecto` para limpiar todo y empezar nuevamente.

**English:**

1. Select units: Feet or Meters.
2. Enter data in `Planned Surveys / Proposed`.
3. Enter data in `Actual Surveys / Actual`.
4. Review the full results in `Results`.
5. Use the internal tabs `Planned`, `Actual`, and `Comparison`.
6. Review the Planned vs Actual comparison to analyze deltas and `Closure Distance`.
7. View the horizontal trajectory in `2D Plan View`.
8. Select `Planned`, `Actual`, or `Both` to visually compare trajectories.
9. Configure `Vertical Section Direction` and review `2D Vertical View`.
10. Review the spatial trajectory in `3D View`.
11. Use `New Project` to clear everything and start again.


---

## Unidades / Units

### Feet

```txt
MD, TVD, North, East → ft
INC, AZI, Dogleg → deg
DLS → deg/100 ft
```

### Meters

```txt
MD, TVD, North, East → m
INC, AZI, Dogleg → deg
DLS → deg/30 m
```

---

## Notas técnicas / Technical Notes

**Español:**
La aplicación bloquea el cambio de unidades después de ingresar más de una estación en Planned Surveys o Actual Surveys para evitar inconsistencias en los datos.

**English:**
The application locks unit changes after more than one station is entered in Planned Surveys or Actual Surveys to avoid data inconsistencies.

**Español:**
Los modelos demo reemplazan los surveys actuales después de una confirmación. En la versión Planned vs Actual, el demo se carga tanto en la trayectoria propuesta como en la trayectoria real.

**English:**
Demo models replace the current surveys after confirmation. In the Planned vs Actual version, the demo is loaded into both the planned trajectory and the actual trajectory.

**Español:**
Los campos numéricos no muestran flechas de incremento/decremento para evitar cambios accidentales.

**English:**
Numeric fields do not show increment/decrement arrows to avoid accidental changes.

**Español:**
El cálculo de trayectoria y Vertical Section se realiza usando `calculateTrajectoryWithVerticalSection()` desde `erland-well-core`.

**English:**
Trajectory and Vertical Section calculations are performed using `calculateTrajectoryWithVerticalSection()` from `erland-well-core`.

**Español:**
La comparación Planned vs Actual usa el MD del survey real como referencia. Si el plan tiene ese mismo MD, se muestra `Exact MD`. Si no existe ese MD exacto pero está dentro del rango del plan, se muestra `Interpolated`.

**English:**
The Planned vs Actual comparison uses the actual survey MD as the reference. If the plan has the same MD, it displays `Exact MD`. If that exact MD does not exist but is inside the planned range, it displays `Interpolated`.


---

## Próximos pasos / Next Steps

* Integrar Planned vs Actual en la vista 3D.

* Integrate Planned vs Actual into the 3D view.

* Agregar selector de idioma: English / Español.

* Add language selector: English / Spanish.

* Exportar resultados en CSV.

* Export results to CSV.

* Importar surveys desde CSV o Excel.

* Import surveys from CSV or Excel.

* Guardar y cargar proyectos en JSON.

* Save and load projects as JSON.

* Agregar validaciones visuales por fila.

* Add visual row validations.

* Mejorar diseño responsive para celular.

* Improve responsive design for mobile devices.

* Agregar modo de resultados básicos y completos.

* Add basic and full results mode.

* Agregar más opciones de configuración para la vista vertical.

* Add more configuration options for the vertical view.

* Evaluar una vista 3D avanzada con Three.js en futuras versiones.

* Evaluate an advanced 3D view with Three.js in future versions.

* Evaluar selector de paletas por pozo o por cliente.

* Evaluate palette selector by well or by client.


---

## Visual Theme v0.3.0 / Tema visual v0.3.0

**Español:**
En la versión `0.3.0`, `erland-well-viewer` actualiza su interfaz con una paleta visual más técnica, moderna e industrial.

**English:**
In version `0.3.0`, `erland-well-viewer` updates its interface with a more technical, modern, and industrial visual palette.

---

## Planned vs Actual v0.4.0 / Comparación Planned vs Actual v0.4.0

**Español:**
En la versión `0.4.0`, `erland-well-viewer` agrega un flujo Planned vs Actual para comparar una trayectoria propuesta contra una trayectoria real.

**English:**
In version `0.4.0`, `erland-well-viewer` adds a Planned vs Actual workflow to compare a planned trajectory against an actual trajectory.

---

### Trayectorias / Trajectories

**Español:**
La aplicación ahora permite trabajar con dos grupos de surveys:

**English:**
The application now allows working with two survey groups:

* Planned Surveys / Propuesto
* Actual Surveys / Real

**Español:**
Ambas trayectorias parten desde el mismo wellhead y se calculan usando `erland-well-core`.

**English:**
Both trajectories start from the same wellhead and are calculated using `erland-well-core`.

---

### Visualización / Visualization

**Español:**
Las vistas `PlanView2D` y `VerticalView2D` permiten seleccionar qué trayectoria mostrar:

**English:**
The `PlanView2D` and `VerticalView2D` views allow selecting which trajectory to display:

* Propuesto / Planned
* Real / Actual
* Ambos / Both

**Español:**
La trayectoria propuesta se muestra con línea azul discontinua y la trayectoria real con línea naranja continua.

**English:**
The planned trajectory is displayed with a blue dashed line and the actual trajectory with an orange solid line.

---

### Comparación / Comparison

**Español:**
La pestaña `Comparación` permite analizar las diferencias entre la trayectoria real y la trayectoria propuesta.

**English:**
The `Comparison` tab allows analyzing the differences between the actual trajectory and the planned trajectory.

**Español:**
La comparación usa el MD del survey real como referencia. Si el plan tiene ese mismo MD, se muestra `Exact MD`. Si no tiene ese MD exacto pero está dentro del rango del plan, se muestra `Interpolated`.

**English:**
The comparison uses the actual survey MD as the reference. If the plan has the same MD, it displays `Exact MD`. If it does not have that exact MD but it is inside the planned range, it displays `Interpolated`.

Incluye / Includes:

* Plan Reference
* Delta INC
* Delta AZI
* Delta TVD
* Delta North
* Delta East
* Delta Vertical Section
* Delta DLS
* Closure Distance

---

### Regla de deltas / Delta Rule

```txt
Delta = Actual - Planned
```

**Español:**
Los valores positivos indican que el valor real es mayor que el valor planeado. Los valores negativos indican que el valor real es menor que el valor planeado.

**English:**
Positive values indicate that the actual value is greater than the planned value. Negative values indicate that the actual value is lower than the planned value.

**Español:**
`Closure Distance` representa la separación horizontal total entre la trayectoria real y la trayectoria propuesta en el mismo MD.

**English:**
`Closure Distance` represents the total horizontal separation between the actual trajectory and the planned trajectory at the same MD.

---

## Theme System / Sistema de tema

**Español:**
La aplicación ahora usa variables CSS globales para manejar colores principales, fondos, bordes, textos y estados visuales.

**English:**
The application now uses global CSS variables to manage primary colors, backgrounds, borders, text colors, and visual states.

Archivo principal / Main file:

```txt id="wz6ndm"
src/styles/global.css
```

Ejemplo / Example:

```css id="vij4cf"
:root {
  --color-bg: #06111f;
  --color-surface: #10243a;
  --color-primary: #38bdf8;
  --color-accent: #f59e0b;
  --color-text: #e5edf5;
  --color-border: #244766;
}
```

---

## Updated Components / Componentes actualizados

**Español:**
La nueva paleta visual fue aplicada a los principales componentes del viewer.

**English:**
The new visual palette was applied to the main viewer components.

```txt id="126rf9"
Navbar
ViewTabs
SurveyInput
SurveyTable
VerticalView2D
PlanView2D
WellPath3D
```

---

## Mobile Improvements / Mejoras móviles

**Español:**
Se ajustó el título del gráfico de `VerticalView2D` para evitar cortes visuales en pantallas pequeñas como iPhone 12 Pro.

**English:**
The `VerticalView2D` chart title was adjusted to avoid visual clipping on small screens such as iPhone 12 Pro.

---

## Future Palette Selector / Futuro selector de paletas

**Español:**
La estructura actual prepara el camino para una futura opción donde cada pozo o cliente pueda tener su propia paleta visual.

**English:**
The current structure prepares the way for a future option where each well or client can have its own visual palette.

Ejemplo / Example:

```txt id="3ma2nh"
Well A / Pozo A → Blue palette / Paleta azul
Well B / Pozo B → Green palette / Paleta verde
Well C / Pozo C → Orange palette / Paleta naranja
```

**Español:**
Esto puede ayudar a identificar visualmente distintos pozos en operación, especialmente cuando una empresa trabaja con varios pozos en diferentes zonas.

**English:**
This can help visually identify different wells in operation, especially when a company works with several wells in different locations.

---

## Autor / Author

Erland Ruiz Rivera
