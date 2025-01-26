const express = require("express");
const cors = require("cors");
const { searchQuestions } = require("./controllers/questionController");
const { startGrpcServer } = require("./grpc/index.js");
const { connectToDatabase } = require("./db/connect.js");
const dotenv = require("dotenv");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();
app.get("/search", searchQuestions);

app.listen(port, async () => {
  console.log(`Express server is running on http://localhost:${port}`);
  startGrpcServer();
});

connectToDatabase();
