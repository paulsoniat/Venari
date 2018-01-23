import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Navbar from './Navbar.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.tilesData = [
      {
        img: 'client/css/giphy.gif',
        title: 'Challenges',
      },
      {
        img: 'client/css/giphy.gif',
        title: 'Leaderboard',
      },
      {
        img: 'client/css/giphy.gif',
        title: 'Gallery',
      },
      {
        img: 'client/css/giphy.gif',
        title: 'Trophy Room',
      },
    ];
    this.test = this.test.bind(this);
  }

  test(e) {
    const title = e._targetInst._debugOwner.key;
    // const tile = this.tilesData.reduce((prev, current) => {
    //   if (current.title === title) {
    //     return current;
    //   }
    //   return prev;
    // });
    switch(title) {
      case 'Challenges':
        this.props.history.push('/main');
        break;
        case 'Leaderboard':
        this.props.history.push('/leaderboard');
        break;
        case 'Gallery':
        this.props.history.push('/gallery');
        break;
        case 'Trophy Room':
        this.props.history.push('/trophies');
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.root}>
          <Navbar history={this.props.history} />
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >
            {this.tilesData.map(tile => (
              <GridTile
                key={tile.title}
                title={tile.title}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                onClick={this.test}
                // actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={tile.img} alt="uh-oh spaghettios" />
              </GridTile>
            ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Dashboard;
