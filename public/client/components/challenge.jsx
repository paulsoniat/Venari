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
import axios from 'axios';


export default class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
=======
      items: [],
      itemIndex: '',
>>>>>>> [challenge] challenge page renders dynamic items related to that challenge on page load
      challengeData: [],
      challengeId: props.match.params.id.slice(1),
      user: '',
    };
  }

  componentWillMount() {

    // axios.get('/login/facebook/getUser').then((res) => {
    //   console.log(res, "this is FB res")
    //   this.setState({ user: res, userLoaded: true})
    // });

    axios.get('/challenges').then((res) => {
      res.data.forEach((challenge) => {
        if (challenge.id.toString() === this.state.challengeId) {
          this.setState({ challengeData: challenge });
        }
      });

      axios.get(`/challenge:${this.state.challengeId}`).then((res) => {
        this.setState({ items: res.data, loaded: true });
      });
    });

  }

  render() {
    if (!this.state.loaded) return <div>Loading New Challenges</div>;
    return (
      <div>
        <MuiThemeProvider>
          <Table
            onCellClick={(index) => { this.setState({ itemIndex: index }); }}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Hunt List</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.items.map((item, index) =>
                (<TableRow key={index}>
                  <TableRowColumn>{item.itemName}</TableRowColumn>
                  <ImageUploadForm challenge={this.state.challengeData.title} username="bob" item={item.name} />
                 </TableRow>
                ))}
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    );
  }

}
