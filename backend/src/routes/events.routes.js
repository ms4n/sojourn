const express = require("express");
const router = express.Router();
const eventsService = require("../services/events.service");

router.get("/subscribe", (req, res) => {
  // Set headers for SSE
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Send initial connection message
  res.write('data: {"type": "connected"}\n\n');

  // Add client to active connections
  eventsService.addClient(res);

  // Remove client on connection close
  req.on("close", () => {
    eventsService.removeClient(res);
  });
});

module.exports = router;
