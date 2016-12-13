import React, { Component } from 'react';
import style from './Home.css';


export default class Home extends Component {

  componentDidMount() {
    console.log('home loading');
  }

  render() {
    return (
      <div>
        <h1>EventsFinder</h1>
        <a href="/login/facebook">Log In with Facebook</a>
      </div>
    );
  }
}
