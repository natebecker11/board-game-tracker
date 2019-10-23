import { getConnection } from "typeorm";
import { GenericResponse } from "../models/util/GenericResponse";
import { Player } from "../entity/Player";
import { ExceptionResponse } from "../models/util/ExceptionResponse";
import { Request, Response } from "express";

const express = require('express');
const router = express.Router();

// route prefix: /Player

const playerRepo = getConnection().getRepository("Player");

//get all players
router.get("/", (req, res) => {
    playerRepo.find()
        .then(players => {
            if (players && players.length) {
                res.send(<GenericResponse<Player[]>>{
                    Exception: null,
                    Item: players
                })
            }
            else {
                res.send(<ExceptionResponse>{
                    Exception: "No Players Found."
                })
            }
        })
        .catch(err => {
            res.send(<ExceptionResponse>{
                Exception: err.message
            })
        })
})


//get player by Id
router.get("/:playerId", (req, res) => {
    var playerId = req.params.playerId;
    playerRepo.findOneOrFail(playerId)
        .then(player => {
            if (player) {
                res.send(<GenericResponse<Player>>{
                    Exception: null,
                    Item: <Player>player
                })
            }
            else {
                res.send(<ExceptionResponse>{
                    Exception: "No Player Found With Id " + playerId
                })
            }
        })
        .catch(err => {
            res.send(<ExceptionResponse>{
                Exception: err.message
            })
        })
});

//add new player
router.post("/", async (req: Request, res: Response) => {
    if (req.body) {
        if (!req.body.FirstName || !req.body.LastName) {
            res.send(<ExceptionResponse> {
                Exception: "Must supply first and last name."
            })
        }
        else {
            try {
                const newPlayer = await playerRepo.create(req.body);
                const results = await playerRepo.save(newPlayer);
                res.send(new GenericResponse(results));
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
    const nameString = `%${req.params["nameString"]}%`;
    try {
        const playerList = await playerRepo.createQueryBuilder("player")
            .where("player.FullName LIKE :nameString", {nameString})
            .getMany();
        
        res.send(new GenericResponse(playerList))
    }
    catch (err) {
        res.send(<ExceptionResponse> {
            Exception: err.message
        })
    }
})


module.exports = router;