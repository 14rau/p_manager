import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ name: "passwords" })
export class Passwords {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    user_id: number;

    @Column("varchar", { length: 45 })
    password: string;

    @Column("varchar", { length: 45 })
    application: string;

    @Column("varchar", { length: 45 })
    login_name: string;



}
