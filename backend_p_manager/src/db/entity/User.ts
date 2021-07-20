import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { SecurityUser } from "./SecurityUser";

@Entity({ name: "user" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 45 })
    username: string;

    securityUser: SecurityUser;

}
