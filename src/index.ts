import express from "express"
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import rateLimit from "express-rate-limit"
import mainRouter from "./routers";
import bodyParser from "body-parser";
import * as redis from 'redis';
const app = express()
const prisma = new PrismaClient()

const redisClient = redis.createClient(
    {
        url: process.env.REDIS_URL,
    }
);

async function redisConnection() {
    await redisClient.connect();
}
redisConnection()

redisClient.on("error", (e) => {
    console.log("Redis error:" + e)
})

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
    headers: true
})
app.use(bodyParser.json())
app.use(rateLimiter);

app.use("/service/api", mainRouter)


app.listen(process.env.NODEJS_PORT, () => {
    console.log("server is runing in port 3000")
})

export { app, prisma, redisClient }