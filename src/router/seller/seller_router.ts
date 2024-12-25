import express from "express"
import { CreateSellerController } from './../../controller/seller/create_seller_controller';

const sellerRouter = express.Router()

sellerRouter.post("/create_seller", CreateSellerController)

export default sellerRouter