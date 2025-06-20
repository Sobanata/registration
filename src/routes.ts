import { AuthController } from "./controller/AuthController"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "get",
    route: "/auth",
    controller: UserController,
    action: "auth"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/auth",
    controller: AuthController,
    action: "register"
}, {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login"
}, ]