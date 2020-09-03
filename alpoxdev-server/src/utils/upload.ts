import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: 'ap-northeast-2'
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'apick',
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 15 // 15MB
    }
});
