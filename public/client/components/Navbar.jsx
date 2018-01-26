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
    style={{ fontFamily: 'Lobster', backgroundColor: '#311B92' }}
    title={<span style={styles.title}>Venari</span>}
    showMenuIconButton={false}
    onTitleClick={() => { history.push('/home'); }}
    iconElementRight={
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem className="menuItem" primaryText="Trophy Room" containerElement={<Link to="/trophies" />} />
        <MenuItem className="menuItem" primaryText="Leader Board" containerElement={<Link to="/leaderboard" />} />
        <MenuItem className="menuItem" primaryText="Gallery" containerElement={<Link to="/gallery" />} />
        <MenuItem className="menuItem" primaryText="Your Gallery" containerElement={<Link to="/userGallery" />} />
        <MenuItem className="menuItem" primaryText="Challenges" containerElement={<Link to="/main" />} />
        <MenuItem className="menuItem" primaryText="Create Challenge" containerElement={<Link to="/create" />} />
        <MenuItem className="menuItem" primaryText="Sign out" href="/logout" />
      </IconMenu>}
  />
);

export default Navbar;
