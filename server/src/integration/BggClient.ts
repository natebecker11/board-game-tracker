// const axios = require("axios").default;
import axios from "axios";
// const parseString = require("xml2js").parseString;
import { parseString } from "xml2js";

export class BggClient {

    private _baseUrl: string = "https://www.boardgamegeek.com/xmlapi2/";
    
    public GetGameInfo(gameName: string): void {
        const url = this._baseUrl + "search?query=" + gameName + "&type=boardgame";
        console.log("Getting from " + url);
        axios.get(url)
        .then(response => {
            // console.log("resp", response)
            if (response.status == 200) {
                parseString(response.data, (err, result) => {
                    if (!err) {
                        var games = result.items.item;
                        if (games) {
                            games.forEach(game => {
                                const gameId = game["$"].id
                                const nameNodes = game.name
                                const gameNameNode = nameNodes.find(node => {
                                    let info = node["$"]
                                    return info.type == "primary"
                                })
                                console.log(gameId + ": " + gameNameNode["$"].value)
                                // console.log("name", game.name[0]["$"])
                            });
                        }                        
                    }
                    else {
                        console.log("Err parsing", err)
                    }
                })
            }
            else {
                console.error("error retreiving")
            }
        })
        .catch(err => {
            console.error("error retreiving", err)
        })
    }
}
