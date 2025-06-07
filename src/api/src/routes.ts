import { Router } from "express";

export const router: Router = Router();

router.get("/", (_, res) => {
    res.send("Welcome to the GymTracker API!");
});