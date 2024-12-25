import { Request, Response } from "express";
import { prisma } from "../../index";
import { z } from "zod";

export const CreateSellerController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const sellerSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(4, "Password must be at least 4 characters"),

    })
    const parseResult = sellerSchema.safeParse({
        name: name,
        email: email,
        password: password
    })

    if (!parseResult.success) {
        res.send({ "status": 0, "message": "Validation Failed :" + parseResult.error })
        return;
    }
    const pet = await prisma.seller.create({
        data: {
            name: name,
            email: email,
            password: password
        },
    });
    if (pet) {
        res.send({ "status": 1, "data": pet })
    } else {
        res.send({ "status": 0, "message": "somthing went wrong" })
    }
};
