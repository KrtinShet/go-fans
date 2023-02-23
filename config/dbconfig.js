const mongoose = require("mongoose");
module.exports = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {});
    console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.bold);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};
