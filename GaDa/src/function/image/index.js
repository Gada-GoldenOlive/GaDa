import S3 from 'aws-sdk/clients/s3';
import { Credentials } from 'aws-sdk';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { RNS3 } from 'react-native-aws3';
import { setProfileImage } from '../../redux/modules/images';
const AWS = require('aws-sdk');

const access = new Credentials({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3({
  credentials: access,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

export const getPreSignedUrl = async () => {
  const fileId = 'grace915';
  const signedUrlExpireSeconds = 60 * 15;

  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.S3_BUCKET,
    Key: `${fileId}.png`,
    ContentType: 'image/png',
    Expires: signedUrlExpireSeconds,
  });

  return { url: url };
};

export const getParam = image => {
  const options = {
    keyPrefix: 'uploads/',
    bucket: 'golden-olive-gada',
    region: 'ap-northeast-2',
    accessKey: 'KIAWYILN5RHP2S6VMMI',
    secretKey: 'hL0hrVQRwsK5+nDu08bpyi3vg7VpbVtPCtR+ogAL',
    successActionStatus: 201,
  };
  const file = {
    uri: `${image.path}`,
    name: image.path.substring(image.path.lastIndexOf('/') + 1), //extracting filename from image path
    type: image.mime,
  };
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAWYILN5RHP2S6VMMI',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
  });

  const param = {
    Bucket: 'golden-olive-gada',
    Key: `gada/image/${file.name}`,
    Body: image.path,
    ContentType: 'image/png',
  };

  return param;
  /*
    return new Promise((resolve, reject) => {
      RNS3.put(file, options)
        .then(res => {
          if (res.status === 201) {
            const {postResponse} = res.body;
            resolve({
              src: postResponse.location,
            });
          } else {
            console.log('error uploading to s3', res);
          }
        })
        .catch(err => {
          console.log('error uploading to s3', err);
          reject(err);
        });
    });
    */


};
/*
s3.upload(param, (err, data)=> {
  if (err) {
    console.log('image upload err: ' + err);
    return;
  }
  const imgTag = `${data.Location}`;
 return 'hey';
});
*/