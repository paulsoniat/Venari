import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar.jsx';

export default class Trophies extends React.Component {
  constructor(props) {
    super(props);
    this.ESLintPlease = 'stop giving me stupid errors. seriously.';
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          <AutoRotatingCarousel
            open
            mobile
            style={{ position: 'inherit', width: '100%', height: '50%' }}
          >
            <Slide
              media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" alt="" />}
              mediaBackgroundStyle={{ backgroundColor: red400 }}
              contentStyle={{ backgroundColor: red600 }}
              title="This is a very cool feature"
              subtitle="Just using this will blow your mind."
            />
            <Slide
              media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" alt="" />}
              mediaBackgroundStyle={{ backgroundColor: blue400 }}
              contentStyle={{ backgroundColor: blue600 }}
              title="Ever wanted to be popular?"
              subtitle="Well just mix two colors and your are good to go!"
            />
          </AutoRotatingCarousel>
        </div>
      </MuiThemeProvider>

    );
  }
}
