import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Play } from "./Play";
import { Author } from "./Author";
import { Score } from "./Score";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        type: "nvarchar",
        length: 255
    })
    Name: string;

    @Column({
        type: "nvarchar",
        length: 50,
        nullable: true
    })
    ShortName: string;

    @Column("int")
    PlayerMin: number;

    @Column("int")
    PlayerMax: number;

    @Column({
        type: "nvarchar",
        length: 50,
        nullable: true
    })
    BoardGameGeekId: string;

    @OneToMany(type => Play, play => play.Game)
    Plays: Play[];

    @ManyToMany(type => Author, author => author.Games)
    @JoinTable()
    Authors: Author[]

    @OneToMany(type => Score, score => score.Game)
    Scores: Score[];
}
