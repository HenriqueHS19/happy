import { Request, Response } from 'express';
import * as Yup from 'yup';

import conn from '../database/connection';

interface IOrphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: IImages[];
}

interface IImages {
    path: string;
    orphanage_id: number;
}

const uploadPath = 'http://localhost:3333/uploads/';

class OrphanagesController {

    async create(req: Request, res: Response) {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;

        const requestImages = req.files as Express.Multer.File[];

        const trx = await conn.transaction();

        try {

            const orphanage = await trx('orphanages').insert({
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends: open_on_weekends === 'true',
            });

            let images: IImages[] = [];

            requestImages.map(async function (image) {
                images.push({
                    path: image.filename,
                    orphanage_id: orphanage[0],
                });
            });

            await trx('images').insert(images);

            await trx.commit();

            return res.status(201).send();

        } catch (error) {
            await trx.rollback();

            return res.status(400).json({
                error: 'Unexpected error while creating new orphanage',
            });
        }
    }

    async index(req: Request, res: Response) {
        const trx = await conn.transaction();

        try {
            const orphanages = await trx('orphanages').select('*');

            await trx.commit();

            return res.status(200).json(orphanages);
        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({ message: 'Unexpected error'});
        }

    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanage = await conn('orphanages').select('*')
            .where({ id });

        const images: IImages[] = await conn('images').select('*')
            .where({ orphanage_id: id });

        // alter path of images
        images.map(function (image, index) {
            images[index].path = uploadPath + image.path;
        });

        const orph: IOrphanage = {
            id: orphanage[0].id,
            name: orphanage[0].name,
            latitude: orphanage[0].latitude,
            longitude: orphanage[0].longitude,
            about: orphanage[0].about,
            instructions: orphanage[0].instructions,
            opening_hours: orphanage[0].opening_hours,
            open_on_weekends: orphanage[0].open_on_weekends,
            images,
        }

        return res.status(200).json(orph);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const trx = await conn.transaction();

        try {

            await trx('images').delete()
                .where({ orphanage_id: id });

            await trx('orphanages').delete()
                .where({ id });

            await trx.commit();

            return res.status(200).send();

        } catch (error) {
            console.log(error);
            await trx.rollback();
            return res.status(400).json({ message: 'Unexpected error while deleting orphanage' });
        }
    }
}

export default OrphanagesController;
