const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

// const ca = fs.readFileSync(path.join(__dirname, "..", "global-bundle.pem"));

// const options = {
//   ssl: true,
//   sslValidate: false,
//   sslCA: path.join(__dirname, "..", "global-bundle.pem"),
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB Connected...");
    logger.info("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
    logger.error("Error connecting MongoDB");
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
