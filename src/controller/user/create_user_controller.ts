import { Request, Response } from "express";
import { prisma } from "../../index";
import { z } from "zod";

export const CreateUserController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(4, "Password must be at least 4 characters"),
    })
    const parseResult = userSchema.safeParse({
        name: name,
        email: email,
        password: password
    })
    if (!parseResult.success) {
        res.send({ "status": 0, "message": "Validation Failed :" + parseResult.error })
        return;
    }
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        },
    });
    if (user) {

        res.send({ "status": 1, "data": user })
    } else {
        res.send({ "status": 0, "message": "somthing went wrong" })
    }
};
