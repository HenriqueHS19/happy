import express from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import OrphanagesPendingController from './controllers/OrphanagesPendingController';

const routes = express.Router();

const orphanages = new OrphanagesController();
const users = new UsersController();
const sessions = new SessionsController();
const pending = new OrphanagesPendingController();

const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), orphanages.create);
routes.get('/orphanages', orphanages.index);
routes.get('/orphanages/:id', orphanages.show);
routes.delete('/orphanages/:id', orphanages.delete);

routes.post('/users', users.create);

routes.post('/session/login', sessions.show);
routes.post('/session/email', sessions.findByEmail);
routes.put('/session/:id', sessions.update);

routes.put('/pending/orphanage/:id', pending.update);

export default routes;

