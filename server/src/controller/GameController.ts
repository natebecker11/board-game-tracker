import { getConnection } from "typeorm";
import { GenericResponse } from "../models/util/GenericResponse";
import { Player } from "../entity/Player";
import { ExceptionResponse } from "../models/util/ExceptionResponse";
import { Request, Response } from "express";
import { Game } from "../entity/Game";
import { GenericRequest } from "../models/util/GenericRequest";

const express = require('express');
const router = express.Router();

// route prefix: /Game

const gameRepo = getConnection().getRepository("Game");

//get all games
router.get("/", (req: Request, res: Response) => {
    gameRepo.find()
        .then(games => {
            if (games && games.length) {
                res.send(<GenericResponse<Game[]>>{
                    Exception: null,
                    Item: games
                })
            }
            else {
                res.send(<ExceptionResponse>{
                    Exception: "No games found."
                })
            }
        })
        .catch(err => {
            res.send(<ExceptionResponse>{
                Exception: err.message
            })
        })
})

//get game by Id
router.get("/byId/:gameId", (req, res) => {
    var gameId = req.params.gameId;
    gameRepo.findOneOrFail(gameId)
        .then(game => {
            if (game) {
                res.send(<GenericResponse<Game>>{
                    Exception: null,
                    Item: <Game>game
                })
            }
            else {
                res.send(<ExceptionResponse>{
                    Exception: "No Game Found With Id " + gameId
                })
            }
        })
        .catch(err => {
            res.send(<ExceptionResponse>{
                Exception: err.message
            })
        })
});

//add new game
router.post("/", async (req: Request, res: Response) => {
    const game: Game = <Game>req.body.Item;
    if (game) {
        if (!game.Name) {
            res.send(<ExceptionResponse> {
                Exception: "Must provide game name."
            })
        }
        else {
            try {
                const newGame = await gameRepo.create(game);
                const results = await gameRepo.save(newGame);
                res.send(results);
            }
            catch (err) {
                res.send(<ExceptionResponse> {
                    Exception: err.message
                })
            }
        }
    }
    else {
        res.send(<ExceptionResponse> {
            Exception: "Invalid request body."
        })
    }
})

//typeahead
router.get("/listByName/:nameString", async (req: Request, res: Response) => {
    const nameString = req.params["nameString"];
    const gameList = await gameRepo.createQueryBuilder("game")
        .where(":fullName like :nameString", {
            fullName: "%" +
        })

})

module.exports = router;