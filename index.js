import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import codeforcesRoutes from "./routes/codeforces.js";
import leetcodeRoutes from "./routes/leetcode.js";
import codechefRoutes from "./routes/codechef.js";
import authRoutes from "./routes/auth.js";
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

app.use("/codeforces", codeforcesRoutes);
app.use("/leetcode", leetcodeRoutes);
app.use("/codechef", codechefRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
