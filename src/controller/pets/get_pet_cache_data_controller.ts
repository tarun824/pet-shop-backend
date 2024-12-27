import { Request, Response } from "express";
import { prisma, redisClient } from "../../index";

export const getPetCacheDataController = async (req: Request, res: Response) => {
    const petId = req.params.petId;
    try {
        let data = await redisClient.get(petId);
        if (data) {
            data = JSON.parse(data)
            res.send({ "status": 1, "data": data })
        } else {
            const pet = await prisma.pet.findFirst({
                where: {
                    id: petId
                }
            })
            redisClient.SETEX(petId, 10000, JSON.stringify(pet))
            //  redisClient.setEx()
            if (pet) {
                res.send({ "status": 1, "data": pet })
            }
            else {
                res.send({ "status": 0, "message": "pet not found" })
            }
        }
    }
    catch (e) {
        console.log(e)
        res.send({ "status": 0, "message": "got some error" })
    }
    // res.send({ "status": 0, "message": "got some error" })

    // const pet = await prisma.pet.findFirst({
    //     where: {
    //         id: petId
    //     }
    // })
    // if (pet) {
    //     res.send({ "status": 1, "data": pet })
    // }
    // else {
    //     res.send({ "status": 0, "message": "pet not found" })
    // }
}