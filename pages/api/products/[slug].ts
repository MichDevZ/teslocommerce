import { SHOP_CONSTANTS, db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
   | {message: string}
   | IProduct
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductsBySlug(req, res)


        default:
            return res.status(400).json({
                message: 'Bad Request'
            })
    }

}

const getProductsBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {


        
        await db.connect();

        const {slug} = req.query

        const product = await Product.findOne({slug}).lean();
        await db.disconnect();

        if (!product) {
            return res.status(404).json({message: 'Producto No encontrado'})
        }

        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
        })


        return res.status(200).json(product) 

}


