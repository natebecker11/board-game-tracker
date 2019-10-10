import "reflect-metadata";
import {createConnection, ConnectionOptions, ConnectionOptionsReader} from "typeorm";
import {Player} from "./entity/Player";
import {DevConnectOptions} from "./devConnectOptions";

const ConnectionBase: any = {
    entities: [
        Player
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

    console.log("Inserting a new user into the database...");
    const player = new Player();
    player.FirstName = "Timber";
    player.LastName = "Saw";
    await connection.manager.save(player);
    console.log("Saved a new player with id: " + player.Id);

    console.log("Loading players from the database...");
    const players = await connection.manager.find(Player);
    console.log("Loaded players: ", players);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
