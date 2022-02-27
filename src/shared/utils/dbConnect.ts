import mongoose, { Model } from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

export const connect = async () => {
  let conn;
  try {
    conn = await mongoose.connect(DATABASE_URL);
    console.log("Mongoose Connection Established");
  } catch (error) {
    console.error(error);
  }

  return { conn };
};
