import express from "express";
import cors from "cors";
import morgan from "morgan";
import Config from "./config";
import routers from "./routes";

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", routers);
app.listen(Config.port, () => console.log("App is running on port http://localhost:" + Config.port))

