import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      numColStyle: {
        width: '2rem',
      },
      displayed: null,
      open: false,
    };
    this.handleSelected = this.handleSelected.bind(this);
    this.closeSelection = this.closeSelection.bind(this);
  }

  componentDidMount() {
    axios.get('/users').then((response) => {
      console.log(response.data);
      this.setState({
        data: response.data,
      });
    });
  }

  handleSelected(selectedRows) {
    this.setState({
      displayed: this.state.data[selectedRows],
      open: true,
    });
  }

  closeSelection() {
    this.setState({
      displayed: null,
      open: false,
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Table onRowSelection={this.handleSelected}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn style={this.state.numColStyle}>Rank</TableHeaderColumn>
                  <TableHeaderColumn>User</TableHeaderColumn>
                  <TableHeaderColumn style={this.state.numColStyle}>Score</TableHeaderColumn>
                  {/* <TableHeaderColumn style={this.state.numColStyle}>Badges</TableHeaderColumn> */}
                  {/* <TableHeaderColumn style={this.state.numColStyle}>Challenges Completed</TableHeaderColumn> */}
                  {/* <TableHeaderColumn style={this.state.numColStyle}>Total Submissions</TableHeaderColumn> */}
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover
              >
                {this.state.data.map((user, i) => (
                  <TableRow key={user.id}>
                    <TableRowColumn style={this.state.numColStyle}>{i + 1}</TableRowColumn>
                    <TableRowColumn>{user.name}</TableRowColumn>
                    <TableRowColumn style={this.state.numColStyle}>{user.score}</TableRowColumn>
                    {/* <TableRowColumn style={this.state.numColStyle}>{user.badges.length}</TableRowColumn> */}
                    {/* <TableRowColumn style={this.state.numColStyle}>{user.challenges.length}</TableRowColumn> */}
                    {/* <TableRowColumn style={this.state.numColStyle}>{user.submissions.length}</TableRowColumn> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Selected user={this.state.displayed} open={this.state.open} close={this.closeSelection} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const Selected = ({ user, open, close }) => {
  const actions = [
    <FlatButton
      label="Close"
      primary
      keyboardFocused
      onClick={close}
    />,
  ];
  return (
    user ?
      <Dialog
        title={user.name}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={close}
      >
        <p>Challenges Completed: {user.challenges.length}</p>
        <p>Badges Earned: {user.badges.length}</p>
        <p>Total Submissions: {user.submissions.length}</p>
        <p>Total Score: {user.score}</p>
      </Dialog> : null
  );
};
