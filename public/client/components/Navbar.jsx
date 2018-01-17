import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Main from './Main.jsx';


function handleClick() {
  console.log('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
const Navbar = () => (
  <AppBar
    title={<span style={styles.title}>Venari</span>}
    showMenuIconButton={false}
    onTitleClick={handleClick}
    iconElementRight={
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem primaryText="Trophy Room" containerElement={<Link to="/Trophies" />} />
        <MenuItem primaryText="Leader Board" />
        <MenuItem primaryText="Gallery" containerElement={<Link to="/Gallery" />} />
        <MenuItem  primaryText='Challenges' containerElement={ <Link to="/main" />} />
        <MenuItem primaryText="Sign out" />
      </IconMenu>}
  />
);

export default Navbar;