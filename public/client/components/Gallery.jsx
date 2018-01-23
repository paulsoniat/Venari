import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar.jsx';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageId: 0,
    };
  }

  componentWillMount() {
    axios.get('/findSubmissions').then((res) => {
      // this.setState({ images: res.data, loaded: true });
      console.log(res.data, "these are the images")
    });
  }

  upVote() {
    axios.post('/addVote', `imageId=${this.state.images[this.state.imageId].id}`)
      .then((res) => {
        console.log(res, 'this is addvote res');
      });
  }

  render() {
    if (!this.state.loaded) return <div>Loading Gallery</div>;
    return (
      <MuiThemeProvider>
        <div>
          <Navbar history={this.props.history} />
          <AutoRotatingCarousel
            label="Vote for this picture"
            open
            mobile
            style={{ position: 'inherit', width: '100%', height: '50%' }}
            onStart={() => { this.upVote(); }}
            onChange={(index) => { this.setState({ imageId: index }); }}
          >
            {this.state.images.map(image =>
              (<Slide
                key={image.id}
                media={<img src={image.image} height="300" width="300" alt="" />}
                mediaBackgroundStyle={{ backgroundColor: blue600 }}
                contentStyle={{ backgroundColor: blue400 }}
                title={''}
                subtitle={''}
              />))}
          </AutoRotatingCarousel>
        </div>
      </MuiThemeProvider>
    );
  }
}