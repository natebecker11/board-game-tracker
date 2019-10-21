import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Play } from "./Play";
import { Score } from "./Score";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        type: "nvarchar",
        length: 50
    })
    FirstName: string;

    @Column({
        type: "nvarchar",
        length: 50
    })
    LastName: string;

    @ManyToMany(type => Play, play => play.Players)
    @JoinTable()
    Plays: Play[];

    @OneToMany(type => Score, score => score.Player)
    Scores: Score[];
}
