import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../index";

export const UpdateCartStatusToDeliveredController = async (req: Request, res: Response) => {
    const cartId = req.params.cartId;
    let cartIdNumber;
    try {
        cartIdNumber = Number(cartId)
        const isNumber = z.number()
        const isCartIdNumber = isNumber.safeParse(cartIdNumber)
        if (!isCartIdNumber.success) {
            res.send({ "status": 0, "messaage": "Enter a valid Cart ID" })
            return;
        }
    } catch (e) {
        res.send({ "status": 0, "messaage": "Enter a valid Cart ID" })
        return;
    }
    // const isNumber = z.number();

    // const numberCheck = isNumber.safeParse(cartId);
    // if (!numberCheck.success) {
    //     res.send({ "status": 0, "messaage": "Enter a valid Cart ID" })
    //     return;
    // }
    // check weather cartId is valid

    const isCartPresent = await prisma.cart.findFirst({
        where: {
            id: cartIdNumber
        }

    })
    if (!isCartPresent) {
        res.send({ "status": 0, "messaage": "Cart Not found" })
        return;
    }
    await prisma.cart.update({
        where: {
            id: cartIdNumber
        },
        data: {
            cartStatus: "delivered"
        }
    })
    // send notification to user useing Onesignal and Redis queue

    res.send({ "status": 1, "message": "Cart Updated" })
}