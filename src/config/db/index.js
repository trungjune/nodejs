const mongoose = require("mongoose");

function connect() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/trungth_dev");

    console.log("Connect DB Successfully !");
  } catch (error) {
    console.log("Connect DB Failure !");
  }
}

module.exports = { connect };
