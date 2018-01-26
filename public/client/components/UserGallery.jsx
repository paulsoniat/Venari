import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './Navbar.jsx';
const capitalize = word => word.split('')[0].toUpperCase() + word.split('').slice(1).join('');

export default class UserGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageId: 0,
      open: true,
    };
    this.closeModal = this.closeModal.bind(this);
  }
  
  componentWillMount() {
    axios.get('/userSubmissions').then((res) => {
      this.setState({ images: res.data, loaded: true });
    });
  }

  closeModal() {
    this.props.history.push('/main');
  }

  render() {
    if (!this.state.loaded) return <div>Loading Gallery</div>;
    else if (this.state.images.length === 0) {
      return (
        <MuiThemeProvider>
          <div>
            <Navbar history={this.props.history} />
            <p style={{ textAlign: 'center', marginTop: 50 }}>There doesn't seem to be anything here...</p>
            <Dialog
              title="No User Images"
              actions={<FlatButton
                label="Go To Challenges"
                primary
                keyboardFocused
                onClick={this.closeModal}
              />}
              modal
              open={this.state.open}
              onRequestClose={this.closeModal}
            >
              {/* <p>This page displays the images you have submitted.</p> */}
              <p>Please submit an image to a challenge to view this page.</p>
            </Dialog>
          </div>
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider>
        <div>
          <Navbar history={this.props.history} />
          <AutoRotatingCarousel
            // label="Vote for this picture"
            open
            mobile
            style={{ position: 'inherit', width: '100%', height: '50%' }}
            onStart={() => ''}
            onChange={(index) => { this.setState({ imageId: index }); }}
          >
            {this.state.images.map(image =>
              (<Slide
                key={image.id}
                media={<img src={image.image} height="300" width="300" alt="" />}
                mediaBackgroundStyle={{ backgroundColor: blue600 }}
                contentStyle={{ backgroundColor: blue400 }}
                title={capitalize(image.itemName)}
                subtitle={image.date.slice(0, 16)}
              />))}
          </AutoRotatingCarousel>
        </div>
      </MuiThemeProvider>
    );
  }
}
