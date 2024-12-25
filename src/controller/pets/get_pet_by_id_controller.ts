import { Request, Response } from "express";
import { prisma } from "../../index";

export const getPetById = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    const pet = await prisma.pet.findFirst({
        where: {
            id: petId
        }
    })
    if (pet) {
        res.send({ "status": 1, "data": pet })
    }
    else {
        res.send({ "status": 0, "message": "pet not found" })
    }
}