import { app } from "./app";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const startServer = () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log("⚙️  Server is running on port: " + process.env.PORT || 8080);
  });
};

try {
  connectDB().then(() => {
    startServer();
  });
} catch (err) {
  console.log("Postgres connect error: ", err);
}
