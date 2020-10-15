import express from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-error';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

const port = 3333;

app.listen(port, function () {
    console.log('Backend started in port ' + port);
});