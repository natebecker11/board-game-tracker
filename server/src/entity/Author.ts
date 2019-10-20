import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { Game } from "./Game";

@Entity()
export class Author {
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

    @ManyToMany(type => Game, game => game.Authors)
    Games: Game[]
}
