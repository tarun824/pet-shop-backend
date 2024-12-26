import { Request, Response } from "express";
import { prisma, redisClient } from "../../index";
import { z } from "zod";

export const GetAllPetByPagination = async (req: Request, res: Response) => {
    // /get_all_pet_by_pagination?limit=value1&next=value2

    const limit = req.query.limit;
    const next = req.query.next;

    let limitNumber;
    let nextNumber;

    try {
        limitNumber = Number(limit)
        nextNumber = Number(next)
        const isNumber = z.number()
        const islimitStatus = isNumber.safeParse(limitNumber)
        const isnextStatus = isNumber.safeParse(nextNumber)

        if (!islimitStatus.success || !isnextStatus.success) {
            res.send({ "status": 0, "message": "Invalid inputs" })
            return;
        }
    } catch (e) {
        res.send({ "status": 0, "message": "Invalid inputs" })
        return;
    }

    const pets = await prisma.pet.findMany({
        skip: nextNumber,
        take: limitNumber,
        where: {
            isSold: false
        }
    })

    res.send({ "status": 1, "data": pets })
    let i = 0;
    for (i = 0; i < pets.length; i++) {
        redisClient.SETEX(pets[i].id, 10000, JSON.stringify(pets[i]))
    }

}