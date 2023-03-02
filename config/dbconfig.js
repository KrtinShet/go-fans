const mongoose = require("mongoose");
module.exports = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL, {

    });
    connection.then((res) => {
      console.log(`MongoDB Connected!!`.cyan.bold);
    })
    // console.log(`MongoDB Connected:`.cyan.bold);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};
