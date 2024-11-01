import mongoose from "mongoose";

const dbConnect = async () => {
  let connection = false;
  try {
    if (connection) {
      console.log("Connection already established");
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      connection = true;
      console.log("Connection Succesfull");
    }
  } catch (e) {
    console.log(e);
  }
};

export default dbConnect;
