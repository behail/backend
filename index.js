const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const songRoutes = require("./routes/songroutes");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // allow any url to request
  credentials: true,
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
  methods: ["GET", "DELETE", "UPDATE", "PUT"],
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(songRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message, status: status });
});

// mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDb connected: ${connect.connection.host}`);
  } catch (err) {
    console.warn(err);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.warn(err);
  });
