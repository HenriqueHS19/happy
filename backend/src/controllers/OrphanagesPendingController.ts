import { Request, Response } from 'express';

import conn from '../database/connection';

class OrphanagesPendingController {
    async update(req: Request, res: Response) {
        const { id } = req.params;

        const trx = await conn.transaction();

        try {

            const orphanage = await trx('orphanages').update({
                pending: false,
            }).where({ id });

            await trx.commit();

            return res.status(200).send();

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({ message: 'Unexpected error while updating orphanage' });
        }
    }
}

export default OrphanagesPendingController;