import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { StatusCodes } from "http-status-codes";
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app:Application = express()


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus:200,
  })
);


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Thank you for visiting me')
})

app.use('/api/v1/', router)

app.use(globalErrorHandler)


app.use((req: Request, res:Response, next:NextFunction)=> {
    res.status(StatusCodes.NOT_FOUND).json({
      succcess: false,
      message: "Api Not Found",
      error: {
        path: req.originalUrl,
        message: "Your requesed path is not found"
      }
    })
  })

export default app;