import React from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './Navbar.jsx';

export default class CreateChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 7);
    this.state = {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: this.endDate,
      image: '',
      items: [],
      item: '',
      autoOk: true,
      open: false,
      modalTitle: '',
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.changeStart = this.changeStart.bind(this);
    this.changeEnd = this.changeEnd.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(e) {
    const { name } = e.target;
    const state = {};
    state[name] = e.target.value;
    this.setState(state);
  }

  changeEnd(e, date) {
    this.setState({
      endDate: date,
    });
  }

  changeStart(e, date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('submit', this.state);
    const {
      title,
      description,
      image,
      items,
    } = this.state;
    if (title !== '' && description !== '' && image !== '' && items.length > 0) {
      axios.post('/challenge', this.state)
        .then((response) => {
          // console.log('response', response);
          this.setState({
            title: '',
            description: '',
            startDate: new Date(),
            endDate: this.endDate,
            image: '',
            items: [],
            item: '',
            open: true,
            modalTitle: 'Success!',
            message: 'New Challenge Created',
          });
        });
    } else {
      this.setState({
        open: true,
        modalTitle: 'Error!',
        message: 'Please fill out all fields',
      });
    }
  }

  addItem(e) {
    e.preventDefault();
    if (this.state.item !== '') {
      const newItems = this.state.items;
      newItems.push(this.state.item);
      this.setState({
        items: newItems,
        item: '',
      });
    }
  }

  removeItem(index) {
    const list = this.state.items;
    list.splice(index, 1);
    this.setState({
      items: list,
    });
  }

  closeModal() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar history={this.props.history} />
          <ErrorModal open={this.state.open} close={this.closeModal} title={this.state.modalTitle} message={this.state.message} />
          <div style={{ width: 300, margin: 'auto' }}>
            {/* <h3>Create Challenge</h3> */}
            <TextField floatingLabelText="Title" name="title" value={this.state.title} onChange={this.handleChange} />
            <br />
            <TextField floatingLabelText="Description" name="description" value={this.state.description} onChange={this.handleChange} />
            <DatePicker
              autoOk={this.state.autoOk}
              floatingLabelText="Start Date"
              minDate={new Date()}
              maxDate={this.state.endDate}
              value={this.state.startDate}
              onChange={this.changeStart}
            />
            <DatePicker
              autoOk={this.state.autoOk}
              floatingLabelText="End Date"
              minDate={this.state.startDate}
              value={this.state.endDate}
              onChange={this.changeEnd}
            />
            <TextField floatingLabelText="Image URL" name="image" value={this.state.image} onChange={this.handleChange} />
            {/* <h4>Items:</h4> */}
            <TextField floatingLabelText="Add an Item" name="item" value={this.state.item} onChange={this.handleChange} />
            <FloatingActionButton mini onClick={this.addItem} >
              <ContentAdd />
            </FloatingActionButton>
            <p>Please test your items with <a href="https://visual-recognition-demo.ng.bluemix.net/" rel="noopener noreferrer" target="_blank">Watson</a> to make sure it recognizes the correct item</p>
            <List>
              {this.state.items.map((item, i) =>
                (
                  <ListItem
                    rightIcon={<IconButton onClick={this.removeItem.bind(this, i)}><ActionDelete /></IconButton>}
                    primaryText={item}
                    key={item + i}
                  />
                ))
              }
            </List>
            <br />
            <RaisedButton style={{ margin: 'auto' }} primary onClick={this.handleSubmit} label="Add Challenge" />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const ErrorModal = ({ open, close, title, message }) => {
  const actions = [
    <FlatButton
      label="Okay"
      primary
      keyboardFocused
      onClick={close}
    />,
  ];
  return (
    <Dialog
      title={title}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={close}
    >
      <p>{message}</p>
    </Dialog>
  );
};
