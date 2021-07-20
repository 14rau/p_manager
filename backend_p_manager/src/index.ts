import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import { Session } from "./db/entity/Session";
import { User } from "./db/entity/User";
import { SecurityUser } from "./db/entity/SecurityUser";
import { Passwords } from "./db/entity/Passwords";
var cors = require('cors');
const dbConf = require("../ormconfig.json");


createConnection({...dbConf,
    entities: [
        User,
        Session,
        SecurityUser,
        Session,
        Passwords
    ]
}).then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    const protectedRoutes = [ "/passwords", "/passwords/" ];



    app.use((req, res, next) => {
        console.log(`${req.method}:${req.path}`);
        next();
    });

    app.use(cors({
        allowedHeaders: [ "session", "content-security-policy", "content-type" ]
    }));

    async function checkUser(req, res, next) {
        console.log(req.path);
        if(!protectedRoutes.includes(req.path)) return next();
        const sessionKey = req.get("session");
        const session = await connection.getRepository(Session).findOne({
            where: {
                session: sessionKey,
            }
        });
        console.log("session check");
        if(!session) return res.status(403).send();
        res.locals.session = session;
        next();
    }

    app.all("*", checkUser)

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3001);


    console.log("Express server has started on port 3001. to see results");

}).catch(error => console.log(error));
