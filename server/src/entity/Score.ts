import {Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Player } from "./Player";
import { Game } from "./Game";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(type => Player, player => player.Scores)
    Player: Player;

    @ManyToOne(type => Game, game => game.Scores)
    Game: Game;
}
