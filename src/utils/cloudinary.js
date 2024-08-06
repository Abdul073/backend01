import { v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from 'fs'


cloudinary.config({ 
    cloud_name: process.env.CLODUDINARY_CLOUD_NAME, 
    api_key: process.env.CLODUDINARY_API_KEY, 
    api_secret: process.env.CLODUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=> {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uplaoded successfully
        // console.log("File is uploaded", responce.url);
        fs.unlinkSync(localFilePath)
        return responce;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved file as the upload got failed
        return null;
    }
}


export {uploadOnCloudinary}