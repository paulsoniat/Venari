import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import Navbar from './Navbar.jsx';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <MuiThemeProvider>
        <Navbar />
        <AutoRotatingCarousel
          label="Vote for this picture"
          open
          mobile
          style={{ position: 'inherit', width: '100%', height: '50%' }}
          // onStart={() => { axios.get(`/challenge:${this.state.challengeData[this.state.challengeId].id}`).then((res) => {console.log(res);}); }}
          // onStart={() => { this.changePage() }}
          // onChange={(index) => { this.setState({ challengeId: index }); }}
        >
          <Slide
            media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />}
            mediaBackgroundStyle={{ backgroundColor: red400 }}
            contentStyle={{ backgroundColor: red600 }}
            title="This is a very cool feature"
            subtitle="Just using this will blow your mind."
          />
          <Slide
            media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />}
            mediaBackgroundStyle={{ backgroundColor: blue400 }}
            contentStyle={{ backgroundColor: blue600 }}
            title="Ever wanted to be popular?"
            subtitle="Well just mix two colors and your are good to go!"
          />
        </AutoRotatingCarousel>
      </MuiThemeProvider>

    );
  }
}