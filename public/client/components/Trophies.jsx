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
      trophies: [],
      open: false,
      trophy: '',
      loading: true,
    };
    this.showDetails = this.showDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.returnHome = this.returnHome.bind(this);
  }

  componentDidMount() {
    axios.get('/getbadges')
      .then((badges) => {
        this.setState({ trophies: badges.data, loading: false });
      });
  }

  showDetails(trophy) {
    this.setState({ open: true, trophy });
  }
  
  closeModal() {
    this.setState({
      open: false,
    });
  }

  returnHome() {
    this.props.history.push('/home');
  }

  render() {
    if (this.state.loading) return <div> <MuiThemeProvider> <Navbar history={this.props.history} /> </MuiThemeProvider> <div><iframe src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen /></div></div>;
    else if (this.state.trophies.length === 0) {
      return (
        <MuiThemeProvider>
          <div>
            <Navbar history={this.props.history} />
            <p style={{ textAlign: 'center', marginTop: 50, fontFamily: 'Nunito' }}>There doesn't seem to be anything here...</p>
            <Dialog
              title="No User Trophies"
              actions={<FlatButton
                label="Return to Homepage"
                primary
                keyboardFocused
                onClick={this.returnHome}
              />}
              modal
              open
              onRequestClose={this.returnHome}
            >
              {/* <p>This page displays the images you have submitted.</p> */}
              <p>Earn trophies by completing challenges.</p>
            </Dialog>
          </div>
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider>
        <div >
          <Navbar history={this.props.history} />
          <div style={{ display: 'flex', flexFlow: 'row wrap', background: 'white' }}>
            {
          this.state.trophies.map(trophy =>
            (<div onClick={() => this.showDetails(trophy)}>
              <ChallengeModal
                message={this.state.trophy.title}
                desc={this.state.trophy.description}
                open={this.state.open}
                close={this.closeModal}
              />
              <Scene image={trophy.image} />
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
