import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploadForm from './ImageUploadForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class ChallengeItems extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [{ itemName: 'pecan pie' }, { itemName: 'candy' }, { itemName: 'gummy bears' }, { itemName: 'crabcakes'}],
      itemIndex: '',

    };
  }

  render() {
    return (
      <div>
      <Table
        onCellClick={(index)=> {this.setState({itemIndex: index})}}
        >
        {console.log(this.state.itemIndex)}
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Hunt List</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.items.map(item =>
            (<TableRow>
              <TableRowColumn>{item.itemName}</TableRowColumn>
              </TableRow>
      ))}
        </TableBody>
      </Table>
        <ImageUploadForm challenge={'food'} />
      </div>

    );
  }
}
