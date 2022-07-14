import bp from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { errorHandler } from "./handlers/error-handler";
import api from "./router/api";
const cp = require("cookie-parser");
require("dotenv").config();

const app = express();

const origin = process.env.REACT_APP_CLIENT_URL || process.env.REACT_APP_SERVER_URL

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(cors({
    origin,
    credentials: true
}));
app.use(cp());

app.use(express.static(path.join(__dirname, '../build')));

app.use("/api", api);
app.get('/*', (q, a) => {
    a.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("server running on ", PORT);
})


