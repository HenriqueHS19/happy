import { Request, Response } from 'express';
import * as Yup from 'yup';

import conn from '../database/connection';

interface IOrphanage {
    id: number;
    name: string;
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

    async index(req: Request, res: Response) {
        const orphanages = await conn('orphanages').select('*');

        const images: IImages[] = await conn('images').select('*');

        let orphanagesList: IOrphanage[] = [];

        orphanages.map(function (orphanage: IOrphanage) {

            // separating the images according to the id
            let imgs: IImages[] = [];
            images.map(function (image) {
                if (image.orphanage_id = orphanage.id) {
                    image.path = uploadPath + image.path;
                    imgs.push(image);
                }
            });

            orphanagesList.push({
                id: orphanage.id,
                name: orphanage.name,
                about: orphanage.about,
                instructions: orphanage.instructions,
                opening_hours: orphanage.opening_hours,
                open_on_weekends: orphanage.open_on_weekends,
                images: imgs,
            });
        });

        return res.status(200).json(orphanagesList);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanage = await conn('orphanages').select('*')
            .where({ id });

        const images: IImages[] = await conn('images').select('*')
            .where({ orphanage_id: id });

        // alter path image
        images.map(function (image: IImages, index) {
            images[index].path = uploadPath + image.path;
        });

        const orph: IOrphanage = {
            id: orphanage[0].id,
            name: orphanage[0].name,
            about: orphanage[0].about,
            instructions: orphanage[0].instructions,
            opening_hours: orphanage[0].opening_hours,
            open_on_weekends: orphanage[0].open_on_weekends,
            images,
        }

        return res.status(200).json(orph);
    }

    async create(req: Request, res: Response) {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;

        const requestImages = req.files as Express.Multer.File[];

        const trx = await conn.transaction();

        try {

            const data = {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_weekends,
            }

            // const schema = Yup.object().shape({
            //     name: Yup.string().required(),
            //     latitude: Yup.number().required(),
            //     longitude: Yup.number().required(),
            //     about: Yup.string().required(),
            //     instructions: Yup.string().required(),
            //     opening_hours: Yup.string().required(),
            //     open_on_weekends: Yup.boolean().required(),
            // });

            // await schema.validate(data, { abortEarly: true });

            const orphanage = await trx('orphanages').insert(data);

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
}

export default OrphanagesController;
