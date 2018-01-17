import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    this.data = [
      {
        name: 'test dude 1',
        score: 5,
        id: 1,
        badges: 2,
      },
      {
        name: 'test dude 2',
        score: 2,
        id: 2,
        badges: 1,
      },
      {
        name: 'test dude 3',
        score: 12,
        id: 3,
        badges: 4,
      },
    ];
    this.setState({
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    });
  }

  componentDidMount() {
    console.log('do stuff before rendering');
  }

  handleToggle(event, toggled) {
    return this.setState({
      [event.target.name]: toggled,
    });
  }

  handleChange(event) {
    return this.setState({ height: event.target.value });
  }


  render() {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
              <TableHeaderColumn>Badges</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.data.map((user, i) => (
              <TableRow key={user.id}>
                <TableRowColumn>{i + 1}</TableRowColumn>
                <TableRowColumn>{user.name}</TableRowColumn>
                <TableRowColumn>{user.score}</TableRowColumn>
                <TableRowColumn>{user.badges}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
            />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
            />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
            />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
            />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
            />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
            />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
            />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
            />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
            />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
            />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MuiThemeProvider>
    <Leaderboard />
  </MuiThemeProvider>,
  document.getElementById('leaderboard'),
);
