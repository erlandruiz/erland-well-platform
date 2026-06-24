# Erland Well Core

**Español:**
Librería privada en JavaScript para cálculos de pozos direccionales usando el método **Minimum Curvature**.

**English:**
Private JavaScript library for directional well calculations using the **Minimum Curvature** method.

---

## Estado del proyecto / Project Status

**Español:**
Versión inicial en desarrollo.

**English:**
Initial development version.

```txt
Version: 0.1.0
```

Actualmente la librería está configurada como privada.

The library is currently configured as private.

```json
"private": true,
"license": "UNLICENSED"
```

---

## Objetivo / Goal

**Español:**
Crear un motor matemático propio para cálculos de trayectoria de pozos direccionales.

**English:**
Create a custom mathematical engine for directional well trajectory calculations.

La primera versión calculará:

The first version will calculate:

* MD / Measured Depth
* INC / Inclination
* AZI / Azimuth
* Delta MD
* Dogleg
* Ratio Factor
* Delta TVD
* TVD / True Vertical Depth
* Delta North
* North
* Delta East
* East
* DLS / Dogleg Severity

---

## Método principal / Main Method

**Español:**
La primera versión usará el método **Minimum Curvature**.

**English:**
The first version will use the **Minimum Curvature** method.

**Español:**
Este método permite calcular una trayectoria suavizada del pozo a partir de estaciones de survey.

**English:**
This method calculates a smoothed well trajectory from survey stations.

---

## Estructura inicial / Initial Structure

```txt
erland-well-core/
 ├── examples/
 │   └── basicSurvey.js
 ├── src/
 │   ├── constants/
 │   │   └── units.js
 │   ├── math/
 │   │   └── angles.js
 │   ├── trajectory/
 │   │   ├── dogleg.js
 │   │   ├── ratioFactor.js
 │   │   ├── dls.js
 │   │   └── minimumCurvature.js
 │   ├── format/
 │   │   └── numberFormat.js
 │   ├── validation/
 │   │   └── surveyValidator.js
 │   └── index.js
 ├── tests/
 │   ├── dls.test.js
 │   ├── dogleg.test.js
 │   ├── minimumCurvature.test.js
 │   ├── numberFormat.test.js
 │   ├── ratioFactor.test.js
 │   ├── surveyValidator.test.js
 │   └── units.test.js
 ├── package.json
 ├── package-lock.json
 ├── README.md
 └── CHANGELOG.md
```

---

## Archivos / Files

### `src/index.js`

**Español:**  
Archivo principal de exportación de la librería.

**English:**  
Main export file of the library.

Permite importar las funciones principales desde un solo lugar.  
Allows importing the main functions from a single place.

---

### `src/math/angles.js`

**Español:**
Funciones auxiliares para trabajar con ángulos y valores matemáticos generales.

**English:**
Helper functions for working with angles and general mathematical values.

Incluye / Includes:

* `degToRad()` — convierte grados a radianes / converts degrees to radians.
* `radToDeg()` — convierte radianes a grados / converts radians to degrees.
* `clamp()` — limita un valor dentro de un rango / clamps a value within a range.

---

### `src/trajectory/dogleg.js`

**Español:**
Calcula el **Dogleg Angle** entre dos estaciones de survey.

**English:**
Calculates the **Dogleg Angle** between two survey stations.

Incluye / Includes:

* `calculateDoglegRad()` — calcula el Dogleg en radianes / calculates Dogleg in radians.
* `calculateDoglegDeg()` — calcula el Dogleg en grados / calculates Dogleg in degrees.

---
### `src/trajectory/ratioFactor.js`

**Español:**  
Calcula el **Ratio Factor** usado en el método **Minimum Curvature**.

**English:**  
Calculates the **Ratio Factor** used in the **Minimum Curvature** method.

Incluye / Includes:

- `calculateRatioFactor()` — calcula el factor de suavizado de la curva / calculates the curve smoothing factor.

**Nota / Note:**  
Si el Dogleg es casi cero, el Ratio Factor devuelve `1` para evitar división entre cero.  
If the Dogleg is almost zero, the Ratio Factor returns `1` to avoid division by zero.

---

