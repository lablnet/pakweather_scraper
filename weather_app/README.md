# Weather App

A modern React + TypeScript + Tailwind CSS weather application for Pakistan weather data, built with Vite.

## Features

- View current weather data (current hour or previous hour if not available)
- Compare with last year's weather data for the same date
- Filter weather data by specific dates
- Beautiful, responsive UI built with Tailwind CSS
- TypeScript for type safety
- Fast development with Vite

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure API URL:
   - Create a `.env` file in the root directory
   - Add your Lambda API URL:
   ```
   VITE_API_URL=https://your-lambda-url.execute-api.us-east-1.amazonaws.com/prod
   ```

3. Start the development server:
```bash
pnpm dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
pnpm build
```

To preview the production build:
```bash
pnpm preview
```

## Project Structure

```
src/
  ├── pages/
  │   ├── Home.tsx       # Home page with city selector
  │   └── Weather.tsx     # Weather details page
  ├── utils/
  │   └── api.ts         # API utility functions
  ├── App.tsx            # Main app component with routing
  └── index.tsx          # Entry point
```

## API Endpoints Used

- `GET /weather/today?latitude={lat}&longitude={lng}` - Get today's weather with last year comparison
- `GET /weather/locations` - Get list of available locations
- `GET /weather/past?latitude={lat}&longitude={lng}&date={date}` - Get past weather data

## Technologies

- React 19
- TypeScript
- Vite (build tool)
- Tailwind CSS v3
- React Router DOM
