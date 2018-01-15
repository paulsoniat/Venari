import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';

export default class RotatingCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.data = 'need to get leaderboard data here, must be an array of objects [{user1: wins#}, {user2: wins#}]';
  }

  render() {
    return (
      <BarChart
        axes
        axisLabels={{ x: 'User', y: 'Adventures' }}
        colorBars
        yAxisOrientLeft
        height={250}
        width={500}
        data={this.state.data}
      />
    );
  }
}
