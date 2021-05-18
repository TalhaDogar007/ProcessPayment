const express = require("express");
require("dotenv").config();
const color = require("colors");
const errorHandler = require("./middleware/errorhandler.js");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT} `
      .yellow.bold
  )
);
process.on("unhandledRejection", (err, promisee) => {
  server.close(() => process.exit(1));
});
