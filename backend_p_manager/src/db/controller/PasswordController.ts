import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Session } from "../entity/Session";
import { Passwords } from "../entity/Passwords";

export class PasswordController {
    private passwords = getRepository(Passwords);

    public async getPasswords(request: Request, response: Response<any, {session: Session}>, next: NextFunction) {
        return this.passwords.find({
            where: {
                user_id: response.locals.session.user_id,
            }
        })
    }

    public async updatePassword(request: Request<{}, {}, { password: string, login_name: string, application: string }>, response: Response<any, {session: Session}>, next: NextFunction) {
        let password = await this.passwords.findOne({
            where: {
                user_id: response.locals.session.user_id,
                application: request.body.application
            }
        });

        if(!password) {
            password = new Passwords();
            password.application = request.body.application;
        }
        password.password = request.body.password;
        password.login_name = request.body.login_name;
        password.user_id = response.locals.session.user_id;

        return this.passwords.save(password);
    }

    public async removePassword(request: Request<{ id: number }, {}, {}>, response: Response<any, {session: Session}>, next: NextFunction) {
        let password = await this.passwords.findOne({
            where: {
                user_id: response.locals.session.user_id,
                id: request.params.id
            }
        });

        return this.passwords.remove(password)
    }
    
}