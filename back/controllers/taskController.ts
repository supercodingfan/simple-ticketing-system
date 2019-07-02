import {Controller} from "./controller";
import {TaskModel} from "./../models/taskModel";
import {UserModel} from "../models/userModel";

export class TaskController implements Controller {
    read(request, response) {
        TaskModel.findAll({where: {status: request.query.status}, attributes: ['id', 'summary', 'description', 'priority', 'status'], include: [UserModel]})
            .then((tickets) => response.status(200).header('Content-Type', 'application/json').json({tickets}))
            .catch(err => response.status(500).json({err: ['oops', err]}));
    }

    create(request, response) {
        TaskModel.create<TaskModel>(request.query)
            .then((task) => response.status(200).json({task}))
            .catch(err => response.status(500).json({err: ['oops', err]}));
    }

    update(request, response) {
        let updatedInfo = request.query;
        updatedInfo.id = request.params.taskId;

        TaskModel.upsert<TaskModel>(updatedInfo, {returning: true})
            .then((isInserted) => response.status(200).json({isInserted}))
            .catch(err => response.status(500).json({err: ['oops', err]}));
    }
}
