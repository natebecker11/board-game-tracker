import "reflect-metadata";
import {createConnection, ConnectionOptions, ConnectionOptionsReader} from "typeorm";
import {Player} from "./entity/Player";
import {DevConnectOptions} from "./devConnectOptions";
import { Play } from "./entity/Play";
import { Game } from "./entity/Game";
import { Author } from "./entity/Author";
import express = require("express");
import bodyParser = require("body-parser");
import { Score } from "./entity/Score";

const ConnectionBase: any = {
    entities: [
        Player,
        Play,
        Game,
        Author,
        Score
    ],
    synchronize: true,
    logging: false
}; 

const Environment = "dev";

const BuildConnection = (environment: string): ConnectionOptions => {
    switch (environment) {
        case "dev":
            return <ConnectionOptions> {
                ...ConnectionBase,
                ...DevConnectOptions
            }
    }
}


createConnection(BuildConnection(Environment)).then(async connection => {

    const PlayerController = require('./controller/PlayerController');
    const GameController = require('./controller/GameController');


    const app = express();
    app.use(bodyParser.json());
    app.use("/Player", PlayerController);
    app.use("/Game", GameController);
    app.listen(3000);
    console.log("Listening on :3000")

    // console.log("Inserting a new user into the database...");
    // const player = new Player();
    // player.FirstName = "Timber";
    // player.LastName = "Saw";
    // await connection.manager.save(player);
    // console.log("Saved a new player with id: " + player.Id);

    // console.log("Loading players from the database...");
    // const players = await connection.manager.find(Player);
    // console.log("Loaded players: ", players);


}).catch(error => console.log(error));
