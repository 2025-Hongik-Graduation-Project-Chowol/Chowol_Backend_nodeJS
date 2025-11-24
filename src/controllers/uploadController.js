import { v4 as uuidv4} from "uuid";
import { uploadImageToS3 } from "../services/uploadService.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";

const USE_S3 = true;

const randomString = (length = 4) =>
  Math.random().toString(36).substring(2, 2 + length);

export const uploadFile = async (req, res) => {
  const file = req.file;              

  if (!file) {
    return res.status(400).json({ message: "이미지 파일이 존재하지 않습니다." });
  }

  const timestamp = Date.now();
  const random = randomString();
  const extension = path.extname(file.originalname);
  const finalFilename = `${timestamp}_original_${random}${extension}`;

  const result = USE_S3
    ? await uploadImageToS3(file, finalFilename)
    : await uploadImageLocal(file, finalFilename);

 
  res.status(200).json({
    status: 200,
    message: "이미지 업로드 성공",
    imageUrl: result.imageUrl,
    filename: finalFilename,
  });
};

