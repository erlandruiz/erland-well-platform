# Changelog

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