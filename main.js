import mongoose from "mongoose";
import app from "./app.js";

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/estoretekup";
// "mongodb+srv://baha:baha@cluster0.vqdvc.mongodb.net/?retryWrites=true&w=majority"
console.log("🚀 ~ file: main.js:5 ~ DB_URI:", DB_URI);

mongoose.connect(DB_URI).then(() => console.log("Connected!"));

/**
 * Throw error when not able to connect to database
 */
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${DB_URI}`);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
