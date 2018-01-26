import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import Navbar from './Navbar.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 350,
    height: 500,
    overflowY: 'auto',
  },
};


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.tilesData = [
      {
        img: 'client/css/challenges.gif',
        title: 'Challenges',
      },
      {
        img: 'client/css/leaderboard.gif',
        title: 'Leaderboard',
      },
      {
        img: 'client/css/gallery.gif',
        title: 'Gallery',
      },
      {
        img: 'client/css/trophies.gif',
        title: 'Trophy Room',
      },
      {
        img: 'client/css/create-challenge.gif',
        title: 'Create Challenge',
      },
      {
        img: 'client/css/user-gallery.gif',
        title: 'Your Gallery',
      },
    ];
    this.routeTo = this.routeTo.bind(this);
  }

  routeTo(e) {
    const title = e._targetInst._debugOwner.key;
    // const tile = this.tilesData.reduce((prev, current) => {
    //   if (current.title === title) {
    //     return current;
    //   }
    //   return prev;
    // });
    switch (title) {
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
      case 'Create Challenge':
        this.props.history.push('/create');
        break;
      case 'Your Gallery':
        this.props.history.push('/UserGallery');
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
            cellHeight="auto"
            style={styles.gridList}
          >
            {this.tilesData.map(tile => (
              <GridTile
                align="center"
                key={tile.title}
                title={tile.title}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                onClick={this.routeTo}
                // actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={tile.img} alt="uh-oh spaghettios" style={{ maxHeight: 125 }} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Dashboard;
