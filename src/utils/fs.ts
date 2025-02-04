import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { Request } from 'express';

interface ImageObject {
  url: string;
}

export const handleUdateImage = (currentImage: ImageObject | null, newImage: Express.Multer.File): ImageObject => {
  if (currentImage) {
    const imagePath = path.join(__dirname, '../..', currentImage.url);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  return { url: `/uploads/${newImage.filename}` };
};

export const handleUploadImage = (newImage: Express.Multer.File): ImageObject => {
  return { url: `/uploads/${newImage.filename}` };
};

export const deleteImage = (imageUrl: string): void => {
  const imagePath = path.join(__dirname, '../..', imageUrl);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

export interface FileRequest extends Request {
  file?: Express.Multer.File;
}

export const fileCleanup = async (req: FileRequest) => {
  if (req.file) {
    const filePath = path.resolve(req.file.path);
    await fsPromises.unlink(filePath).catch(err => {
      console.error(`Failed to delete file: ${filePath}`, err);
    });
  }
};