import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

// @desc: Create new exercise
// @access: Private
// @route POST /api/exercises

export const createNewExercise = asyncHandler(async (req, res) => {
    const {name, times, iconPath} = req.body;

    const exercise = await prisma.exercise.create({
        data: {
            name,
            times,
            iconPath
        },
    });

    res.json(exercise)
});


// @desc: Update exercise
// @access: Private
// @route PUT /api/exercises/:id

export const updateExercise = asyncHandler(async (req, res) => {
    const {name, times, iconPath} = req.body;

    try {
        const exercise = await prisma.exercise.update({
            where: {
                id: +req.params.id
            },
            data: {
                name,
                times,
                iconPath
            },
        });

        res.json(exercise)
    } catch (error) {
        res.status(404);
        throw new Error("Exercise not found");
    }
});

// @desc: Delete exercise
// @access: Private
// @route DELETE /api/exercises/:id

export const deleteExercise = asyncHandler(async (req, res) => {
    try {
        const exercise = await prisma.exercise.delete({
            where: {
                id: +req.params.id
            }
        });

        res.json({message: "Exercise removed"})
    } catch (error) {
        res.status(404);
        throw new Error("Exercise not found");
    }
});

// @desc: Get exercises
// @access: Private
// @route GET /api/exercises

export const getExercise = asyncHandler(async (req, res) => {
    const exercises = await prisma.exercise.findMany({
        orderBy: {
            id: {
                createdAt: "desc"
            }
        }
    });
    res.json(exercises)
});
