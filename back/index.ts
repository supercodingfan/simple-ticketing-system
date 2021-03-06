import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {IndexRoutes} from './routes/indexRoutes';
import {sequelize} from "./models";
import {TaskModel} from "./models/taskModel";
import {UserModel} from "./models/userModel";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const {
    PORT = 3000,
} = process.env;

sequelize.addModels([TaskModel, UserModel]);

const routes = new IndexRoutes(app);

routes.init();

app.listen(PORT, () => {
    console.log('server started at http://localhost:'+PORT);
});