import express from "express";
import Router from "express-promise-router";
import { SubscribeRequest, SubscribeRequestSchema } from "./requests";
import { ZodError } from "zod";
import db from "../db";

const router = Router();

router.use(express.urlencoded({ extended: true }));
router.post<{}, {}, SubscribeRequest>("/subscribe", async (req, res) => {
    const context: { success: boolean, error: any, email: string } = {
        success: false,
        error: null,
        email: req.body.email,
    };

    try {
        const payload = SubscribeRequestSchema.parse(req.body);

        await db.insertInto("subscriptions").values({ email: payload.email }).execute();

        context.success = true;
    } catch (error: any) {
        context.success = false;
        context.error = error instanceof ZodError
            ? 'Некорректный адрес электронной почты. Попробуйте ещё раз.'
            : 'Что-то пошло не так! Напишите нам: <a href="mailto:admin@carqr.link?subject=Ошибка на сайте">admin@carqr.link</a>';

        console.error(error);
    }

    return res.render("partials/subscription-form", { context });
});

export default router;
