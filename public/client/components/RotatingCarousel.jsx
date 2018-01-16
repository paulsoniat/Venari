import React from 'react';
import axios from 'axios';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import { withRouter } from 'react-router-dom';

export default class RotatingCarousel extends React.Component {
  constructor({ history }) {
    super({ history });
    this.state = {
      challengeData: [],
      challengeId: 0,
    };
  }

  componentWillMount() {
    axios.get('/challenges').then((res) => {
      this.setState({ challengeData: res.data, loaded: true });
    });
  }


  render() {
    const challengeClick = () => {
      console.log(this.props.history, 'this is history');
      this.props.history.push('/challenge');
    };
    if (!this.state.loaded) return <div>Loading New Challenges</div>;
    return (
      <div>
        <AutoRotatingCarousel
          label="Begin this Challenge"
          open
          mobile
          style={{ position: 'inherit', width: '100%', height: '50%' }}
          // onStart={() => { axios.get(`/challenge:${this.state.challengeData[this.state.challengeId].id}`).then((res) => {console.log(res);}); }}
          onStart={challengeClick}
          onChange={(index) => { this.setState({ challengeId: index }); }}
        >
          {this.state.challengeData.map(challenge =>
          (<Slide
            key={challenge.id}
            media={<img src={challenge.image} />}
            mediaBackgroundStyle={{ backgroundColor: green600 }}
            contentStyle={{ backgroundColor: green400 }}
            title={challenge.title}
            subtitle={challenge.description}
          />))}
        </AutoRotatingCarousel>
      </div>
    );
  }
}

withRouter(RotatingCarousel);
