const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let pedidos = [];

app.use(express.json());
app.use(express.static("public")); // Servir arquivos estáticos

// Rota para buscar pedidos (Polling)
app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

// Rota para adicionar pedidos
app.post("/pedidos", (req, res) => {
  const novoPedido = req.body;
  pedidos.push(novoPedido);
  
  // Notificar clientes WebSocket
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(novoPedido));
    }
  });

  res.status(201).json(novoPedido);
});

// Servidor WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente conectado via WebSocket");
});

server.listen(3000, () => console.log("Servidor rodando na porta 3000"));
