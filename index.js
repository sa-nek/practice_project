const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});
