import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;
}