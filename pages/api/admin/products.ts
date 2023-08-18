import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dz3doiblo', 
  api_key: '133518816781879', 
  api_secret: '2PvBc7dYAWnvmIpBFQZ-QNsRQwg' 
});


type Data = 
| {message: string}
| IProduct[]
| IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method){
        case 'GET':
            return getProducts(req, res)

        case 'PUT':
            return updateProduct(req, res)    

        case 'POST':
            return createProduct(req, res)
        default:
            return res.status(400).json({ message: 'Bad Request' })

    }


}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const products = await Product.find().sort({title: 'asc'}).lean()

    await db.disconnect();

    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
           return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`
       })

       return product;
        
    })

    return res.status(200).json(updatedProducts)

}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {_id = '', images = []} = req.body as IProduct;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({message: 'El Id del producto no es válido'})
    }
    
    if (images.length < 2) {
        
        return res.status(400).json({message: 'Es necesario al menos 2 imagenes'})
    }


    try {
        
        await db.connect();
        const product = await Product.findById(_id)
        if (!product) {
            await db.disconnect();
            return res.status(400).json({message: 'No existe un producto con ese ID'})
        }


        product.images.forEach(async (image) => {
            if (!images.includes(image)) {
                const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
                console.log({fileId, extension})
                await cloudinary.uploader.destroy(fileId)
            }
        })


        await product.updateOne(req.body)
        await db.disconnect();

        return res.status(200).json(product)

    } catch (error) {

    }
    

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {images = []} = req.body as IProduct;

    if (images.length < 2) {
        return res.status(400).json({message: 'El producto necesita al menos 2 imagenes'})
    }
    
    try {
        await db.connect();
        const productInDB = await Product.findOne({slug: req.body.slug})
        if (productInDB) {
            await db.disconnect();
            return res.status(400).json({message: 'Ya existe un producto con ese slug'})
        }
        const product = new Product(req.body)
        await product.save();
        await db.disconnect();

       return res.status(201).json(product)

    } catch (error) {
        await db.disconnect();
        return res.status(400).json({message: 'Revisar logs del servidor'})
    }
    
}

