import { Request, Response } from "express";
import { prisma } from "../../index";

export const getAllPetController = async (req: Request, res: Response) => {
    const allPets = await prisma.pet.findMany({
        where: {
            isSold: false
        }
    })

    if (allPets) {
        res.send({ "status": 1, "length": allPets.length, "data": allPets })
    } else {
        res.send({ "status": 0, "message": "Add Pets to see here" })
    }
}