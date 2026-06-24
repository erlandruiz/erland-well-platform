# Changelog

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