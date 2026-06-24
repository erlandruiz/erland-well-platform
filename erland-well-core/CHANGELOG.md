# Changelog
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
