import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import asyncHandler from "../handlers/asyncHandler.js"
import { uploadFile } from "../controllers/uploadController.js";



const router = express.Router();


// 로컬
// const uploadDir = path.join(process.cwd(), "images");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


const upload = multer({ storage: multer.memoryStorage() });


// 로컬용 diskStorage 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     // const ext = path.extname(file.originalname);
//     // const base = path.basename(file.originalname, ext);
//     // cb(null, `${base}-${Date.now()}${ext}`);
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

router.post("/upload", upload.single("image"), asyncHandler(uploadFile));


export default router;