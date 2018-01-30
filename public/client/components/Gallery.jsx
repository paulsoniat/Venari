import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar.jsx';

const capitalize = word => word.split('')[0].toUpperCase() + word.split('').slice(1).join('');

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageId: 0,
      colorWheel: [['#7E57C2'], ['#558B2F'], ['#e4bd3b'], ['#416854'], ['#00897B'], ['#7B1FA2']],
      randomColor: [],
    };
    this.randomizeColor = this.randomizeColor.bind(this);
  }

  componentWillMount() {
    axios.get('/findSubmissions').then((res) => {
      this.setState({ images: res.data, loaded: true });
    });
  }

  upVote() {
    axios.post('/addVote', `imageId=${this.state.images[this.state.imageId].id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err, 'this is vote add error');
      });
  }

  randomizeColor(index) {
    const randomIndex = Math.floor((this.state.colorWheel.length) * Math.random());
    this.setState({ imageId: index, randomColor: this.state.colorWheel[randomIndex] });
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
            interval={5000}
            style={{ position: 'inherit', width: '100%', height: '50%' }}
            onStart={() => { this.upVote(); }}
            onChange={index => (this.randomizeColor(index))}
          >
            {this.state.images.map(image =>
              (<Slide
                key={image.id}
                media={<img src={image.image} height="300" width="300" alt="" />}
                mediaBackgroundStyle={{ backgroundColor: this.state.randomColor[0] || '#7E57C2' }}
                contentStyle={{ backgroundColor: this.state.randomColor[0] || '#7E57C2' }}
                title={capitalize(image.itemName)}
                subtitle={image.userName}
              />))}
          </AutoRotatingCarousel>
        </div>
      </MuiThemeProvider>
    );
  }
}
