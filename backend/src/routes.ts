import express from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';

const routes = express.Router();

const orphanages = new OrphanagesController();
const users = new UsersController();
const sessions = new SessionsController();

const upload = multer(uploadConfig);

routes.get('/orphanages', orphanages.index);
routes.get('/orphanages/:id', orphanages.show);
routes.post('/orphanages', upload.array('images'), orphanages.create);

routes.post('/users', users.create);

routes.post('/session/login', sessions.show);
routes.post('/session/email', sessions.findByEmail);
routes.put('/session/:id', sessions.update);

export default routes;

