import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";

@Entity({ name: "security_user" })
export class SecurityUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    id_user: number;

    @Column("varchar", { length: 45 })
    password: string;

    @OneToOne(type => User)
    @JoinColumn({ name: "id_user", referencedColumnName: "id" })
    user: User;

}