### `src/trajectory/minimumCurvature.js`

**Español:**  
Calcula la trayectoria del pozo usando el método **Minimum Curvature**.

**English:**  
Calculates the well trajectory using the **Minimum Curvature** method.

Incluye / Includes:

- `calculateMinimumCurvature()` — calcula TVD, North, East, Dogleg, Ratio Factor y DLS / calculates TVD, North, East, Dogleg, Ratio Factor and DLS.

**Entradas / Inputs:**

- `md` — Measured Depth.
- `inc` — Inclination.
- `azi` — Azimuth.

**Salidas / Outputs:**

- `deltaMd`
- `doglegDeg`
- `doglegRad`
- `ratioFactor`
- `deltaTvd`
- `tvd`
- `deltaNorth`
- `north`
- `deltaEast`
- `east`
- `dls`

---




### `src/format/numberFormat.js`

**Español:**
Funciones para formatear números al mostrar o exportar resultados.

**English:**
Functions for formatting numbers when displaying or exporting results.

Incluye / Includes:

* `formatFixed()` — muestra valores con decimales fijos / displays values with fixed decimal places.

**Importante / Important:**
`formatFixed()` debe usarse solo para mostrar o exportar resultados.
`formatFixed()` should only be used for displaying or exporting results.

No debe usarse en cálculos internos.
It should not be used for internal calculations.





---

### `src/constants/units.js`

**Español:**  
Define constantes de unidades para cálculos de Dogleg Severity.

**English:**  
Defines unit constants for Dogleg Severity calculations.

Incluye / Includes:

- `DLS_COURSE_LENGTH.FEET` — 100, para DLS en grados por 100 pies / for DLS in degrees per 100 feet.
- `DLS_COURSE_LENGTH.METERS` — 30, para DLS en grados por 30 metros / for DLS in degrees per 30 meters.


---

### `src/trajectory/dls.js`

**Español:**  
Calcula el **Dogleg Severity**.

**English:**  
Calculates **Dogleg Severity**.

Incluye / Includes:

- `calculateDls()` — calcula DLS usando Dogleg, Delta MD y longitud de curso / calculates DLS using Dogleg, Delta MD and course length.


---

## Pruebas / Tests

**Español:**  
La librería usa Vitest para validar los cálculos principales, el formato numérico y la validación de datos de entrada.

**English:**  
The library uses Vitest to validate the main calculations, numeric formatting and input data validation.

Actualmente se prueban:

Currently tested:

- Dogleg Angle.
- Ratio Factor.
- Minimum Curvature.
- Pozo vertical / Vertical well.
- Trayectoria direccional básica / Basic directional trajectory.
- Valores esperados conocidos usando Minimum Curvature / Known expected values using Minimum Curvature.
- Limpieza de errores pequeños de precisión decimal / Cleaning small floating-point precision errors.
- Formato de resultados con 15 decimales / Formatting results with 15 decimal places.
- Validación de estaciones de survey / Survey station validation.
- Validación de lista de surveys / Survey list validation.
- Rechazo de MD negativo / Rejection of negative MD.
- Rechazo de INC fuera de rango / Rejection of out-of-range INC.
- Rechazo de AZI fuera de rango / Rejection of out-of-range AZI.
- Rechazo de MD que no aumenta / Rejection of non-increasing MD.
- Cálculo de DLS en pies y metros / DLS calculation in feet and meters.
- Constantes de unidades DLS / DLS unit constants.
- Cálculo independiente de DLS / Independent DLS calculation.

Ejecutar pruebas:

Run tests:
```bash
npm test
```

Test Files  7 passed (7)
Tests       29 passed (29)
---

---

## Ejemplos / Examples

### `examples/basicSurvey.js`

**Español:**  
Ejemplo básico para calcular una trayectoria usando estaciones de survey con `MD`, `INC` y `AZI`.

**English:**  
Basic example to calculate a trajectory using survey stations with `MD`, `INC` and `AZI`.

Ejecutar ejemplo:

Run example:

```bash
npm run example:basic
```
----


## Precisión numérica / Numeric Precision

**Español:**
Los cálculos internos se realizan usando números JavaScript (`Number`) sin redondear en cada paso.

