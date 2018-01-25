import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar.jsx';
const capitalize = word => word.split('')[0].toUpperCase() + word.split('').slice(1).join('');

export default class UserGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageId: 0,
    };
  }

  componentWillMount() {
    axios.get('/userSubmissions').then((res) => {
      console.log(res, "this is the response")
      this.setState({ images: res.data, loaded: true });
    });
  }

  render() {
    if (!this.state.loaded) return <div>Loading Gallery</div>;
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