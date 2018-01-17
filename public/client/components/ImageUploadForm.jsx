/**
 * Image Upload Form to upload images to S3 storage
 * Takes in the name of the challenge, user, and item as props
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.filepath = `${props.challenge}/${props.username}/${props.item}.jpg`;
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
            <input type="submit" value="Send" />
          </div>
        </form>
        <img src={`http://bnwrainbows.s3.amazonaws.com/${this.filepath}` height="300" width="300"} alt="where is the cat?" />
      </div>
    );
  }
}

ImageUploadForm.propTypes = {
  challenge: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};
