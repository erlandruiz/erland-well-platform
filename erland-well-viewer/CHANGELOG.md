# Changelog
## [0.4.0] - Planned vs Actual Comparison

**Español:**
Se agregó el flujo Planned vs Actual para comparar una trayectoria propuesta contra una trayectoria real dentro del viewer.

**English:**
Added the Planned vs Actual workflow to compare a planned trajectory against an actual trajectory inside the viewer.

### Agregado / Added

* Nueva entrada de surveys separada para `Planned Surveys / Propuesto` y `Actual Surveys / Real`.

* New separated survey input for `Planned Surveys / Proposed` and `Actual Surveys / Actual`.

* Nueva vista de resultados con pestañas internas: `Propuesto`, `Real` y `Comparación`.

* New results view with internal tabs: `Proposed`, `Actual`, and `Comparison`.

* Nueva tabla de comparación Planned vs Actual.

* New Planned vs Actual comparison table.

* Nuevo selector de visualización de trayectoria: `Propuesto`, `Real` y `Ambos`.

* New trajectory display selector: `Proposed`, `Actual`, and `Both`.

* Soporte para mostrar trayectoria propuesta y real en `PlanView2D`.

* Support for displaying planned and actual trajectories in `PlanView2D`.

* Soporte para mostrar trayectoria propuesta y real en `VerticalView2D`.

* Support for displaying planned and actual trajectories in `VerticalView2D`.

### Comparación / Comparison

**Español:**
La comparación usa el MD del survey real como referencia. Para cada estación real, el viewer busca el punto equivalente en el plan. Si el MD existe exactamente en el plan, usa `Exact MD`. Si el MD no existe pero está dentro del rango del plan, interpola la trayectoria propuesta y muestra `Interpolated`.

**English:**
The comparison uses the actual survey MD as the reference. For each actual station, the viewer finds the equivalent point in the plan. If the MD exists exactly in the plan, it uses `Exact MD`. If the MD does not exist but is inside the planned trajectory range, it interpolates the planned trajectory and displays `Interpolated`.

### Métricas agregadas / Added Metrics

* Delta INC
* Delta AZI
* Delta TVD
* Delta North
* Delta East
* Delta Vertical Section
* Delta DLS
* Closure Distance

### Mejorado / Improved

* `PlanView2D` ahora permite mostrar solo la trayectoria propuesta, solo la real o ambas.

* `PlanView2D` can now display only the planned trajectory, only the actual trajectory, or both.

* `VerticalView2D` ahora permite mostrar solo la trayectoria propuesta, solo la real o ambas.

* `VerticalView2D` can now display only the planned trajectory, only the actual trajectory, or both.

* El proyecto guardado en `localStorage` ahora conserva surveys propuestos, surveys reales y modo de visualización.

* The project saved in `localStorage` now preserves planned surveys, actual surveys, and display mode.

- Se mejoró el diseño responsive de **Vista Planta 2D**, **Vista Vertical 2D** y **Vista 3D**.
- Improved the responsive layout for **Plan View 2D**, **Vertical Section View 2D**, and **3D Well Path**.

- Se agregaron leyendas compactas, símbolos de leyenda más pequeños e indicadores de resumen optimizados para celular.
- Added compact legends, smaller legend markers, and mobile-optimized summary indicators.

- Se mejoró la lectura de la barra MD en los modos **Propuesto**, **Real** y **Ambos**.
- Improved MD colorbar readability across **Planned**, **Actual**, and **Both** display modes.

- Se conservó el diseño desktop mientras se optimizó la experiencia móvil para uso en campo.
- Preserved the desktop layout while optimizing the mobile experience for field usage.
  
  
### Notas / Notes

**Español:**
`Closure Distance` representa la separación horizontal total entre la trayectoria real y la trayectoria propuesta en el mismo MD. Los valores Delta usan la lógica `Actual - Planned`.

**English:**
`Closure Distance` represents the total horizontal separation between the actual trajectory and the planned trajectory at the same MD. Delta values use the `Actual - Planned` logic.

**Español:**
La vista 3D todavía mantiene el flujo de trayectoria actual y podrá integrarse con Planned vs Actual en una futura versión.

**English:**
The 3D view still keeps the current trajectory workflow and can be integrated with Planned vs Actual in a future version.


## [0.3.0] - Visual Theme Update

**Español:**
Se actualizó la interfaz visual del viewer con una nueva paleta de colores tipo dashboard técnico/industrial.

**English:**
Updated the viewer interface with a new technical/industrial dashboard color palette.

### Agregado / Added

* Nueva paleta visual basada en variables CSS.

* New visual palette based on CSS variables.

