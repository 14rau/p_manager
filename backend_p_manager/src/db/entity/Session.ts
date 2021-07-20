import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from "typeorm";
import { User } from "./User";

@Entity({ name: "session" })
export class Session {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 36 })
    session: string;

    
    @Column("int")
    user_id: number;

    @OneToOne(type => User)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User;
  
}
