import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AWS from 'aws-sdk';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { fileToImage, imageToCanvas, canvasToBlob } from '../util';
import FontIcon from 'material-ui/FontIcon';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import ImageAddPhoto from 'material-ui/svg-icons/image/add-a-photo';

const albumBucketName = 'bnwrainbows';
const bucketRegion = 'us-east-2';
const IdPoolId = 'us-east-2:5cdc129e-149d-4a6a-92dc-064f77740edf';
const capitalize = word => word.split('')[0].toUpperCase() + word.split('').slice(1).join('');


export default class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
      message: 'this should not show up',
      title: 'this too',
    };

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
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { files } = document.getElementById(`photoupload-${this.props.index}`);
    if (!files.length) {
      // don't allow null submit
      return this.setState({
        open: true,
        title: 'Error!',
        message: 'Please choose an image to submit',
      });
    }
    const file = files[0];
    const maxWidth = 500;
    const maxHeight = 500;
    fileToImage(file).then((img) => {
      const factor = Math.min(1, maxWidth / img.width);
      return imageToCanvas(img, factor);
    }).then(canvas => canvasToBlob(canvas, 'image/png')).then((blob) => {
      const photoKey = `venari/users/${this.props.user}/temp.png`;
      this.s3.upload({
        Key: photoKey,
        Body: blob,
        ACL: 'public-read',
        ContentType: 'image/png',
      }, (err, data) => {
        if (err) {
          console.error('error uploading image', err);
        } else {
          const filepath = data.Location;
          this.setState({ loading: true });
          axios.post('/pictureAnalysis', `imageFile=https://bnwrainbows.s3.amazonaws.com/${photoKey}`)
            .then((res) => {
              const classData = res.data.images[0].classifiers[0].classes;
              const classDataStructure = [];
              classData.forEach((value) => {
                classDataStructure.push(value.class);
              });
              axios.post('/checkData', `dataArray=${classDataStructure}, ${this.props.item}`)
                .then((response) => {
                  this.setState({ loading: false });
                  if (response.data === 'yaaaaaaas') {
                    const realKey = `venari/users/${this.props.user}/${this.props.challengeId}/${this.props.item.split(' ').join('')}.png`;
                    this.s3.upload({
                      Key: realKey,
                      Body: blob,
                      ACL: 'public-read',
                      ContentType: 'image/png',
                    }, (realErr, realData) => {
                      if (realErr) {
                        console.error('error uploading image', realErr);
                      } else {
                        axios.post('/saveSubmission', `submissionData=${this.props.item}, ${this.props.challengeId},https://bnwrainbows.s3.amazonaws.com/${realKey}`)
                          .then((res) => {
                            if (res.data === 'created') {
                              axios.post('/addPoint', `pointData=${this.props.item}`)
                                .then((pointResponse) => {
                                  // successful submission
                                  this.setState({
                                    loading: false,
                                    open: true,
                                    message: `${capitalize(this.props.item)} submission successful`,
                                    title: 'Success!',
                                  });
                                })
                                .catch((err) => {
                                  console.log(err, 'this is add point err');
                                });
                            } else if (res.data === 'challenge complete') {
                              // successful submission that completes challenge
                              axios.post('/addPoint', `pointData=${this.props.item}`)
                                .then((pointResponse) => {
                                  this.setState({
                                    loading: false,
                                    open: true,
                                    message: `${capitalize(this.props.item)} submission successful!\n
                                    ${this.props.challenge} Challenge Completed!`,
                                    title: 'Success!',
                                  });
                                })
                                .catch((err) => {
                                  console.log(err, 'this is add point err');
                                });
                            } else {
                              // successful update
                              this.setState({
                                loading: false,
                                open: true,
                                message: `Updated ${capitalize(this.props.item)} submission`,
                                title: 'Success!',
                              });
                            }
                          })
                          .catch((err) => {
                            console.log(err, 'this is submission error');
                          });
                      }
                    });
                  } else {
                    console.log(`invalid ${this.props.item}`);
                    this.setState({
                      open: true,
                      message: `Invalid ${capitalize(this.props.item)}`,
                      title: 'Error!',
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
    });
  }

  closeModal() {
    this.setState({
      open: false,
    });
  }

  render() {
    if (this.state.loading) return <div> <div><iframe src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen /></div></div>;
    return (
      <div className="upload">
      <span className="rwd-line">
        Upload an image of a {this.props.item} for {this.props.challenge}:
        </span>
        <br />
        <input id={`photoupload-${this.props.index}`} type="file" accept="image/*" />
        {/* <button type="submit" onClick={this.handleSubmit}>Upload Image</button> */}
        <UploadModal
          item={capitalize(this.props.item)}
          title={this.state.title}
          message={this.state.message}
          open={this.state.open}
          close={this.closeModal}
        />
        
        <FlatButton icon={<FileFileUpload />} align="left" backgroundColor="LightGray" hoverColor="Gray" onClick={this.handleSubmit}></FlatButton>
        <br />
      </div>
    );
  }
}


const UploadModal = ({
  item, message, title, open, close,
}) => {
  const actions = [
    <FlatButton
      label="Close"
      primary
      keyboardFocused
      onClick={close}
    />,
  ];
  return (
    <Dialog
      title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={close}
    >
      <p>{message}</p>
    </Dialog>
  );
};

ImageUploadForm.propTypes = {
  challenge: PropTypes.string.isRequired,
  challengeId: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
