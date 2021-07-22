import { PasswordController } from "./db/controller/PasswordController";
import {UserController} from "./db/controller/UserController";

export const Routes = [{
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register"
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}, {
    method: "get",
    route: "/passwords",
    controller: PasswordController,
    action: "getPasswords"
}, {
    method: "post",
    route: "/passwords",
    controller: PasswordController,
    action: "updatePassword"
}, {
    method: "delete",
    route: "/passwords/:id",
    controller: PasswordController,
    action: "removePassword"
}];