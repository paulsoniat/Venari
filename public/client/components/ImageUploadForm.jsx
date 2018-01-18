import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.filepath = `${props.challenge}/${props.username}/${props.item}.jpg`;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/pictureAnalysis', `imageFile=http://bnwrainbows.s3.amazonaws.com/${this.filepath}`)
      .then((res) => {
        console.log(res, 'this is res');
      }).catch((err) => {
        console.log(err.response, 'this is error');
      });
  }

  render() {
    return (
      <div>
        <form action="http://bnwrainbows.s3.amazonaws.com/" encType="multipart/form-data" method="post" onSubmit={this.handleSubmit}>
          <p>
            Upload an image of a {this.props.item} for {this.props.challenge}:
            <br />
            <input type="hidden" name="key" value={this.filepath} />
            <input type="file" name="file" />
          </p>
          <div>
            <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
          </div>
        </form>
      </div>
    );
  }
}

ImageUploadForm.propTypes = {
  challenge: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};

