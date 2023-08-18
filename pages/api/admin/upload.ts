import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable'

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dz3doiblo', 
  api_key: '133518816781879', 
  api_secret: '2PvBc7dYAWnvmIpBFQZ-QNsRQwg' 
});

type Data = {
    message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return uploadFile(req, res)

        default:
            res.status(400).json({message: 'Bad Request'})
    }

}

const saveFile = async(file: any): Promise<string> => {

    const filePath = file[0].filepath

    console.log(filePath)

    const {secure_url} = await cloudinary.uploader.upload(filePath)

    return secure_url
}

const parseFiles = async(req: NextApiRequest): Promise<string> => {

    return new Promise((resolve, reject) => {
        const form = formidable();
        form.parse(req, async(err, fields, files) => {
            if (err){
                return reject(err)
            }

            
           const filePath = await saveFile(files.file as formidable.File)
            resolve(filePath)

        })
    })

}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imageUrL = await parseFiles(req)
    
    return res.status(200).json({message: imageUrL})


}   
