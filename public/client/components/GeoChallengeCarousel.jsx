import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import Navbar from './Navbar.jsx';

export default class RotatingCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeData: [],
      challengeId: 0,
      colorWheel: [['#7E57C2'], ['#558B2F'], ['#e4bd3b'], ['#416854'], ['#00897B'], ['#7B1FA2']],
      randomColor: [],
    };
    this.changePage = this.changePage.bind(this);
    this.randomizeColor = this.randomizeColor.bind(this);
  }

  componentWillMount() {
    axios.get('/locationChallenges').then((res) => {
      this.setState({ challengeData: res.data, loaded: true });
    });
  }

  changePage() {
    this.props.history.push(`/challenge/:${this.state.challengeData[this.state.challengeId].id}`);
  }

  randomizeColor(index) {
    const randomIndex = Math.floor((this.state.colorWheel.length) * Math.random());
    this.setState({ challengeId: index, randomColor: this.state.colorWheel[randomIndex] });
  }

  render() {
    if (!this.state.loaded) return <div>Loading New Challenges</div>;
    return (
      <div>
        <Navbar history={this.props.history} />
        <AutoRotatingCarousel
          label="Begin this Challenge"
          open
          mobile
          interval={5000}
          style={{
 position: 'inherit', width: '100%', height: '50%', overflow: 'hidden',
}}
          onStart={() => { this.changePage(); }}
          onChange={index => (this.randomizeColor(index))}
        >
          {this.state.challengeData.map(challenge =>
            (<Slide
              key={challenge.id}
              media={<img src={challenge.image} height="300" width="300" alt="" />}
              mediaBackgroundStyle={{ backgroundColor: this.state.randomColor[0] || '#7E57C2' }}
              contentStyle={{ backgroundColor: this.state.randomColor[0] || '#7E57C2' }}
              title={challenge.title}
              subtitle={challenge.description}
            />))}
        </AutoRotatingCarousel>
      </div>
    );
  }
}
