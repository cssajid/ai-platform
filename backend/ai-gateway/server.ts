import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoute";
import leaveRoute from "./routes/leaveRoute";
import employeeRoute from "./routes/employeeRoute";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/employee", employeeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AI Gateway running on port ${PORT}`);
});
