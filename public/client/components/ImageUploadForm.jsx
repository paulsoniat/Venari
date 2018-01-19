import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class ImageUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.filepath = `${props.challenge.split(' ').join('')}/${props.username}/${props.item}.jpg`;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/pictureAnalysis', `imageFile=http://bnwrainbows.s3.amazonaws.com/${this.filepath}`)
      .then((res) => {
        const classData = res.data.images[0].classifiers[0].classes;
        console.log(classData, "this is data")
        let classDataStructure = [];
        classData.forEach(function (value) {
          classDataStructure.push(value.class)
        });
        axios.post('/checkData', `dataArray=${classDataStructure}, ${this.props.item}`)
          .then((res) => {
            console.log(res, "this is check data res")
            if (res.data === "yaaaaaaas") {
              axios.post('/addPoint', `pointData=${this.props.item}`)
                .then((res) => {
                  console.log(res, "this is add point res")
                })
                .catch((err) => {
                  console.log(err, "this is add point err")
                });
            }
          })
          .catch((err) => {
            console.log(err, "this is error in check data")
          })
      }).catch((err) => {
        console.log(err.response, 'this is error overall');
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
            <input type="file" accept="image/jpeg" name="file" />
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

// class ImageUpload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: '',
//       imagePreviewUrl: ''
//     };
//     this._handleImageChange = this._handleImageChange.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//   }

//   _handleSubmit(e) {
//     e.preventDefault();
//     // TODO: do something with -> this.state.file
//   }

//   _handleImageChange(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }

//     reader.readAsDataURL(file)
//   }

//   render() {
//     let { imagePreviewUrl } = this.state;
//     let $imagePreview = null;
//     if (imagePreviewUrl) {
//       $imagePreview = (<img src={imagePreviewUrl} />);
//     }

//     return (
//       <div>
//         <form onSubmit={this._handleSubmit}>
//           <input type="file" onChange={this._handleImageChange} />
//           <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
//         </form>
//         {$imagePreview}
//       </div>
//     )
//   }

// }
