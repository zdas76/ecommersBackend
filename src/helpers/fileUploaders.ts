import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ICloudinary, IFile } from "../app/interfaces/file";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), '/src/uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


  cloudinary.config({ 
    cloud_name: 'dzyox93jr', 
    api_key: '337547918624277', 
    api_secret: '8JoMEcqf6qG7vw0bOEm3mdc0Imc' // Click 'View API Keys' above to copy your API secret
});

 const uploadTOCloudinary = async(file:IFile):Promise<ICloudinary | undefined> => {

  return new Promise((resolve, rejects)=> {
    cloudinary.uploader.upload(file.path, 
      // {public_id: path.originalname },
      (error:Error, result:ICloudinary) => {
        fs.unlinkSync(file.path)
        if(error){
          rejects(error)
        }else{
          resolve(result)
        }
      }
    )
  }) 


  
  // OR its working
    
  // const uploadResult = await cloudinary.uploader
  //      .upload(
  //       file.path, {
  //              public_id: 'shoes',
  //          },          
  //         ) 
          
  //      .catch((error) => {
  //          console.log(error);
  //      });

  // if(uploadResult){ 
  //   fs.unlinkSync(file.path)
  // }   
  
  //   return uploadResult
 }

  export const fileUploaders = {
    upload,
    uploadTOCloudinary
  }