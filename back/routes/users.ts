import {Route} from "./route";
import {Controller} from "../controllers/controller";

export class Users implements Route {
    static readonly ROOT = '/users';

    controller: Controller;

    constructor(UserController: Controller) {
        this.controller = UserController;
    }

    initRoutes(app: any) {
        const UserController = this.controller;

        app.get(Users.ROOT, function (request, response) {
            return UserController.read(request, response);
        });

        app.post(Users.ROOT, function (request, response) {
            return UserController.create(request, response);
        });

        app.post(Users.ROOT + '/:userId', function (request, response) {
            return UserController.update(request, response);
        });
    }
}