* Variables globales de tema en `src/styles/global.css`.

* Global theme variables in `src/styles/global.css`.

* Colores preparados para futuras vistas `Planned vs Actual`.

* Colors prepared for future `Planned vs Actual` views.

### Mejorado / Improved

* Nuevo estilo visual para `Navbar`.

* New visual style for `Navbar`.

* Nuevo estilo visual para `ViewTabs`.

* New visual style for `ViewTabs`.

* Nuevo estilo visual para `SurveyInput`.

* New visual style for `SurveyInput`.

* Nuevo estilo visual para `SurveyTable`.

* New visual style for `SurveyTable`.

* Nuevo estilo visual para `VerticalView2D`.

* New visual style for `VerticalView2D`.

* Nuevo estilo visual para `PlanView2D`.

* New visual style for `PlanView2D`.

* Nuevo estilo visual para `WellPath3D`.

* New visual style for `WellPath3D`.

### Corregido / Fixed

* Se ajustó el título del gráfico `VerticalView2D` para evitar que se corte en pantallas pequeñas como iPhone 12 Pro.
* Adjusted the `VerticalView2D` chart title to prevent clipping on small screens such as iPhone 12 Pro.

### Notas / Notes

**Español:**
Esta versión mejora la presentación visual del viewer para que sea más clara, moderna y profesional al mostrarlo a clientes.

**English:**
This version improves the viewer’s visual presentation, making it clearer, more modern, and more professional when presenting it to clients.

**Español:**
La estructura con variables CSS deja preparada la base para una futura opción de selección de paletas por pozo o por cliente.

**English:**
The CSS variable structure prepares the foundation for a future palette selector by well or by client.

## [0.2.0] - Vertical Section from Core

**Español:**  
Se actualizó el viewer para usar el cálculo de Vertical Section desde `erland-well-core`.

**English:**  
Updated the viewer to use Vertical Section calculation from `erland-well-core`.

### Cambiado / Changed

- El viewer ahora usa `calculateTrajectoryWithVerticalSection()` desde `erland-well-core`.
- The viewer now uses `calculateTrajectoryWithVerticalSection()` from `erland-well-core`.

- La vista vertical ya no calcula Vertical Section manualmente.
- The vertical view no longer calculates Vertical Section manually.

### Agregado / Added

- Nueva columna `Vertical Section` en la tabla de resultados.
- New `Vertical Section` column in the results table.

### Notas / Notes

**Español:**  
Este cambio mejora la separación entre lógica técnica y visualización.

**English:**  
This change improves the separation between technical logic and visualization.



## [0.1.0] - Initial Viewer Version

**Español:**  
Primera versión visual funcional de Erland Well Viewer.

**English:**  
First functional visual version of Erland Well Viewer.

### Incluye / Includes

- Entrada de surveys con MD, INC y AZI.
- Selector de unidades: feet y meters.
- Bloqueo de unidades después de ingresar más de una estación.
- Confirmación antes de eliminar estaciones.
- Confirmación antes de crear un nuevo proyecto.
- Persistencia local usando localStorage.
- Botón Nuevo proyecto.
- Carga de pozos modelo / demo wells.
- Pozo Modelo 12000 ft con Vertical Section Direction de 68°.
- Pozo Modelo 3360 m con Vertical Section Direction de 130°.
- Resultados completos usando erland-well-core:
  - MD
  - INC
  - AZI
  - Delta MD
  - Dogleg
  - Ratio Factor
  - Delta TVD
  - TVD
  - Delta North
  - North
  - Delta East
  - East
  - DLS
- Vista Planta 2D: East vs North.
- Vista Vertical 2D: Vertical Section vs TVD.
- Campo Vertical Section Direction.
- Vista 3D: East, North y TVD.
- Wellhead y TD en vistas 2D y 3D.
- Color por MD en vistas gráficas.
- Barra de MD invertida.
- Hover técnico completo en gráficas.
- Diseño responsive básico.
- Inputs numéricos sin flechas para evitar cambios accidentales.

### Notas / Notes

**Español:**  
La vista vertical calcula actualmente Vertical Section dentro del viewer. En una futura versión, este cálculo debe moverse a `erland-well-core`.

**English:**  
The vertical view currently calculates Vertical Section inside the viewer. In a future version, this calculation should be moved to `erland-well-core`.

**Español:**  
El build de producción funciona correctamente. Vite muestra una advertencia de tamaño de bundle debido principalmente a Plotly.

**English:**  
The production build works correctly. Vite shows a bundle size warning mainly due to Plotly.

### Build Status

```txt
✓ built successfully
erland-well-viewer v0.1.0
```