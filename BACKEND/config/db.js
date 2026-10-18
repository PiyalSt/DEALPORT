const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);

    console.log("mongodb connection successfully completed!");
  } catch (error) {
    console.log("mongodb connection failed!", error.message);
  }
};

module.exports = connect_db;
