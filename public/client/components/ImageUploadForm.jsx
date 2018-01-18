/**
 * Image Upload Form to upload images to S3 storage
 * Takes in the name of the challenge, user, and item as props
 */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.filepath = `${props.challenge}/${props.username}/${props.item}.jpg`;
  }
  picturePost(file) {
    const encodedFileString = file.replace('data:image/jpeg;base64,', '');
      axios.post('/pictureAnalysis', { encodedFileString })
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <form action="http://bnwrainbows.s3.amazonaws.com/" encType="multipart/form-data" method="post">
          <p>
            Upload an image of a {this.props.item} for {this.props.challenge}:
            <br />
            <input type="hidden" name="key" value={this.filepath} />
            <input type="file" name="file" />
          </p>
          <div>
            <input type="submit" value="Send" onClick={this.picturePost(`http://bnwrainbows.s3.amazonaws.com/${this.filepath}`)} />
          </div>
        </form>
<<<<<<< HEAD
        <img src={`http://bnwrainbows.s3.amazonaws.com/${this.filepath}`} height="300" width="300" alt="where is the cat?" />
=======
        <img src={`http://bnwrainbows.s3.amazonaws.com/${this.filepath}`} alt="Please Submit Your Picture"/>
>>>>>>> [submission] commit before rebase, seeting up route to file submission
      </div>
    );
  }
}

ImageUploadForm.propTypes = {
  challenge: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};
