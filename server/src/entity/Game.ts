import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Play } from "./Play";
import { Author } from "./Author";

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
        length: 50
    })
    ShortName: string;

    @Column("int")
    PlayerMin: number;

    @Column("int")
    PlayerMax: number;

    @OneToMany(type => Play, play => play.Game)
    Plays: Play[];

    @ManyToMany(type => Author, author => author.Games)
    @JoinTable()
    Authors: Author[]
}
