import { Request, Response } from "express";
import { prisma } from "../../index";

export const getAllSoldPetController = async (req: Request, res: Response) => {
    const allSoldPets = await prisma.pet.findMany({
        where: {
            isSold: true
        }
    })
    if (allSoldPets) {
        res.send({ "status": 1, "data": allSoldPets })
    }
    else {
        res.send({ "status": 0, "message": "Adopt some pets to see here" })
    }
}