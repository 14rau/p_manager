import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { SecurityUser } from "../entity/SecurityUser";
import { Session } from "../entity/Session";
import { Passwords } from "../entity/Passwords";

export class UserController {

    private userRepository = getRepository(User);
    private sessionRepository = getRepository(Session);
    private secUser = getRepository(SecurityUser);

    public async register(request: Request<{},{}, { username: string, password: string }>, response: Response, next: NextFunction) {
        if(request.body?.username?.length === 0 || request.body?.username?.length < 4) return response.status(400).send({ message: "no" });
        if (await this.userRepository.findOne(request.body.username)) {
            response.status(400).send({ message: "Username given" });
            return;
        }


        let user = new User();
        user.username = request.body.username;
        user = await this.userRepository.save(user, { reload: true });

        const secUser = new SecurityUser();
        secUser.password = request.body.password;
        secUser.id_user = user.id;
        await this.secUser.save(secUser);

        return user;
    }

    public async login(request: Request<{}, {}, { username: string, password: string }>, response: Response, next: NextFunction) {
        const user = await this.userRepository.createQueryBuilder("base")
            .andWhere("base.username = :username", { username: request.body.username })
            .leftJoinAndMapOne("base.securityUser", SecurityUser, "su", "su.id_user = base.id")
            .getOne();
        if (user.securityUser?.password === request.body.password) {
            let session = await this.sessionRepository.findOne({
                where: {
                    user_id: user.id
                }
            });
            if (session) {
                await this.sessionRepository.remove(session);
            }

            session = new Session();
            session.user_id = user.id;
            session = await this.sessionRepository.save(session, { reload: true });
            session = await this.sessionRepository.findOne({
                where: {
                    user_id: user.id
                }
            });
            return session;
        }
        response.status(403).send();
    }
}