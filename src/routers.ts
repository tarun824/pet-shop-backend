import express from "express"
import petRouter from "./router/pet/pet_router";
import sellerRouter from "./router/seller/seller_router";
import userRouter from "./router/user/user_router";

const mainRouter = express.Router();

mainRouter.use("/v0", petRouter)
mainRouter.use("/v0", sellerRouter)
mainRouter.use("/v0", userRouter)


export default mainRouter
