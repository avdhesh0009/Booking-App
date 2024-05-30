import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'

// it helps in file upload
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // file has been uploaded successfully
        // print response and check
        console.log('File upload successfully',response.url);
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved temporary files as the upload operation got failed
    }
}

export {uploadOnCloudinary}

    