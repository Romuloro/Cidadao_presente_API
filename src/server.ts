import 'express-async-errors';
import express, { Request, Response } from 'express';
import { routes } from './routes';
import { AppError } from './errors/AppError';
import dotenv from 'dotenv';
import endpoint from "./config/endpoints.config"
import cookieParser from "cookie-parser";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use((err: Error, req: Request, resp: Response) => {
  if (err instanceof AppError) {
    return resp.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return resp.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(endpoint.Port, () => {
    console.log(`Server is running in http://localhost:${endpoint.Port}`);
  }
  );
}
