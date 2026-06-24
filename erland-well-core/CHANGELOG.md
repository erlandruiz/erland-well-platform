# Changelog

## [0.3.0] - Planned vs Actual Interpolated Comparison

**Español:**
Se agregó soporte inicial para comparar una trayectoria real contra una trayectoria propuesta usando interpolación por MD real.

**English:**
Added initial support for comparing an actual trajectory against a planned trajectory using interpolation by actual MD.

### Agregado / Added

* Nueva función `comparePlannedActualByInterpolatedMd()`.

* New function `comparePlannedActualByInterpolatedMd()`.

* Nueva función `interpolateTrajectoryAtMd()`.

* New function `interpolateTrajectoryAtMd()`.

* Nuevas utilidades angulares:

* New angle utilities:

  * `normalizeAngleDeg()`
  * `calculateAngleDifferenceDeg()`
  * `interpolateAngleDeg()`

* Interpolación del pozo propuesto al MD de cada estación real.

* Interpolation of the planned well at each actual survey station MD.

* Comparación de resultados calculados entre trayectoria real y trayectoria propuesta interpolada.

* Comparison of calculated results between actual trajectory and interpolated planned trajectory.

### Campos comparados / Compared Fields

La comparación permite calcular diferencias para:

The comparison can calculate differences for:

* `deltaInc`
* `deltaAzi`
* `deltaTvd`
* `deltaNorth`
* `deltaEast`
* `deltaVerticalSection`
* `deltaDls`
* `deltaClosureDistance`

También conserva los valores calculados de cada estación:

It also preserves the calculated values for each station:

* `deltaMd`
* `doglegDeg`
* `doglegRad`
* `ratioFactor`
* `deltaTvd`
* `tvd`
* `deltaNorth`
* `north`
* `deltaEast`
* `east`
* `verticalSection`
* `dls`

### Mejorado / Improved

* El cálculo de diferencia de azimuth ahora usa la diferencia angular más corta.
* Azimuth difference now uses the shortest angular difference.

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

### Notas / Notes

**Español:**
Esta versión está pensada para casos reales donde los surveys del pozo real no coinciden exactamente con los surveys del pozo propuesto.

**English:**
This version is designed for real cases where actual survey stations do not exactly match planned survey stations.

**Español:**
El flujo recomendado es calcular primero ambas trayectorias usando `calculateTrajectoryWithVerticalSection()` y luego comparar con `comparePlannedActualByInterpolatedMd()`.

**English:**
The recommended flow is to first calculate both trajectories using `calculateTrajectoryWithVerticalSection()` and then compare them with `comparePlannedActualByInterpolatedMd()`.



## [0.2.0] - Vertical Section Support

**Español:**  
Se agregó soporte para cálculo de Vertical Section dentro del core.

**English:**  
Added support for Vertical Section calculation inside the core.

### Agregado / Added

- Nueva función `calculateVerticalSection()`.
- New function `calculateVerticalSection()`.

- Nueva función `calculateTrajectoryWithVerticalSection()`.
- New function `calculateTrajectoryWithVerticalSection()`.

- Cálculo de Vertical Section usando North, East y Vertical Section Direction.
- Vertical Section calculation using North, East, and Vertical Section Direction.

- Pruebas unitarias para `calculateVerticalSection()`.
- Unit tests for `calculateVerticalSection()`.

- Pruebas unitarias para `calculateTrajectoryWithVerticalSection()`.
- Unit tests for `calculateTrajectoryWithVerticalSection()`.

### Fórmula / Formula

```txt
VS = North * cos(direction) + East * sin(direction)
```

## [0.1.0] - Initial Core Version

**Español:**
Primera versión del motor matemático base para cálculos de pozos direccionales.

**English:**
First version of the core mathematical engine for directional well calculations.

### Incluye / Includes

* Cálculo de trayectoria usando Minimum Curvature / Trajectory calculation using Minimum Curvature.
* Cálculo de Dogleg Angle / Dogleg Angle calculation.
* Cálculo de Ratio Factor / Ratio Factor calculation.
* Cálculo de Dogleg Severity / Dogleg Severity calculation.
* Soporte para DLS en grados por 100 ft / Support for DLS in degrees per 100 ft.
* Soporte para DLS en grados por 30 m / Support for DLS in degrees per 30 m.
* Validación de estaciones de survey / Survey station validation.
* Validación de listas de surveys / Survey list validation.
* Formato visual de números con 15 decimales / Visual number formatting with 15 decimal places.
* Ejemplo básico en consola / Basic console example.
* Pruebas unitarias con Vitest / Unit tests with Vitest.

### Estado de pruebas / Test Status

```txt
Test Files  7 passed (7)
Tests       29 passed (29)
```
