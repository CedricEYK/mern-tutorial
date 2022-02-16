const mongoose = require("mongoose");

const connectMongoDBAtlas = async (listenForPort) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // useUnifinedTopology: true,
      // unseFindAndModify: false,
    });

    console.log(
      `MongoDb Atlas Connected: ${conn.connection.host}`.cyan.underline
    );
    listenForPort();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectMongoDBAtlas;
