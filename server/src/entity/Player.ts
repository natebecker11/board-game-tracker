import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Play } from "./Play";

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
    Plays: Play[]
}
