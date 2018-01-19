import React from 'react';
import AWS from 'aws-sdk';

const albumBucketName = 'bnwrainbows';
const bucketRegion = 'us-east-2';
const IdPoolId = 'us-east-2:5cdc129e-149d-4a6a-92dc-064f77740edf';

export default class Test extends React.Component {
  constructor(props) {
    super(props);

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdPoolId,
      }),
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: albumBucketName },
    });
    
    this.addPhoto = this.addPhoto.bind(this);
  }

  addPhoto() {
    const { files } = document.getElementById('photoupload');
    if (!files.length) {
      console.error('please choose a file');
    }
    const file = files[0];
    // const fileName = file.name;
    // const albumPhotosKey = `${encodeURIComponent(albumName)}/`;
    // const photoKey = albumPhotosKey + fileName;
    const photoKey = `${this.props.user}/${this.props.challenge}/${this.props.item}.jpg`;

    this.s3.upload({
      Key: photoKey,
      Body: file,
      ACL: 'public-read',
      ContentType: 'image/jpeg',
    }, (err, data) => {
      if (err) {
        console.error('error uploading image', err);
      } else {
        console.log('s3 response data', data);
      }
    });
  }

  render() {
    return (
      <div>
        <p>Hello Test</p>
        <input type="file" id="photoupload" accept="image/*" />
        <button id="addphoto" onClick={this.addPhoto} >Upload</button>
      </div>

    );
  }
}
