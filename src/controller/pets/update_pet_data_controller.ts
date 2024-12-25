import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../index";

export const UpdatePetDataController = async (req: Request, res: Response) => {
    const { petId, name, species, bread, age, ownerId, price } = req.body;

    const petSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        species: z.string().min(3, "Species must be at least 3 characters"),
        bread: z.string().min(3, "Bread must be at least 3 characters"),
        age: z.number().min(1, "Age must be greater than 0"),
        ownerId: z.number(),
        price: z.number()
    })
    const parseResult = petSchema.safeParse({
        name: name,
        species: species,
        bread: bread,
        age: age,
        ownerId: ownerId,
        price: price
    })
    if (!parseResult.success) {
        res.send({ "status": 0, "message": "Validation Failed :" + parseResult.error })
        return;
    }
    const pet = await prisma.pet.update({
        where: {
            id: petId
        },
        data: {
            name: name,
            species: species,
            bread: bread,
            age: age,
            ownerId: ownerId,
            price: price
        },
    });
    if (pet) {
        res.send({ "status": 1, "message": "Pet data updated successfully" })
    } else {
        res.send({ "status": 0, "message": "somthing went wrong" })
    }
}