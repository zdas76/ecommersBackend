"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploaders = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), '/src/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
cloudinary_1.v2.config({
    cloud_name: 'dzyox93jr',
    api_key: '337547918624277',
    api_secret: '8JoMEcqf6qG7vw0bOEm3mdc0Imc' // Click 'View API Keys' above to copy your API secret
});
const uploadTOCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, rejects) => {
        cloudinary_1.v2.uploader.upload(file.path, 
        // { folder: "my_folder" },
        (error, result) => {
            fs_1.default.unlinkSync(file.path);
            if (error) {
                rejects(error);
            }
            else {
                resolve(result);
            }
        });
    });
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
});
exports.fileUploaders = {
    upload,
    uploadTOCloudinary
};
