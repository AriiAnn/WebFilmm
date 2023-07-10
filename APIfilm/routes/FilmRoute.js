import express from "express";
import { getFilms, getFilmById, createFilm, updateFilm, deleteFilm } from "../controllers/FilmController.js";

const router = express.Router();

router.get("/films", getFilms);
router.get("/films/:id", getFilmById);
router.post("/films", createFilm);
router.patch("/films/:id", updateFilm);
router.delete("/films/:id", deleteFilm);

export default router;
