import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { Game } from "./Game";
import { Player } from "./Player";

@Entity()
export class Play {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        type: "date"
    })
    DatePlayed: string;

    @ManyToOne(type => Game, game => game.Plays)
    Game: Game;

    @ManyToMany(type => Player, player => player.Plays)
    Players: Player[]
}
