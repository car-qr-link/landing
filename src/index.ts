import express from "express";

import api from "./api";
import config from "./config";

const app = express();
const port = config.port;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.get('/', (req, res) => {
    res.render('index', {});
});

app.use("/api", api);

app.use((req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
