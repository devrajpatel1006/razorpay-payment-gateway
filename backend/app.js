import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import paymentRoutes from "./routes/payment.routes.js";
const PORT =  process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Server is running");
});

app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
