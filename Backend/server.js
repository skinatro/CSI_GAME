const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 3050;
const wsPort = 8081;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
app.use(express.static('site-src'));

const clients = new Set();
let numbers = []; // Array to store received numbers (if needed)

// POST endpoint for your Python script
app.post('/data', (req, res) => {
  const { inp } = req.body;
  if (inp === undefined) {
    return res.status(400).send('No data provided.');
  }
  console.log(`Received data: ${inp}`);

  // Save the received number (optional)
  numbers.push(inp);
  if (numbers.length > 50) {
    numbers.shift();
  }

  // Broadcast the data to WebSocket clients
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'newData', data: inp }));
    }
  });

  res.send('Data received and broadcasted.');
});

// GET endpoint to return numbers (for axios polling in React, if needed)
app.get('/numbers', (req, res) => {
  res.json(numbers);
});

// Create a WebSocket server on a separate port
const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message from WebSocket client:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    clients.delete(ws);
  });
});

app.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}`));
console.log(`WebSocket server listening on port ${wsPort}`);

app.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} in use. Please choose a different port.`);
    process.exit(1);
  }
  throw error;
});
