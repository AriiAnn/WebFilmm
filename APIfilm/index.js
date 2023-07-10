import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import FilmRoute from "./routes/FilmRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(FilmRoute);

app.listen(3000, () => console.log("Server Up and Running..."));
