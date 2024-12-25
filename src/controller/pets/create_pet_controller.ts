import { Request, Response } from "express";
import { prisma } from "../../index";
import { z } from "zod";

export const CreatePetController = async (req: Request, res: Response) => {
    const { id, name, species, bread, age, ownerId, price } = req.body;

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
    const pet = await prisma.pet.create({
        data: {
            id: id,
            name: name,
            species: species,
            bread: bread,
            age: age,
            ownerId: ownerId,
            price: price
        },
    });
    if (pet) {
        res.send({ "status": 1, "data": pet })
    } else {
        res.send({ "status": 0, "message": "somthing went wrong" })
    }
};
