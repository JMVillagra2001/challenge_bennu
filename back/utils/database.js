const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
    connectToDatabase
}
