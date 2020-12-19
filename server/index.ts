import express from "express";
import cors from "cors";
import morgan from "morgan";
import Config from "./config";
import routers from "./routes";

const app = express()
app.use(morgan('dev'));
app.use(cors())

app.use("/", routers);
app.listen(Config.port, () => console.log("App is running on port http://localhost:" + Config.port))

