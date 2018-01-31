import React from 'react';
import ReactDOM from 'react-dom';
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
import Navbar from './Navbar.jsx';
import ImageUploadForm from './ImageUploadForm.jsx';


export default class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      challengeData: [],
      challengeId: props.match.params.id.slice(1),
      user: '',
      isGeo: false,
    };
  }

  componentWillMount() {
    axios.get('/user')
      .then((res) => {
        this.setState({ user: res.data.id });
      });

    axios.get('/challenges').then((res) => {
      res.data.forEach((challenge) => {
        if (challenge.id.toString() === this.state.challengeId) {
          this.setState({ challengeData: challenge });
        }
      });
      if (this.state.challengeData.longitude && this.state.challengeData.latitude) {
        this.setState({
          isGeo: true,
        });
      }

      axios.get(`/challenge:${this.state.challengeId}`).then((response) => {
        this.setState({ items: response.data, loaded: true });
      });
    });
  }

  render() {
    if (!this.state.loaded) return <div>Loading New Challenges</div>;
    return (
      <div id="challenge" >
        <MuiThemeProvider>
          <div>
            <Navbar history={this.props.history} />
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn style={{ fontWeight: 'bold', fontSize: '24px' }}>{this.state.challengeData.title}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover
              >
                {this.state.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableRowColumn>
                      <ImageUploadForm
                        index={index}
                        challengeId={this.state.challengeData.id}
                        challenge={this.state.challengeData.title}
                        user={this.state.user}
                        item={item.name}
                        isGeo={this.state.isGeo}
                      />
                    </TableRowColumn>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
