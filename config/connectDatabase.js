const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connection) {
      console.log(`Connected To The ${connection.connection.host}`.green);
    }
  } catch (error) {
    console.log("In Config", error);
  }
};

module.exports = connectDatabase;
