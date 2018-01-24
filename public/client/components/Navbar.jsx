import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const styles = {
  title: {
    cursor: 'pointer',
  },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
* through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
const Navbar = ({ history }) => (
  <AppBar
    title={<span style={styles.title}>Venari</span>}
    showMenuIconButton={false}
    onTitleClick={() => { history.push('/home'); }}
    iconElementRight={
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem primaryText="Trophy Room" containerElement={<Link to="/trophies" />} />
        <MenuItem primaryText="Leader Board" containerElement={<Link to="/leaderboard" />} />
        <MenuItem primaryText="Gallery" containerElement={<Link to="/gallery" />} />
        <MenuItem primaryText="Challenges" containerElement={<Link to="/main" />} />
        <MenuItem primaryText="Create Challenge" containerElement={<Link to="/create" />} />
        <MenuItem primaryText="Sign out" href="/logout" />
      </IconMenu>}
  />
);

export default Navbar;
