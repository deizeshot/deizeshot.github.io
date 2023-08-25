const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const maxMessages = 50;
let chatHistory = []; // Одно хранилище для истории чата
let serverActivityTimer;

app.use(express.json());

function getTimeString() {
  return `(${moment().tz("Europe/Moscow").format("HH:mm")})`;
}

function loadChatHistory() {
  const filePath = path.join(__dirname, "chatHistorynarko.json");
  try {
    const chatHistoryData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(chatHistoryData);
  } catch (err) {
    console.error("Error loading chat history:", err.message);
    return [];
  }
}

function saveChatHistory(messages) {
  const filePath = path.join(__dirname, "chatHistorynarko.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(messages), "utf8");
    console.log(`Chat history saved to ${filePath}`);
  } catch (err) {
    console.error("Error saving chat history:", err.message);
  }
}

wss.on("connection", (ws, req) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ type: "chatHistory", history: chatHistory.slice(-maxMessages) }));

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    clearTimeout(serverActivityTimer);
    serverActivityTimer = setTimeout(() => {
      console.log("Server activity timeout, closing connection.");
      ws.terminate();
    }, 600000);

    try {
      const parsedMessage = JSON.parse(message);
      const currentTime = getTimeString();

      if (parsedMessage.type === "chatMessage") {
        const newMessage = {
          type: "chatMessage",
          message: parsedMessage.message,
          time: currentTime,
          text: parsedMessage.text,
        };

        chatHistory.push(newMessage);
        saveChatHistory(chatHistory);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "chat-message", message: newMessage }));
          }
        });
      } else if (parsedMessage.type === "clearChat") {
        chatHistory = [];
        saveChatHistory(chatHistory);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "clearChat" }));
          }
        });
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

chatHistory = loadChatHistory();

app.get("/his", (req, res) => {
  const filePath = path.join(__dirname, "chatHistorynarko.json");
  try {
    const chatHistoryData = fs.readFileSync(filePath, "utf8");
    const chatHistory = JSON.parse(chatHistoryData);
    res.json(chatHistory);
  } catch (err) {
    console.error("Error loading chat history:", err.message);
    res.status(500).send("Error loading chat history");
  }
});
