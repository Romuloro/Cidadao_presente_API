import 'express-async-errors';
import express, { Request, Response } from 'express';
import { routes } from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import endpoint from "./config/endpoints.config"
import cookieParser from "cookie-parser";

dotenv.config();

const allowedOrigins = ["http://localhost:4000"]

const options: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins
}

export const app = express();

app.use(express.json());
app.use(cors(options))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(endpoint.Port, () => {
    console.log(`Server is running in http://localhost:${endpoint.Port}`);
  }
  );
}
