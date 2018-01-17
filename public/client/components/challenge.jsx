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
import axios from 'axios'


export default class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeData: [],
      challengeId: props.match.params.id.slice(1),
    };
  }

  componentWillMount() {
    console.log(this.state.challengeId);
    axios.get('/challenges').then((res) => {
      this.setState({ challengeData: res.data, loaded: true });
    });
  }

  render() {
    if (!this.state.loaded) return <div>Loading New Challenges</div>;
    return (
      <div>
        <h1> { this.state.challengeId } </h1>
      </div>
    );
  }

}
