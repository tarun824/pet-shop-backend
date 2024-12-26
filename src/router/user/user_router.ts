import express from "express"
import { CreateUserController } from "../../controller/user/create_user_controller"
import { AddPetToCartController } from "../../controller/user/add_pet_to_cart_controller"
import { UpdateCartStatusToDeliveredController } from "../../controller/user/update_cart_status_to_delivered_controller"

const userRouter = express.Router()

userRouter.post("/create_user", CreateUserController)
userRouter.post("/add_pet_to_cart", AddPetToCartController)
userRouter.put("/update_cart_status_to_delivered/:cartId", UpdateCartStatusToDeliveredController)


export default userRouter;