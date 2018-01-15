import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';

export default class RotatingCarousel extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    axios.get('/challenges').then((res) => {
      console.log(res, "this is res")
      this.setState({ challengeData: res.data });
    });
  }


  render() {
    console.log('this is muh fuckin challenges', this.state.challengeData);
    return (
      <div>
        <AutoRotatingCarousel
          label="Get started"
          open
        >
          {this.state.challengeData.map(challenge =>
          (<Slide
            key={challenge.id}
            media={<img src={challenge.image} />}
            mediaBackgroundStyle={challenge.mediaBackgroundStyle}
            contentStyle={challenge.contentStyle}
            title={challenge.title}
            subtitle={challenge.subtitle}
          />))}
        </AutoRotatingCarousel>
      </div>
    );
  }
}
