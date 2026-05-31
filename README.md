# Window Configurator

A Three.js application for visualizing and configuring window assemblies. It has two views:

- **Configurator** (`index.html` + `src/`) — an interactive 3D view of a window (frame, beads, glass, handle) with a control panel to change dimensions, handle placement, and material style.
- **CAD view** (`cad/index1.html` + `cad/src/`) — a 2D orthographic technical-drawing view of the same window.

The two views share configuration through the browser's `localStorage` (key: `cadConfig`).

## Tech stack

- [Three.js](https://threejs.org/) r184 — 3D rendering
- [Vite](https://vitejs.dev/) — dev server and build
- Bootstrap (CSS only) for the control-panel layout

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server
```

Open the printed local URL in a browser. The configurator loads by default; use the "CAD View" button to switch.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build into `dist/` (both views) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |
| `npm run lint:fix` | Run ESLint and auto-fix what it can |
| `npm run format` | Format the codebase with Prettier |

## Project structure

```
src/
  main.js              App entry: wires scene + builders + render loop
  scene/               Scene, camera, renderer, lights
  objects/             Geometry builders (Frame, Bead, Glass, Handle)
  interaction/         Raycaster-based object selection
  ui/                  Control-panel DOM handlers
  utils/constants.js   Shared constants + the live `state` object
cad/                   The 2D CAD view (separate Vite entry)
public/                Static assets (fonts)
```

> `utils/constants.js` exports a single mutable `state` object that acts as the
> source of truth. Read from it live inside functions — do not snapshot its
> fields into module-level constants (they would freeze at load time).
