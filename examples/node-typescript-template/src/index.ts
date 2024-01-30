
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at\n  - http://localhost:${port}\n  - http://127.0.0.1:${port}`);
});
