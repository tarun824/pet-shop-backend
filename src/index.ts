import express from "express"
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import rateLimit from "express-rate-limit"
import mainRouter from "./routers";
import bodyParser from "body-parser";
const app = express()
const prisma = new PrismaClient()

const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
    headers: true
})
app.use(bodyParser.json())
app.use(rateLimiter);

app.use("/service/api", mainRouter)

// async function create_user  (req:Request,res:Response){
//     let ress = await prisma.user.create({data:{
//         email:"hanuman",
//         name:"hanuman ki jai",
//         cart:{
//             create:[]
//         }
//        }
//     }); 
//         res.status(200).send({"status":1,"data":ress});
// }


// async function get_add_users (req:Request,res:Response){
//     const data=await prisma.user.findMany({});
//     if(data){

//         res.send({
//             "status":1,
//             "data":data
//         })
//     }else{}
// }

//  app.get("/create_user",  create_user)

app.listen(3000, () => {
    console.log("server is runing in port 3000")
})

export { app, prisma }