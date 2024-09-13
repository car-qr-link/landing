import express from "express";
import pino from "pino-http";

import api from "./api";

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", true);

app.use(pino());
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.render('index', {});
});

app.use("/api", api);

app.use((req, res) => {
    res.redirect("/");
});

export default app;
