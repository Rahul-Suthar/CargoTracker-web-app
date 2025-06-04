# Cargo Shipment Tracker — Frontend

This is the **React frontend** for the Cargo Shipment Tracker MERN app.

## Features

- Add new shipments with shipment ID, container ID, routes, location, status, and ETA.
- View all shipments in a responsive dashboard.
- Update shipment location with a modal form.
- Validates ETA and input fields.
- Modern UI with Tailwind CSS.

## Tech Stack

- React
- Axios
- Day.js
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js & npm
- The backend API running (see backend repo)[CargoTracker-backend](https://github.com/rahul-suthar/CargoTracker-backend)

### Setup

1. Clone this repo:
   ```sh
   git clone https://github.com/rahul-suthar/CargoTracker-web-app.git
   cd CargoTracker-web-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the frontend:
   ```sh
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

- `VITE_API_URL` — The base URL of your backend API.


**Note:**  
Do **not** commit your `.env` file or sensitive credentials.  
See `.gitignore` for details.