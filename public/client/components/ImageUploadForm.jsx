import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AWS from 'aws-sdk';

const albumBucketName = 'bnwrainbows';
const bucketRegion = 'us-east-2';
const IdPoolId = 'us-east-2:5cdc129e-149d-4a6a-92dc-064f77740edf';

export default class ImageUploadForm extends React.Component {
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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { files } = document.getElementById(`photoupload-${this.props.index}`);
    if (!files.length) {
      console.error('please choose a file');
    }
    const file = files[0];
    const photoKey = `${this.props.challenge.split(' ').join('')}/${this.props.username}/${this.props.item}.png`;

    this.s3.upload({
      Key: photoKey,
      Body: file,
      ACL: 'public-read',
      ContentType: 'image/png',
    }, (err, data) => {
      if (err) {
        console.error('error uploading image', err);
      } else {
        const filepath = data.Location;
        axios.post('/pictureAnalysis', `imageFile=http://bnwrainbows.s3.amazonaws.com/${this.filepath}`)
          .then((res) => {
            const classData = res.data.images[0].classifiers[0].classes;
            const classDataStructure = [];
            classData.forEach((value) => {
              classDataStructure.push(value.class);
            });
            axios.post('/checkData', `dataArray=${classDataStructure}, ${this.props.item}`)
              .then((response) => {
                if (response.data === 'yaaaaaaas') {
                  // add another then satement that checks Y/N from user submission check
                  axios.post('/saveSubmission', `submissionData=${this.props.item}, ${this.props.challenge},${this.filepath}`)
                    .then((res) => {
                      if (res.data === 'newSubmission') {
                        axios.post('/addPoint', `pointData=${this.props.item}`)
                          .then((pointResponse) => {
                            console.log(pointResponse, 'this is add point res');
                          })
                          .catch((err) => {
                            console.log(err, 'this is add point err');
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err, 'this is submission error');
                    });
                }
              })
              .catch((err) => {
                console.log(err, 'this is error in check data');
              });
          }).catch((err) => {
            console.log(err.response, 'this is error overall');
          });
      }
    });
  }

  render() {
    return (
      <div>
        Upload an image of a {this.props.item} for {this.props.challenge}:
        <br />
        <input id={`photoupload-${this.props.index}`} type="file" accept="image/*" />
        <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
      </div>
    );
  }
}

ImageUploadForm.propTypes = {
  challenge: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
