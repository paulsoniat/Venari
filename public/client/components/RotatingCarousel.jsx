import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import Navbar from './Navbar.jsx';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';

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
        <Navbar/>
        <AutoRotatingCarousel
          label="Begin this Challenge"
          open
          mobile
          style={{ position: 'inherit', width: '100%', height: '50%' }}
          onStart={() => { this.changePage() }}
          onChange={(index) => { this.setState({ challengeId: index }); } }
        >
          {this.state.challengeData.map(challenge =>
            (<Slide
              key={challenge.id}
              media={<img src={challenge.image} height="300" width="300"/>}
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