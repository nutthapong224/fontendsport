import express from "express";
import playerRoutes from "./routes/player.js";
import playersRoutes from "./routes/players.js";
import coachRoutes from "./routes/coach.js";
import titleRoutes from "./routes/title.js";
import campusRoutes from "./routes/campus.js";
import sportTypesRoutes from "./routes/sportypes.js";
import AuthRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import path from "path";
import cors from "cors";
import compression from "compression";
import cluster from "cluster";
import os from "os";
import fs from "fs";
import winston from "winston"; 
import pool from "./db.js"; 

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/server.log" }),
  ],
});

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads"); // Changed to use process.cwd()
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

if (cluster.isMaster) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, log it
  cluster.on("exit", (worker, code, signal) => {
    logger.error(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    cluster.fork(); // Optionally restart the worker
  });
} else {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: "10mb" }));
  app.use("/static", express.static(path.join(process.cwd(), "public/static"))); // Changed to use process.cwd()

  // Serve static files from the uploads directory
  app.use("/uploads", express.static(uploadDir));

  // API Routes
  app.use("/api/player", playersRoutes); // Single player operations
  app.use("/api/players", playerRoutes); // Multiple players
  app.use("/api/coaches", coachRoutes);
  app.use("/api/titles", titleRoutes);
  app.use("/api/campuses", campusRoutes);
  app.use("/api/sporttypes", sportTypesRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api", AuthRoutes);

  // Check the database connection before starting the server
  pool
    .getConnection()
    .then((connection) => {
      logger.info("Database connection established successfully.");
      connection.release();

      app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      logger.error("Database connection failed: " + err.message);
      process.exit(1);
    });

  // Handle 404 for undefined routes
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
    logger.warn(`404 - Route not found: ${req.url}`);
  });

  // Global error handler
  app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  });
}
