import React from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar.jsx';

export default class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      image: '',
      items: [],
      item: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleChange(e) {
    const { name } = e.target;
    const state = {};
    state[name] = e.target.value;
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/challenge', this.state)
      .then((response) => {
        console.log('response', response);
      });
  }

  addItem(e) {
    e.preventDefault();
    const newItems = this.state.items;
    newItems.push(this.state.item);
    this.setState({
      items: newItems,
      item: '',
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar history={this.props.history} />
          <form onSubmit={this.handleSubmit}>
            <h1>Create Challenge</h1>
            <label>
              Title:
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Start Date:
              <input type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              End Date:
              <input type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Picture:
              <input type="text" name="image" value={this.state.image} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Items:
              <ul>
                {this.state.items.map((item, i) => <li key={item + i}>{item}</li>)}
              </ul>
              <input type="text" name="item" value={this.state.item} onChange={this.handleChange} />
              <button onClick={this.addItem} >Add Item</button>
            </label>
            <br />
            <button type="submit" >Create Challenge</button>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}
