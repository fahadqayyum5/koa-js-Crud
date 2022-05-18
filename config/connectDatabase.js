const mongoose = require("mongoose");

const connectDatabase = async () => {
  const connection = await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (connection) {
    console.log(`Connected To The ${connection.connection.host}`.green);
  }
};

module.exports = connectDatabase;
