const User = require("../models/user.model");

class EventsService {
  constructor() {
    this.clients = new Set();
    this.startTime = Date.now();
    this.streamIntervals = new Map();
  }

  addClient(client) {
    this.clients.add(client);
    // Start streaming data for this client
    this.startStreaming(client);
  }

  removeClient(client) {
    this.clients.delete(client);
    // Clean up intervals for this client
    if (this.streamIntervals.has(client)) {
      clearInterval(this.streamIntervals.get(client));
      this.streamIntervals.delete(client);
    }
  }

  sendEventToAll(eventData) {
    this.clients.forEach((client) => {
      client.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });
  }

  async startStreaming(client) {
    // Create an interval for this client
    const intervalId = setInterval(async () => {
      try {
        // Get real-time data
        const stats = await this.getRealtimeStats();

        // Send the data to this specific client
        client.write(
          `data: ${JSON.stringify({
            type: "stats_update",
            data: stats,
          })}\n\n`
        );
      } catch (error) {
        console.error("Error streaming data:", error);
      }
    }, 2000); // Update every 2 seconds

    // Store the interval ID
    this.streamIntervals.set(client, intervalId);
  }

  async getRealtimeStats() {
    // Calculate uptime in seconds
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);

    // Get connected clients count
    const connectedClients = this.clients.size;

    return {
      uptime,
      connectedClients,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new EventsService();
