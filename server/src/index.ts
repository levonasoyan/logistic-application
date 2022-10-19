import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from 'helmet';
import compression from 'compression';
import { createClient } from "./config/db";
import dotenv from "dotenv";


dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(helmet());
// app.use(compression());


app.use("/:database", function (req: any, res: any, next: any) {
  const database = req.params.database;
  req.headers.database = req.params.database;
  createClient(database);
  next();
});

// routes
app.use("/:database/loads", require("./routes/loads"));
app.use("/:database/orders", require('./routes/orders'));
app.use("/:database/other", require('./routes/other'));


const PORT = parseInt(process.env.PORT as string) || 5000;
app.listen(PORT, 'localhost', () => {
  console.log(`Server is listening to port ${PORT}`);
});

