// logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;
const path = require("path");

// Define a custom log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logDir = "/var/log";
const logFile = path.join(logDir, "messages");

// Create the logger instance
const logger = createLogger({
  level: "info", // Default level for production
  format: combine(
    timestamp(),
    errors({ stack: true }), // Captures stack trace on error
    customFormat
  ),
  transports: [
    new transports.Console(), // Output to console
    new transports.File({ filename: logFile }), // Log to a file
  ],
});

module.exports = logger;
