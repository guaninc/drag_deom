import { getIp } from "./utils/getIp.js";
import c from "child_process";
import express from "express";

const app = express();
const ip = getIp();

app.use(express.static("./dist"));

app.listen(8080, "0.0.0.0", () => {
  console.log(`Server is running at http://${ip}:8080`);
  c.exec(`start http://${ip}:8080`);
});
