import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import conn from '../database/connection';

interface IUser {
    name: string;
    email: string;
    password: string;
}

class UsersController {
    async create(req: Request, res: Response) {
        const { name, email, password }: IUser = req.body;

        const trx = await conn.transaction();

        try {

            const isUser = await trx<IUser>('users').select('*')
                .where('email', email);

            if (isUser) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const encryptedPassword = await bcrypt.hash(password, 5);

            const user = await trx('users').insert({
                name,
                email,
                password: encryptedPassword,
            });

            await trx.commit();

            return res.status(201).json(user);

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({ message: 'Unexpcted error while creating new user' });
        }
    }

};

export default UsersController;