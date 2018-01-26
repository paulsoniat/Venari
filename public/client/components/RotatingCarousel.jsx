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
    };
    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    axios.get('/challenges').then((res) => {
      this.setState({ challengeData: res.data, loaded: true });
    });
  }

  changePage() {
    this.props.history.push(`/challenge/:${this.state.challengeData[this.state.challengeId].id}`)
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
          style={{ position: 'inherit', width: '100%', height: '50%' }}
          onStart={() => { this.changePage(); }}
          onChange={(index) => { this.setState({ challengeId: index }); } }
        >
          {this.state.challengeData.map(challenge =>
            (<Slide 
              key={challenge.id}
              media={<img src={challenge.image} height="300" width="300" alt="" />}
              mediaBackgroundStyle={{ backgroundColor: blue600 }}
              contentStyle={{ backgroundColor: blue400 }}
              title={challenge.title}
              subtitle={challenge.description}
            />))}
        </AutoRotatingCarousel>
      </div>
    );
  }
}
