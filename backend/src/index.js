const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const searchRoutes = require("./routes/search.routes");
const eventsRoutes = require("./routes/events.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/search", searchRoutes);
app.use("/api/events", eventsRoutes);

// MongoDB connection
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
