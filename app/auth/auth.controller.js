import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { generateToken } from "./generateToken.js";
import { hash, verify } from "argon2";
import { faker } from "@faker-js/faker";
import { UserFields } from "../utils/user.utils.js";

// @desc: Login user
// @access: Public
// @route POST /api/auth/login

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    const isValidPassword = await verify(user.password, password);

    if (user && isValidPassword) {
        const token = generateToken(user.id);
        res.json({ user, token });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc: Register user
// @access: Public
// @route POST /api/auth/register

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const isHaveUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (isHaveUser) {
        res.status(400);
        console.log(req.body);
        throw new Error("User already exists");
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: await hash(password), // has password with argon2
            name: faker.name.fullName(), // generation of random name
        },
        select: UserFields,
    });

    const token = generateToken(user.id);

    res.json({ user, token });
});
