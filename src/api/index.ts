import express from "express";
import Router from "express-promise-router";
import { ZodError } from "zod";
import db from "../db";
import { SubscribeRequest, SubscribeRequestSchema } from "./requests";

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
        if (error instanceof ZodError) {
            context.error = 'Некорректный адрес электронной почты. Попробуйте ещё раз.';
        } else if (error instanceof Error) {
            context.error = error.message;
            if ('errno' in error) {
                if (error.errno === 1062) {
                    context.error = 'Вы уже подписаны!';
                }
            }
        } else {
            context.error = 'Что-то пошло не так! Напишите нам: <a href="mailto:admin@carqr.link?subject=Ошибка на сайте">admin@carqr.link</a>';
            req.log.error(error);
        }
    }

    return res.render("partials/subscription-form", { context });
});

export default router;
