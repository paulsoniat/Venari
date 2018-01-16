import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';

export default class RotatingCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      challengeData: [],
    };
  }

  componentWillMount() {
    axios.get('/challenges').then((res) => {
      this.setState({ challengeData: res.data, loaded: true });
    });
  }


  render() {
    if (!this.state.loaded) return <div>Loading New Challenges</div>;
    return (
      <div>
        <AutoRotatingCarousel
          label="Begin this Challenge"
          open
          mobile
          style={{ position: 'inherit', width: '100%', height: '50%' }}
        >
          {this.state.challengeData.map(challenge =>
          (<Slide
            key={challenge.id}
            media={<img src={challenge.image} />}
            mediaBackgroundStyle={green600}
            contentStyle={green400}
            title={challenge.title}
            subtitle={challenge.description}
          />))}
        </AutoRotatingCarousel>
      </div>
    );
  }
}
