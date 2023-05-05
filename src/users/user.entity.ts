import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public email : string

    @Column()
    public password : string

    @Column()
    public salt : string
}