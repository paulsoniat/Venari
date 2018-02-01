import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

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
                  <TableHeaderColumn style={{ fontWeight: 'bold', fontSize: '24px' }}>{this.state.challengeData.title}
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn style={{ fontWeight: 'bold', fontSize: '16px' }}>{this.state.challengeData.address}
                    <br />
                  Prize: {this.state.challengeData.prize}
                  </TableHeaderColumn>
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
            {this.state.isGeo &&
              <MyMapComponent
                isMarkerShown
                latitude={this.state.challengeData.latitude}
                longitude={this.state.challengeData.longitude}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBn3B7WV7V3dlHIWGqljuC5xGQHAMxJEuA&v=3.exp"
                loadingElement={<div style={{ height: '95%', width: '95%', margin: '0 auto' }} />}
                containerElement={<div style={{ height: '380px', margin: '0 auto' }} />}
                mapElement={<div style={{ height: '95%', width: '95%', margin: '0 auto' }} />}
              />
            }
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(withGoogleMap(props =>
  (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} />}
    </GoogleMap>
  )));
