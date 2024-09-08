import express from "express";

import api from "./api";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/api", api);


app.use((req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
