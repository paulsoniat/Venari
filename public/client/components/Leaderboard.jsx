import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
    // this.setState({
    //   data: [],
    // });
    this.state = {
      data: [],
      numColStyle: {
        width: '2rem',
      },
    };
    // this.data = [
    //   {
    //     name: 'test dude 1',
    //     score: 5,
    //     id: 1,
    //     badges: 2,
    //   },
    //   {
    //     name: 'test dude 2',
    //     score: 2,
    //     id: 2,
    //     badges: 1,
    //   },
    //   {
    //     name: 'test dude 3',
    //     score: 12,
    //     id: 3,
    //     badges: 4,
    //   },
    // ];
  }

  componentDidMount() {
    console.log('do stuff before rendering');
    axios.get('/users').then((response) => {
      console.log(response.data);
      this.setState({
        data: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn style={this.state.numColStyle}>Rank</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
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
        </MuiThemeProvider>
      </div>
    );
  }
}

// ReactDOM.render(
//   <MuiThemeProvider>
//     <Leaderboard />
//   </MuiThemeProvider>,
//   document.getElementById('leaderboard'),
// );
