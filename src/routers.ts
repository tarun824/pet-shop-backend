import express, { Request, Response } from "express"
import petRouter from "./router/pet/pet_router";
import sellerRouter from "./router/seller/seller_router";
import userRouter from "./router/user/user_router";
import petRouterV1 from "./router/pet/pet_router_v1";

const mainRouter = express.Router();

mainRouter.get("/v0", (req: Request, res: Response) => {
    res.send("The Server is up and running")
})

mainRouter.use("/v0", petRouter)
mainRouter.use("/v0", sellerRouter)
mainRouter.use("/v0", userRouter)
mainRouter.use("/v1", petRouterV1)


export default mainRouter
