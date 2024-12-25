import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../index";

export const AddPetToCartController = async (req: Request, res: Response) => {
    const { userId, petId, quantity } = req.body;
    console.log("Bhai")
    const cartSchema = z.object({
        userId: z.number().min(1, "Enter a valid user ID"),
        petId: z.string().min(1, "Enter a valid pet ID"),
        quantity: z.number()
    })

    const schemaStatus = cartSchema.safeParse({
        userId: userId,
        petId: petId,
        quantity: quantity
    })
    if (!schemaStatus.success) {
        res.send({ "status": 0, "message": "Validation Failed : " + schemaStatus.error.message })
        return;
    }
    const isPet = await prisma.pet.findFirst({
        where: {
            id: petId,
            isSold: false
        }
    })
    if (!isPet) {
        res.send({ "status": 0, "message": "pet is Already sold" })
        return;
    }
    const newCart = await prisma.cart.create({
        data: {
            userId: userId,
            petIds: petId,
            quantity: quantity,
            cartStatus: "ordered"
        }
    })
    // update pet details to sold
    await prisma.pet.update({
        where: {
            id: petId
        },
        data: {
            isSold: true
        }
    })
    if (newCart) {
        res.send({ "status": 1, "message": "Added to cart successfully" })
    } else {
        res.send({ "status": 0, "message": "Something went wrong" })
    }
}