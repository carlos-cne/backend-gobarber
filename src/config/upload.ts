import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface IStorageConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const originalname = file.originalname.replace(/ /g, '');
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const fileName = `${fileHash}-${originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'meugas-app',
    },
  },
} as IStorageConfig;
