import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import conn from '../database/connection';

interface IUser {
    name: string;
    email: string;
    password: string;
}

class SessionsController {
    async show(req: Request, res: Response) {
        const { email, password } = req.body;

        try {

            const trx = await conn.transaction();

            const user = await trx<IUser>('users').select('*')
                .where('email', email);

            await trx.commit();

            if (user.length > 0) {

                const isPassword = await bcrypt.compare(password, user[0].password);

                if (!isPassword) {
                    return res.status(404).json({ message: 'Email or password incorrect' });
                }

                return res.status(200).json(user);
            }

            return res.status(404).json({ message: 'Email or password incorrect' });

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(404).json({ message: 'User not encountered' });
        }
    }

    async findByEmail(req: Request, res: Response) {
        const { email } = req.body;

        const trx = await conn.transaction();

        try {

            const user = await trx('users').select('*')
                .where('email', email);

            await trx.commit();

            if (user.length > 0) {
                return res.status(200).json({ id: user[0].id });
            }

            return res.status(404).json({ message: 'Invalid email' });

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(404).json({ message: 'Invalid email' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { password } = req.body

        const trx = await conn.transaction();

        try {

            const encryptedPassword = await bcrypt.hash(password, 5);

            const user = await trx('users').update({
                password: encryptedPassword,
            }).where('id', id);

            await trx.commit();

            if (user != 0) {
                return res.status(200).json(user);
            }

            return res.status(404).json({ message: 'User not encountered' });

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({ message: 'Unexpected error while updated password' });
        }
    }
}

export default SessionsController;