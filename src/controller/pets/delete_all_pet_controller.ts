import { Request, Response } from "express";
import { prisma } from "../../index";

export const deleteAllPetController = async (req: Request, res: Response) => {
    const status = await prisma.pet.deleteMany({});
    res.send({ "status": 1, "message": "Deleted all pets" });
}