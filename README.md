# Fleet Tracker Dashboard

A real-time fleet dashboard built with React, TypeScript, Vite, Material UI, Tailwind CSS v4, and Zustand.

The app displays live vehicle status, fleet statistics, and vehicle details with API polling + WebSocket-driven updates.

## Features

- Live vehicle table with status, speed, destination, ETA, last update, and location.
- Status filtering: All, Idle, En Route, Delivered.
- Fleet statistics panel with total, average speed, moving count, and last update.
- Vehicle detail modal with driver/contact info, battery, and fuel indicators.
- Automatic data normalization/formatting for timestamps, speed units, and coordinates.
- Real-time WebSocket ingestion with throttled updates (applies updates at most once every ~3 minutes).

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Material UI + MUI Icons
- Tailwind CSS 4 (via @tailwindcss/vite)
- Zustand + Immer + Devtools middleware
- Day.js for date/time formatting

## API Endpoints

The app currently consumes hosted endpoints directly in source code:

- REST vehicles: https://case-study-26cf.onrender.com/api/vehicles
- REST statistics: https://case-study-26cf.onrender.com/api/statistics
- WebSocket: wss://case-study-26cf.onrender.com

Status filter requests are sent as query params:

- ?status=idle
- ?status=en_route
- ?status=delivered

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

1. Clone the repository.
2. Install dependencies:

   npm install

### Run Locally

Start development server:

npm run dev

Build for production:

npm run build

Preview production build:

npm run preview

Run lint checks:

npm run lint

## Verified Project Status

As of 2026-07-03:

- npm run build passes.
- npm run lint passes.

## Architecture Overview

### Main UI Composition

- src/App.tsx
  - Fetches initial fleet and statistics data.
  - Subscribes to WebSocket updates.
  - Composes sidebar (filters + stats) and main table.

- src/StatusFilter.tsx
  - Reads selected status from vehicle store.
  - Uses statistics counts for badge numbers.

- src/FleetStatistics.tsx
  - Renders KPI cards from statistics store.
  - Computes human-readable relative update time.

- src/VehicleTable.tsx
  - Renders current vehicle list from vehicle store.
  - Opens detail modal via selected vehicle state.

- src/VehicleDetailModal.tsx
  - Displays enriched fields for selected vehicle.

### State Management

- src/store/vehicle.ts
  - Vehicle dataset, loading/error state, active filter, selected vehicle, feed timestamp.

- src/store/statistics.ts
  - Statistics dataset plus loading/error state.

### Data Layer

- src/api/fleetApi.ts and src/api/statisticsApi.ts
  - Fetch data and throw on non-OK responses.

- src/utils/vehicle.ts
  - Normalizes API vehicle data:
    - Status casing
    - Speed unit display
    - Date formatting
    - Coordinate formatting
    - Battery/fuel fallbacks

- src/hooks/useWebSoket.ts
  - Generic WebSocket hook handling open/message/error/close.

## Review Notes

### Strengths

- Clear separation between UI, stores, API, types, and utility formatting layers.
- Good handling of loading and error states in table/statistics panels.
- Typed data flow from API models into UI-specific normalized models.
- Consistent component structure and readable state updates.

### Improvement Opportunities

- Move API base URL to environment variables for easier staging/prod switching.
- Add unit tests for normalization and date utility functions.
- Add integration tests for filter behavior + modal interaction.
- Consider extracting the WebSocket update interval (3 minutes) into a named config constant.
- File name typo to consider correcting for consistency: src/hooks/useWebSoket.ts.

## Suggested Next Enhancements

- Add retry/backoff for transient API failures.
- Add connection status indicator based on WebSocket hook status.
- Add pagination or virtualization if fleet size grows significantly.
