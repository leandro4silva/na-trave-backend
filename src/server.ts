import 'dotenv/config';
import 'express-async-errors';

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import {routes} from "./routes/index";
import { AppError } from './utils/AppError';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use((error: Error, request: Request, response: Response, next: NextFunction) =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })

    }
        console.log(error)

        return response.status(500).json({
            status: "error",
            message: "Internal server error"
        })
}) 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));