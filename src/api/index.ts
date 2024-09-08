import express from "express";
import Router from "express-promise-router";

const router = Router();

router.use(express.urlencoded({ extended: true }));
router.post("/subscribe", async (req, res) => {
    try {
        res.send(`<div class="success-message" style="margin-top: 20px; color: green;">
Спасибо за подписку! Вы будете первыми узнавать о запуске проекта.
</div>`);
    } catch (error) {
        console.error(error);

        res.send(`<div class="error-message" style="margin-top: 20px; color: red;">Введите корректный email.</div>`);
    }
});


export default router;