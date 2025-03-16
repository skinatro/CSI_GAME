# Number Display App

A React-based application for displaying and managing numbers with drag-and-drop capabilities and a Windows 95-inspired UI.

## Features

- Interactive number display with drag-and-drop functionality
- Windows 95-style user interface using React95
- Python backend integration
- RESTful API server

## Tech Stack

- **Frontend**: React, styled-components, react95
- **Drag and Drop**: dnd-kit, react-beautiful-dnd
- **Backend**: Node.js, Express (assumed from package.json)
- **Additional Processing**: Python

## Prerequisites

- Node.js (version 14 or higher recommended)
- Python (version 3.6 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd game-one
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Make sure you have the necessary Python libraries installed (specific requirements may vary based on the Python scripts).

## Running the Application

### Development Mode

Run the application in development mode with debugging enabled:

```
npm run start-dev
```

This command will concurrently start:
- React development server
- Node.js backend server
- Python development script (dummy.py)

### Production Mode

Run the application in production mode:

```
npm run start-prod
```

This will start:
- React development server
- Node.js backend server
- Python production script (interface.py)

## Individual Components

If you need to run components separately:

- For just the frontend:
  ```
  npm run site
  ```

- For just the backend server:
  ```
  npm run server
  ```

- For just the Python development script:
  ```
  npm run python-dev
  ```

- For just the Python production script:
  ```
  npm run python-prod
  ```

## Project Structure

- `/src` - React application code
- `/Backend` - Node.js server code
- `/Python` - Python scripts for additional processing

## License

MIT