**English:**
Internal calculations are performed using JavaScript numbers (`Number`) without rounding at each step.

**Español:**
El redondeo o formato a 15 decimales se aplica solo al mostrar o exportar resultados.

**English:**
Rounding or formatting to 15 decimal places is applied only when displaying or exporting results.

---

## Scripts

Ejecutar pruebas:

Run tests:

```bash
npm test
```

---

## Planned vs Actual Comparison / Comparación Plan vs Real

**Español:**
`erland-well-core` permite comparar una trayectoria real contra una trayectoria propuesta usando interpolación por MD real.

**English:**
`erland-well-core` allows comparing an actual trajectory against a planned trajectory using interpolation by actual MD.

---

## Why interpolation is needed / Por qué se necesita interpolación

**Español:**
En un pozo real, los surveys reales normalmente no coinciden exactamente con los surveys propuestos.

**English:**
In an actual well, actual survey stations usually do not exactly match planned survey stations.

Ejemplo / Example:

```txt
Planned Well:
MD 1000
MD 1100
MD 1200

Actual Survey:
MD 947.35
MD 1068.20
MD 1189.70
```

**Español:**
Por eso, el core toma cada MD real e interpola la trayectoria propuesta en ese mismo MD.

**English:**
For that reason, the core takes each actual MD and interpolates the planned trajectory at that same MD.

```txt
Actual MD 1068.20
vs
Planned interpolated at MD 1068.20
```

---

## Recommended Flow / Flujo recomendado

**Español:**
El flujo recomendado es calcular primero ambas trayectorias y luego compararlas.

**English:**
The recommended flow is to calculate both trajectories first and then compare them.

```js
import {
  calculateTrajectoryWithVerticalSection,
  comparePlannedActualByInterpolatedMd,
} from "erland-well-core";

const plannedSurveys = [
  { md: 0, inc: 0, azi: 0 },
  { md: 1000, inc: 10, azi: 90 },
  { md: 2000, inc: 20, azi: 90 },
  { md: 3000, inc: 30, azi: 90 },
];

const actualSurveys = [
  { md: 0, inc: 0, azi: 0 },
  { md: 947.35, inc: 11.2, azi: 91.5 },
  { md: 1888.7, inc: 19.4, azi: 88.8 },
  { md: 2765.45, inc: 31.1, azi: 92.2 },
];

const options = {
  dlsCourseLength: 100,
  verticalSectionDirection: 90,
};

const plannedTrajectory = calculateTrajectoryWithVerticalSection(
  plannedSurveys,
  options,
);

const actualTrajectory = calculateTrajectoryWithVerticalSection(
  actualSurveys,
  options,
);

const comparison = comparePlannedActualByInterpolatedMd(
  plannedTrajectory,
  actualTrajectory,
);

console.log(comparison);
```

---

## Compared Values / Valores comparados

**Español:**
La comparación calcula diferencias entre la trayectoria real y la trayectoria propuesta interpolada.

**English:**
The comparison calculates differences between the actual trajectory and the interpolated planned trajectory.

```txt
deltaInc
deltaAzi
deltaTvd
deltaNorth
deltaEast
deltaVerticalSection
deltaDls
deltaClosureDistance
```

También conserva:

It also keeps:

```txt
planned
actual
plannedWasInterpolated
deltas
```

---

## Azimuth Difference / Diferencia de Azimuth

**Español:**
El azimuth se compara usando la diferencia angular más corta.

**English:**
Azimuth is compared using the shortest angular difference.

Ejemplo / Example:

```txt
Actual AZI = 1°
Planned AZI = 359°
Delta AZI = +2°
```

Esto evita resultados incorrectos como:

This avoids incorrect results such as:

```txt
1° - 359° = -358°
```

---

## Version / Versión

```txt
erland-well-core v0.3.0
```

### Current capabilities / Capacidades actuales

* Minimum Curvature calculation.

* Cálculo por Minimum Curvature.

* Vertical Section calculation.

* Cálculo de Vertical Section.

* Planned vs Actual comparison using interpolated planned trajectory.

* Comparación Plan vs Real usando trayectoria propuesta interpolada.
---

## Autor / Author

Erland Ruiz Rivera
