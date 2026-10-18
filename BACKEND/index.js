const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connect_db = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// conntect mongodb
connect_db();

//set json format
app.use(express.json());
// app.use()

// routes
app.use("/api/v1/products", productRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
