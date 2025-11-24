import fs from "fs";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// 로컬 저장
// const uploadDir = path.join(process.cwd(), "images");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// 로컬 업로드 
// export const uploadImageLocal = async (file, programId) => {
//   if (!file) {
//     const error = new Error("이미지 파일이 존재하지 않습니다.");
//     error.statusCode = 400;
//     throw error;
//   }

//   // const filePath = path.join(uploadDir, file.filename);
//   const filePath = path.join(uploadDir, file.originalname);

//   if (!fs.existsSync(filePath)) {
//     const error = new Error("파일 저장 중 오류가 발생했습니다.");
//     error.statusCode = 500;
//     throw error;
//   }

//   // const imageUrl = `/uploads/${file.filename}`;
//   const imageUrl = `/images/${file.originalname}`;
//   return { imageUrl, filename: file.originalname, programId };
// };

// S3 업로드
export const uploadImageToS3 = async (file, filename) => {
  if (!file) {
    const error = new Error("이미지 파일이 존재하지 않습니다.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `images/${filename}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();

    return { imageUrl: result.Location, filename };
  } catch (err) {
    console.error("S3 업로드 오류:", err);
    const error = new Error(
      err.code === "NetworkingError"
        ? "AWS S3 서버와의 연결이 지연되었습니다."
        : "AWS S3 업로드 중 오류가 발생했습니다."
    );
    error.statusCode = err.code === "NetworkingError" ? 504 : 500;
    throw error;
  }
};

