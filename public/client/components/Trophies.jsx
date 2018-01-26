import React from 'react';
import axios from 'axios';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './Navbar.jsx';
import Scene from './trophy.jsx';

// const getTrophy = require('./trophy.js').getTrophy;

export default class Trophies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trophies: [{ image: '/css/venariLogo.png' }],
      open: false,
      trophy: '',
    };
    this.showDetails = this.showDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    axios.get('/getbadges')
      .then((badges) => {
        this.setState({ trophies: badges.data });
        console.log(this.state.trophies);
      });
  }

  showDetails(trophy) {
    console.log(trophy);
    this.setState({ open: true, trophy });
  }
  closeModal() {
    this.setState({
      open: false,
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <div >
          <Navbar history={this.props.history} />
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {
          this.state.trophies.map(trophy =>
            (<div onClick={() => this.showDetails(trophy)}>
              <ChallengeModal
                message={this.state.trophy.title}
                desc={this.state.trophy.description}
                open={this.state.open}
                close={this.closeModal}
              />
              <Scene image="http://bnwrainbows.s3.amazonaws.com/AnotherTestChallenge/3/cat.png" />
             </div>
            ))
        }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


const ChallengeModal = ({
  desc, message, open, close,
}) => {
  const actions = [
    <FlatButton
      label="Close"
      primary
      keyboardFocused
      onClick={close}
    />,
  ];
  return (
    <Dialog
      // title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={close}
    >
      <h2>You Completed:</h2>
      <h3>{message}</h3>
      <p>{desc}</p>
    </Dialog>
  );
};
